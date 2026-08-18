'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  Calendar, Clock, MapPin, ArrowLeft, 
  Loader2, AlertCircle, Shield, Eye, CalendarDays
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { itineraryService } from '@/services/itinerary.service';
import { useAuth } from '@/hooks/useAuth';

const supabase = createClient();

export default function ItineraryPage() {
  const { user, isAdmin } = useAuth();
  const [itinerary, setItinerary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================================
  // CARGAR ITINERARIO (solo lectura)
  // ============================================================
  const loadItinerary = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Obtener el itinerario del admin (el más reciente)
      const { data: itineraries, error: itError } = await supabase
        .from('itineraries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (itError) throw itError;

      if (itineraries && itineraries.length > 0) {
        const fullItinerary = await itineraryService.getFullItinerary(itineraries[0].id);
        setItinerary(fullItinerary);
      } else {
        setError('No hay itinerarios disponibles');
      }
    } catch (err: any) {
      console.error('Error al cargar itinerario:', err);
      setError('No se pudo cargar el itinerario');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) loadItinerary();
  }, [user, loadItinerary]);

  // ============================================================
  // RENDER
  // ============================================================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="rounded-[2rem] bg-slate-900/90 border border-slate-800 shadow-2xl shadow-slate-950/40 overflow-hidden p-12 text-center">
            <Loader2 className="w-12 h-12 text-sky-400 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white">Cargando itinerario...</h2>
            <p className="text-slate-400 mt-2">Conectando con Supabase</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="rounded-[2rem] bg-slate-900/90 border border-red-500/30 shadow-2xl shadow-slate-950/40 overflow-hidden p-12 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white">Error</h2>
            <p className="text-red-400 mt-2">{error}</p>
            <button
              onClick={loadItinerary}
              className="mt-4 px-6 py-2 bg-sky-500 text-slate-950 rounded-full hover:bg-sky-400 transition"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="rounded-[2rem] bg-slate-900/90 border border-slate-800 shadow-2xl shadow-slate-950/40 overflow-hidden p-12 text-center">
            <Calendar className="w-16 h-16 text-slate-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">No hay itinerarios</h2>
            <p className="text-slate-400">El administrador aún no ha creado un itinerario</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Botón para regresar */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-sky-400 transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
            <span className="text-sm font-medium">Volver al inicio</span>
          </Link>
        </div>

        <div className="rounded-[2rem] bg-slate-900/90 border border-slate-800 shadow-2xl shadow-slate-950/40 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950/80 px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white flex items-center gap-3">
                    <CalendarDays className="w-10 h-10 text-sky-400" />
                    {itinerary.title}
                  </h1>
                  <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <Shield className="w-3 h-3" />
                    Oficial
                  </span>
                </div>
                {itinerary.description && (
                  <p className="text-slate-400 mt-2">{itinerary.description}</p>
                )}
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                  {itinerary.start_date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(itinerary.start_date).toLocaleDateString('es-MX')}
                      {itinerary.end_date && (
                        <> - {new Date(itinerary.end_date).toLocaleDateString('es-MX')}</>
                      )}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {itinerary.days.length} días
                  </span>
                  <span className="flex items-center gap-1 text-sky-400">
                    <Eye className="w-3.5 h-3.5" />
                    Solo lectura
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Days */}
          <div className="space-y-6 bg-slate-950 p-4 md:p-6">
            {itinerary.days.map((day: any, index: number) => (
              <div key={day.id} className="bg-slate-950 border border-slate-800/50 rounded-2xl overflow-hidden">
                {/* Day Header */}
                <div className="px-6 py-6 md:px-8 md:py-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between bg-slate-900/50">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-slate-950 font-bold shadow-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-2xl font-bold text-white">
                        {day.title || `Día ${index + 1}`}
                      </h2>
                      <p className="mt-2 text-sm text-slate-400 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(day.date + 'T00:00:00').toLocaleDateString('es-MX', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="px-6 pb-8 md:px-8 md:pb-10 space-y-4">
                  {day.items.length === 0 ? (
                    <div className="text-center py-6 text-slate-500 text-sm">
                      No hay actividades para este día
                    </div>
                  ) : (
                    day.items.map((item: any) => (
                      <div
                        key={item.id}
                        className="rounded-3xl border border-slate-800 bg-slate-900/95 p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                              {item.start_time && (
                                <span className="inline-flex min-w-[72px] items-center justify-center rounded-2xl bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                                  {item.start_time}
                                </span>
                              )}
                              <h4 className="text-lg font-semibold text-white truncate">
                                {item.title}
                              </h4>
                              {item.duration_minutes && (
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {item.duration_minutes} min
                                </span>
                              )}
                            </div>
                            {item.notes && (
                              <p className="mt-2 text-sm text-slate-400">
                                {item.notes}
                              </p>
                            )}
                            {item.place_id && (
                              <p className="mt-1 text-xs text-slate-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                Lugar asociado
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {itinerary.days.length === 0 && (
            <div className="text-center py-16">
              <CalendarDays className="mx-auto h-16 w-16 text-slate-500" />
              <h3 className="mt-6 text-2xl font-semibold text-slate-100">No hay días planificados</h3>
              <p className="mt-2 text-slate-400">El administrador aún no ha agregado días a este itinerario</p>
            </div>
          )}

          {/* Mensaje de solo lectura */}
          <div className="px-6 pb-6 md:px-8 md:pb-8">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-4 text-center">
              <p className="text-sm text-slate-400 flex items-center justify-center gap-2">
                <Eye className="w-4 h-4 text-sky-400" />
                Este es un itinerario oficial creado por el administrador.
                <span className="text-slate-500 ml-1">No puedes modificarlo.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}