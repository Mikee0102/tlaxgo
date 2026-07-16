'use client';

import { Place } from '../../types/place';

interface PlaceCardProps {
  place: Place | null;
  onClose: () => void;
}

export default function PlaceCard({ place, onClose }: PlaceCardProps) {
  if (!place) return null;

  return (
    <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-xl shadow-lg border border-slate-100 p-5  transition-all duration-300">
      {/* Botón Cerrar */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors"
        aria-label="Cerrar detalles"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Categoría e Indicador */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 capitalize">
          {place.category}
        </span>
        {place.rating && (
          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
            <span>⭐</span>
            <span>{place.rating}</span>
          </div>
        )}
      </div>

      {/* Título */}
      <h3 className="font-bold text-lg text-slate-800 pr-6 leading-snug">
        {place.name}
      </h3>

      {/* Descripción */}
      <p className="text-sm text-slate-500 mt-2 line-clamp-3 leading-relaxed">
        {place.description}
      </p>

      {/* Detalles Adicionales (Dirección, Teléfono, Web) */}
      <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-600">
        {place.address && (
          <div className="flex items-start gap-2">
            <span className="text-base">📍</span>
            <span className="leading-tight">{place.address}</span>
          </div>
        )}
        {place.phone && (
          <div className="flex items-center gap-2">
            <span className="text-base">📞</span>
            <span>{place.phone}</span>
          </div>
        )}
        {place.website && (
          <div className="flex items-center gap-2">
            <span className="text-base">🌐</span>
            <a
              href={place.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline truncate"
            >
              Visitar sitio web
            </a>
          </div>
        )}
      </div>
    </div>
  );
}