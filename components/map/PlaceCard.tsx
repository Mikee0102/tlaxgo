'use client';

import { useState, useEffect } from 'react';
import { Place } from '../../types/place';
import { Heart, Navigation, MapPin, Share2, Check } from 'lucide-react';

interface PlaceCardProps {
  place: Place | null;
  onClose: () => void;
}

export default function PlaceCard({ place, onClose }: PlaceCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Imágenes por defecto si el atractivo no cuenta con fotos propias
  const sampleImages = [
    'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80',
  ];

  useEffect(() => {
    if (place) {
      const savedFavorites = JSON.parse(localStorage.getItem('tlaxgo_favorites') || '[]');
      setIsFavorite(savedFavorites.some((fav: Place) => fav.id === place.id));
      setCurrentImageIndex(0);
    }
  }, [place]);

  if (!place) return null;

  const toggleFavorite = () => {
    const savedFavorites: Place[] = JSON.parse(localStorage.getItem('tlaxgo_favorites') || '[]');
    let updatedFavorites: Place[];

    if (isFavorite) {
      updatedFavorites = savedFavorites.filter((fav) => fav.id !== place.id);
    } else {
      updatedFavorites = [...savedFavorites, place];
    }

    localStorage.setItem('tlaxgo_favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  // Función para Compartir Lugar
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
      
      {/* Galería Ligera de Imágenes */}
      <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-slate-900">
        <img
          src={sampleImages[currentImageIndex]}
          alt={place.name}
          className="w-full h-full object-cover transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

        {/* Puntos de Navegación de la Galería */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {sampleImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentImageIndex === idx ? 'bg-sky-400 w-4' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Acciones Superiores sobre la Foto */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10">
          <button
            onClick={handleShare}
            className="p-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-white transition"
            title="Compartir"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
          
          <button
            onClick={toggleFavorite}
            className={`p-1.5 rounded-full backdrop-blur-md border transition ${
              isFavorite
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-500'
                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500' : ''}`} />
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-white transition"
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

      {/* Botón de Navegación */}
      <div className="mt-3 pt-2 border-t border-slate-900">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold py-2 rounded-full transition shadow-lg shadow-sky-500/20 flex items-center justify-center gap-1.5"
        >
          <Navigation className="w-3.5 h-3.5" /> Cómo llegar
        </a>
      </div>
    </div>
  );
}