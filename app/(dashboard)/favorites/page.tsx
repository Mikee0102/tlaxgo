'use client';

import { useState } from 'react';
import { Heart, MapPin, Calendar, Star } from 'lucide-react';

interface FavoriteItem {
  id: string;
  name: string;
  type: 'place' | 'route' | 'event';
  description: string;
  location: string;
  rating: number;
  image?: string;
  savedAt: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: '1',
      name: 'Playa del Carmen',
      type: 'place',
      description: 'Hermosa playa con aguas cristalinas',
      location: 'Quintana Roo, México',
      rating: 4.8,
      savedAt: '2026-01-15'
    },
    {
      id: '2',
      name: 'Ruta de los Cenotes',
      type: 'route',
      description: 'Recorrido por los mejores cenotes de la región',
      location: 'Yucatán, México',
      rating: 4.9,
      savedAt: '2026-01-10'
    },
    {
      id: '3',
      name: 'Festival de Jazz',
      type: 'event',
      description: 'Festival anual de jazz en la ciudad',
      location: 'Ciudad de México',
      rating: 4.7,
      savedAt: '2026-01-05'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'place' | 'route' | 'event'>('all');

  const filteredFavorites = favorites.filter(
    item => filter === 'all' || item.type === filter
  );

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'place': return '📍';
      case 'route': return '🗺️';
      case 'event': return '🎪';
      default: return '⭐';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'place': return 'bg-blue-100 text-blue-700';
      case 'route': return 'bg-green-100 text-green-700';
      case 'event': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

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
              {favorites.length} elementos guardados
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['all', 'place', 'route', 'event'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getTypeIcon(item.type)}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                </div>
                <button
                  onClick={() => removeFavorite(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </button>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {item.name}
              </h3>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <MapPin className="w-4 h-4" />
                <span>{item.location}</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(item.savedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFavorites.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">No hay favoritos</h3>
            <p className="text-gray-500">Comienza a guardar tus lugares favoritos</p>
          </div>
        )}
      </div>
    </div>
  );
}