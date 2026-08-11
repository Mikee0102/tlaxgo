'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Plus, Trash2, Edit, X, ArrowLeft } from 'lucide-react';

interface Activity {
  id: string;
  time: string;
  title: string;
  location: string;
  description?: string;
  duration?: string;
}

interface Day {
  id: string;
  date: string;
  title: string;
  activities: Activity[];
}

export default function ItineraryPage() {
  const [days, setDays] = useState<Day[]>([
    {
      id: '1',
      date: '2026-08-10',
      title: 'Día 1 - Llegada y exploración',
      activities: [
        {
          id: 'a1',
          time: '10:00',
          title: 'Llegada al aeropuerto',
          location: 'Aeropuerto Internacional',
          description: 'Recogida de equipaje y traslado al hotel'
        },
        {
          id: 'a2',
          time: '14:00',
          title: 'Check-in en el hotel',
          location: 'Hotel Plaza Central',
          duration: '1 hora'
        },
        {
          id: 'a3',
          time: '16:00',
          title: 'Tour por el centro histórico',
          location: 'Zona Centro',
          description: 'Visita guiada por los principales monumentos',
          duration: '2 horas'
        }
      ]
    },
    {
      id: '2',
      date: '2026-08-11',
      title: 'Día 2 - Aventura y naturaleza',
      activities: [
        {
          id: 'b1',
          time: '08:00',
          title: 'Desayuno buffet',
          location: 'Hotel Restaurante'
        },
        {
          id: 'b2',
          time: '09:30',
          title: 'Excursión a la montaña',
          location: 'Parque Nacional',
          description: 'Senderismo y vistas panorámicas',
          duration: '4 horas'
        }
      ]
    }
  ]);

  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({});

  const addDay = () => {
    const newDay: Day = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      title: `Día ${days.length + 1} - Nuevo día`,
      activities: []
    };
    setDays([...days, newDay]);
  };

  const removeDay = (dayId: string) => {
    setDays(days.filter(day => day.id !== dayId));
  };

  const addActivity = (dayId: string) => {
    if (!newActivity.time || !newActivity.title) return;

    setDays(days.map(day => 
      day.id === dayId 
        ? {
            ...day,
            activities: [
              ...day.activities,
              {
                id: Date.now().toString(),
                time: newActivity.time!,
                title: newActivity.title!,
                location: newActivity.location || 'Sin ubicación',
                description: newActivity.description,
                duration: newActivity.duration
              }
            ]
          }
        : day
    ));
    setNewActivity({});
  };

  const removeActivity = (dayId: string, activityId: string) => {
    setDays(days.map(day =>
      day.id === dayId
        ? {
            ...day,
            activities: day.activities.filter(a => a.id !== activityId)
          }
        : day
    ));
  };

  const updateDayTitle = (dayId: string, newTitle: string) => {
    setDays(days.map(day =>
      day.id === dayId ? { ...day, title: newTitle } : day
    ));
    setEditingDay(null);
  };

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
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950/80 px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white flex items-center gap-3">
                  <Calendar className="w-10 h-10 text-sky-400" />
                  Mi Itinerario
                </h1>
                <p className="text-slate-400 mt-3">
                  {days.length} días planificados para tu próxima aventura.
                </p>
              </div>
              <button
                onClick={addDay}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-950 shadow-lg shadow-sky-500/20 hover:bg-sky-400 transition"
              >
                <Plus className="w-4 h-4" />
                Agregar Día
              </button>
            </div>
          </div>

          {/* Days */}
          <div className="space-y-6 bg-slate-950">
            {days.map((day) => (
              <div key={day.id} className="bg-slate-950 border-t border-slate-800">
                {/* Day Header */}
                <div className="px-6 py-6 md:px-8 md:py-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-slate-950 font-bold shadow-sm">
                      {day.id}
                    </div>
                    <div className="min-w-0">
                      {editingDay === day.id ? (
                        <div className="flex items-center gap-2 flex-wrap">
                          <input
                            type="text"
                            defaultValue={day.title}
                            className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                updateDayTitle(day.id, e.currentTarget.value);
                              }
                              if (e.key === 'Escape') setEditingDay(null);
                            }}
                            onBlur={(e) => updateDayTitle(day.id, e.target.value)}
                          />
                          <button
                            onClick={() => setEditingDay(null)}
                            className="rounded-full p-2 text-slate-300 hover:bg-slate-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 flex-wrap">
                          <h2 className="text-2xl font-bold text-white">
                            {day.title}
                          </h2>
                          <button
                            onClick={() => setEditingDay(day.id)}
                            className="rounded-full p-2 text-slate-300 hover:bg-slate-800"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      <p className="mt-2 text-sm text-slate-400">
                        {new Date(day.date).toLocaleDateString('es-MX', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => removeDay(day.id)}
                      className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 p-2 text-slate-300 hover:border-red-400 hover:text-red-300 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Activities */}
                <div className="px-6 pb-8 md:px-8 md:pb-10 space-y-4">
                  {day.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="group rounded-3xl border border-slate-800 bg-slate-900/95 p-4 transition hover:border-sky-500/50"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="inline-flex min-w-[72px] items-center justify-center rounded-2xl bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                              {activity.time}
                            </span>
                            <h4 className="text-lg font-semibold text-white truncate">
                              {activity.title}
                            </h4>
                          </div>
                          <p className="mt-3 text-sm text-slate-400 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-sky-400" />
                            {activity.location}
                          </p>
                          {activity.description && (
                            <p className="mt-3 text-sm text-slate-300">{activity.description}</p>
                          )}
                          {activity.duration && (
                            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {activity.duration}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeActivity(day.id, activity.id)}
                          className="rounded-full p-2 text-slate-400 opacity-0 transition group-hover:opacity-100 hover:bg-slate-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5">
                    <div className="grid gap-3 md:grid-cols-[130px_1fr_1fr_auto]">
                      <input
                        type="time"
                        className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        value={newActivity.time || ''}
                        onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                        placeholder="Hora"
                      />
                      <input
                        type="text"
                        className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        value={newActivity.title || ''}
                        onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                        placeholder="Actividad"
                      />
                      <input
                        type="text"
                        className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        value={newActivity.location || ''}
                        onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                        placeholder="Ubicación"
                      />
                      <button
                        onClick={() => addActivity(day.id)}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-sky-400"
                      >
                        <Plus className="w-4 h-4" />
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {days.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="mx-auto h-16 w-16 text-slate-500" />
              <h3 className="mt-6 text-2xl font-semibold text-slate-100">No hay días planificados</h3>
              <p className="mt-2 text-slate-400">Comienza a crear tu itinerario de viaje</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}