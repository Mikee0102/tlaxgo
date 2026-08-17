'use client';

import { useState } from 'react';
import { Itinerary } from '@/types/itinerary';
import { Heart, Calendar, ChevronDown, ChevronUp, MapPin, Edit2, Trash2 } from 'lucide-react';

interface Props {
  itinerary: Itinerary;
  isAdmin?: boolean;
  onToggleFavorite: (id: string, currentStatus: boolean) => void;
  onEdit?: (itinerary: Itinerary) => void;
  onDelete?: (id: string) => void;
}

export default function ItineraryCard({
  itinerary,
  isAdmin,
  onToggleFavorite,
  onEdit,
  onDelete,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition duration-200 text-white flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-xl font-bold text-white tracking-tight">{itinerary.title}</h3>
          
          <div className="flex items-center gap-1.5">
            {isAdmin && (
              <>
                <button
                  onClick={() => onEdit?.(itinerary)}
                  className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-sky-300 transition"
                  title="Editar"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDelete?.(itinerary.id)}
                  className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-red-400 transition"
                  title="Eliminar"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </>
            )}
            
            <button
              onClick={() => onToggleFavorite(itinerary.id, !!itinerary.is_favorite)}
              className={`p-2 rounded-full border transition ${
                itinerary.is_favorite
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-rose-400'
              }`}
              title={itinerary.is_favorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            >
              <Heart className={`w-4 h-4 ${itinerary.is_favorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {itinerary.description && (
          <p className="text-xs text-slate-400 mb-4 leading-relaxed line-clamp-2">
            {itinerary.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2 text-xs text-slate-300 mb-4">
          <span className="inline-flex items-center gap-1.5 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
            <Calendar className="w-3.5 h-3.5 text-sky-400" />
            {itinerary.start_date} al {itinerary.end_date}
          </span>
          <span className="inline-flex items-center gap-1.5 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            {itinerary.itinerary_days?.length || 0} Días de Ruta
          </span>
        </div>

        {expanded && itinerary.itinerary_days && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
            {itinerary.itinerary_days.map((day) => (
              <div key={day.id || day.date} className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/60">
                <div className="flex justify-between items-center text-xs font-bold text-sky-300 mb-2">
                  <span>{day.title}</span>
                  <span className="text-[11px] text-slate-500 font-normal">{day.date}</span>
                </div>
                <div className="space-y-1.5">
                  {day.itinerary_items?.map((item) => (
                    <div key={item.id || item.position} className="flex items-center justify-between text-xs text-slate-300 py-1 border-b border-slate-900 last:border-0">
                      <span className="font-medium">{item.title}</span>
                      <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                        {item.start_time && <span>{item.start_time.slice(0, 5)} hrs</span>}
                        {item.duration_minutes && <span>({item.duration_minutes} min)</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 w-full py-2 bg-slate-800/60 hover:bg-slate-800 text-xs font-semibold text-sky-300 rounded-xl transition flex items-center justify-center gap-1.5"
      >
        {expanded ? (
          <>Ver menos <ChevronUp className="w-4 h-4" /></>
        ) : (
          <>Ver actividades completas <ChevronDown className="w-4 h-4" /></>
        )}
      </button>
    </div>
  );
}