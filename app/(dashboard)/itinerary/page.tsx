'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, Plus, Trash2, Edit, X } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-8 h-8 text-blue-600" />
              Mi Itinerario
            </h1>
            <p className="text-gray-600 mt-1">
              {days.length} días planificados
            </p>
          </div>
          <button 
            onClick={addDay}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Agregar Día
          </button>
        </div>

        {/* Days */}
        <div className="space-y-6">
          {days.map((day) => (
            <div key={day.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              {/* Day Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                      {day.id}
                    </div>
                    {editingDay === day.id ? (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          defaultValue={day.title}
                          className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-lg font-semibold text-gray-900">
                          {day.title}
                        </h2>
                        <button
                          onClick={() => setEditingDay(day.id)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Edit className="w-4 h-4 text-gray-500" />
                        </button>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      {new Date(day.date).toLocaleDateString('es-MX', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long'
                      })}
                    </span>
                    <button
                      onClick={() => removeDay(day.id)}
                      className="p-1 hover:bg-red-100 rounded text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div className="p-4 space-y-3">
                {day.activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <div className="text-sm font-medium text-blue-600 w-16 pt-0.5">
                      {activity.time}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <p className="text-sm text-gray-600 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            {activity.location}
                          </p>
                          {activity.description && (
                            <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                          )}
                          {activity.duration && (
                            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3" />
                              {activity.duration}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeActivity(day.id, activity.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Activity */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3 flex-wrap">
                    <input
                      type="time"
                      className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      value={newActivity.time || ''}
                      onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                      placeholder="Hora"
                    />
                    <input
                      type="text"
                      className="flex-1 min-w-[150px] px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      value={newActivity.title || ''}
                      onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                      placeholder="Actividad"
                    />
                    <input
                      type="text"
                      className="flex-1 min-w-[120px] px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      value={newActivity.location || ''}
                      onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                      placeholder="Ubicación"
                    />
                    <button
                      onClick={() => addActivity(day.id)}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-1"
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
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">No hay días planificados</h3>
            <p className="text-gray-500">Comienza a crear tu itinerario de viaje</p>
          </div>
        )}
      </div>
    </div>
  );
}