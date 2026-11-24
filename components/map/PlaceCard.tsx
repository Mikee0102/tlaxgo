'use client';

import { useState, useEffect } from 'react';
import { Place } from '../../types/place';
import { getPlaceImages } from '../../utils/imageHelper';
import { Heart, Navigation, MapPin, Share2, Check } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth'; // Verifica que coincida con tu import (ej. @/providers/auth-provider)
import { favoritesService } from '@/services/favorites.service';
import { offlineQueueService } from '@/services/offlineQueue.service';

interface PlaceCardProps {
  place: Place | null;
  onClose: () => void;
}

const LOCAL_FAVS_KEY = 'tlaxgo_favorites';

export default function PlaceCard({ place, onClose }: PlaceCardProps) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Helper para mantener sincronizada la caché local de favoritos
  const updateLocalFavoritesCache = (targetPlace: Place, shouldBeFav: boolean) => {
    const savedFavorites: Place[] = JSON.parse(localStorage.getItem(LOCAL_FAVS_KEY) || '[]');
    let updated: Place[];
    if (shouldBeFav) {
      const exists = savedFavorites.some((fav) => fav.id.toString() === targetPlace.id.toString());
      updated = exists ? savedFavorites : [...savedFavorites, targetPlace];
    } else {
      updated = savedFavorites.filter((fav) => fav.id.toString() !== targetPlace.id.toString());
    }
    localStorage.setItem(LOCAL_FAVS_KEY, JSON.stringify(updated));
  };

  useEffect(() => {
    if (!place) return;
    setCurrentImageIndex(0);

    async function checkFavoriteStatus() {
      // Primero leemos caché local para respuesta instantánea (y modo offline)
      const savedFavorites: Place[] = JSON.parse(localStorage.getItem(LOCAL_FAVS_KEY) || '[]');
      const localMatch = savedFavorites.some((fav) => fav.id.toString() === place?.id?.toString());
      setIsFavorite(localMatch);

      if (!user?.uid || !place || !navigator.onLine) return;

      try {
        const userFavs = await favoritesService.getUserFavorites(user.uid);
        const cloudMatch = userFavs.some((fav: any) => fav.id === place?.id?.toString());
        setIsFavorite(cloudMatch);
      } catch (err) {
        console.error('Error al verificar favorito:', err);
      }
    }

    checkFavoriteStatus();
  }, [place, user]);

  if (!place) return null;

  const placeImages = getPlaceImages(place);

  const toggleFavorite = async () => {
    if (!user?.uid) {
      alert('Debes iniciar sesión para guardar favoritos en tu cuenta.');
      return;
    }

    const newFavoriteState = !isFavorite;
    const placeIdStr = place.id.toString();
    const placePayload = {
      name: place.name,
      category: place.category,
      description: place.description || '',
      location: place.address || 'Tlaxcala',
      address: place.address || 'Tlaxcala',
      lat: place.lat,
      lon: place.lon,
      type: 'place',
      rating: 4.8,
    };

    // 1. Actualización inmediata en UI y caché local
    setIsFavorite(newFavoriteState);
    updateLocalFavoritesCache(place, newFavoriteState);

    // 2. Si NO hay internet, encolamos para subir cuando regrese la conexión
    if (!navigator.onLine) {
      if (newFavoriteState) {
        offlineQueueService.enqueue({
          type: 'ADD_FAVORITE',
          userId: user.uid,
          payload: { placeId: placeIdStr, placeData: placePayload },
        });
      } else {
        offlineQueueService.enqueue({
          type: 'REMOVE_FAVORITE',
          userId: user.uid,
          payload: { placeId: placeIdStr },
        });
      }
      return;
    }

    // 3. Si HAY internet, intentamos guardar directo en Firestore (y si falla por red, encolamos)
    try {
      if (newFavoriteState) {
        await favoritesService.addFavorite(user.uid, placeIdStr, placePayload);
      } else {
        await favoritesService.removeFavorite(user.uid, placeIdStr);
      }
    } catch (err) {
      console.error('Sin conexión estable, encolando acción para sincronizar después:', err);
      if (newFavoriteState) {
        offlineQueueService.enqueue({
          type: 'ADD_FAVORITE',
          userId: user.uid,
          payload: { placeId: placeIdStr, placeData: placePayload },
        });
      } else {
        offlineQueueService.enqueue({
          type: 'REMOVE_FAVORITE',
          userId: user.uid,
          payload: { placeId: placeIdStr },
        });
      }
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: place.name,
      text: `¡Mira este lugar en Tlaxcala!: ${place.name}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error al compartir:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lon}`;

  return (
    <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-slate-950/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-800 p-4 z-[9999] transition-all duration-300 text-slate-200 overflow-hidden">
      {/* Galería de Imágenes Dinámica */}
      <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-slate-900">
        <img
          src={placeImages[currentImageIndex] || placeImages[0]}
          alt={place.name}
          className="w-full h-full object-cover transition-all duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=600&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

        {placeImages.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {placeImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  currentImageIndex === idx ? 'bg-sky-400 w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Botones de Acción Superiores */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10">
          <button
            onClick={handleShare}
            className="p-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            title="Compartir"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={toggleFavorite}
            className={`p-1.5 rounded-full backdrop-blur-md border transition cursor-pointer ${
              isFavorite
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-500'
                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Guardar en favoritos"
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500' : ''}`} />
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Categoría y Título */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-950 text-sky-400 border border-sky-900/60">
          {place.category}
        </span>
      </div>

      <h3 className="font-black text-base text-white leading-tight mb-1">
        {place.name}
      </h3>

      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
        {place.description}
      </p>

      {/* Dirección */}
      {place.address && (
        <div className="mt-2 flex items-start gap-1.5 text-xs text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
          <span className="truncate">{place.address}</span>
        </div>
      )}

      {/* Botón Cómo Llegar */}
      <div className="mt-3 pt-2 border-t border-slate-900">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold py-2 rounded-full transition shadow-lg shadow-sky-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Navigation className="w-3.5 h-3.5" /> Cómo llegar
        </a>
      </div>
    </div>
  );
}