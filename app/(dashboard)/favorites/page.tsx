'use client';

import { useState, useEffect } from 'react';
import { Heart, MapPin, Star, Map } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth'; // Asegúrate de que coincida con tu ruta de autenticación
import { favoritesService } from '@/services/favorites.service';

interface FavoriteItem {
  id: string;
  name: string;
  type?: 'place' | 'route' | 'event';
  description?: string;
  location?: string;
  rating?: number;
  image?: string;
  savedAt?: string;
  lat?: number;
  lon?: number;
  category?: string;
}

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'place' | 'route' | 'event'>('all');

  // Cargar favoritos desde Firestore al montar el componente
  useEffect(() => {
    async function loadFavorites() {
      if (!user?.uid) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await favoritesService.getUserFavorites(user.uid);
        setFavorites(data as FavoriteItem[]);
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, [user]);

  const filteredFavorites = favorites.filter(
    item => filter === 'all' || item.type === filter
  );

  // Eliminar de favoritos en la BD y actualizar estado local
  const removeFavorite = async (id: string) => {
    if (!user?.uid) return;
    try {
      // Actualización optimista de la interfaz
      setFavorites(favorites.filter(item => item.id !== id));
      await favoritesService.removeFavorite(user.uid, id);
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
      // Recargar si ocurre un fallo
      const data = await favoritesService.getUserFavorites(user.uid);
      setFavorites(data as FavoriteItem[]);
    }
  };

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'place': return '📍';
      case 'route': return '🗺️';
      case 'event': return '🎪';
      default: return '⭐';
    }
  };

  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'place': return 'bg-blue-100 text-blue-700';
      case 'route': return 'bg-green-100 text-green-700';
      case 'event': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-slate-400">
        <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm font-medium">Cargando tus favoritos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Heart className="w-8 h-8 text-red-500 fill-current" />
              Mis Favoritos
            </h1>
            <p className="text-gray-600 mt-1">
              {favorites.length} elementos guardados en tu cuenta
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['all', 'place', 'route', 'event'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                filter === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {type === 'all' ? 'Todos' : type.charAt(0).toUpperCase() + type.slice(1) + 's'}
            </button>
          ))}
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getTypeIcon(item.type || 'place')}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type || 'place')}`}>
                      {(item.type || 'place').charAt(0).toUpperCase() + (item.type || 'place').slice(1)}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFavorite(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                    title="Eliminar de favoritos"
                  >
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {item.name}
                </h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description || item.category || 'Atractivo turístico de Tlaxcala'}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
                  <span className="truncate">{item.location || 'Tlaxcala'}</span>
                </div>
              </div>

              {/* Footer con rating y botón Ver en Mapa */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{item.rating || '4.8'}</span>
                </div>

                {item.lat && item.lon ? (
                  <Link
                    href={`/explore?lat=${item.lat}&lon=${item.lon}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 rounded-lg text-xs font-semibold transition cursor-pointer"
                  >
                    Ver
                  </Link>
                ) : (
                  <span className="text-xs text-gray-400">Ubicación general</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredFavorites.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm mt-4">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">No hay favoritos guardados</h3>
            <p className="text-gray-500 text-sm mt-1">Explora el mapa y marca tus lugares preferidos.</p>
          </div>
        )}
      </div>
    </div>
  );
}