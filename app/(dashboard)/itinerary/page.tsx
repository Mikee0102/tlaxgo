'use client';

import { useState } from 'react';
import ItineraryCard from './components/intinerarycard';
import ItineraryForm from './components/intineraryform';

interface Itinerary {
  id: number;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  activities: number;
  status: 'planned' | 'in-progress' | 'completed';
}

export default function ItineraryPage() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([
    {
      id: 1,
      title: 'Fin de semana en Tlaxcala',
      destination: 'Centro Histórico',
      startDate: '2024-03-15',
      endDate: '2024-03-17',
      activities: 8,
      status: 'planned'
    },
    {
      id: 2,
      title: 'Aventura en La Malinche',
      destination: 'Parque Nacional',
      startDate: '2024-03-20',
      endDate: '2024-03-22',
      activities: 5,
      status: 'in-progress'
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const addItinerary = (newItinerary: Omit<Itinerary, 'id'>) => {
    setItineraries([
      ...itineraries,
      { ...newItinerary, id: itineraries.length + 1 }
    ]);
    setShowForm(false);
  };

  const deleteItinerary = (id: number) => {
    setItineraries(itineraries.filter(item => item.id !== id));
  };

  const getStatusColor = (status: string) => {
    const colors = {
      planned: 'bg-yellow-100 text-yellow-700',
      'in-progress': 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Mis Itinerarios</h1>
          <p className="text-gray-500">Planifica tus viajes por Tlaxcala</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          {showForm ? 'Cancelar' : '+ Nuevo Itinerario'}
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <ItineraryForm onSubmit={addItinerary} onCancel={() => setShowForm(false)} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {itineraries.map((itinerary) => (
          <ItineraryCard
            key={itinerary.id}
            itinerary={itinerary}
            onDelete={deleteItinerary}
            getStatusColor={getStatusColor}
          />
        ))}
      </div>

      {itineraries.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No tienes itinerarios creados</p>
          <p className="text-gray-400">¡Comienza a planificar tu próxima aventura!</p>
        </div>
      )}
    </div>
  );
}