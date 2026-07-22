'use client';

import { Calendar, MapPin, Activity, Trash2 } from 'lucide-react';

interface Itinerary {
  id: number;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  activities: number;
  status: 'planned' | 'in-progress' | 'completed';
}

interface ItineraryCardProps {
  itinerary: Itinerary;
  onDelete: (id: number) => void;
  getStatusColor: (status: string) => string;
}

export default function ItineraryCard({ itinerary, onDelete, getStatusColor }: ItineraryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg text-gray-800">{itinerary.title}</h3>
        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(itinerary.status)}`}>
          {itinerary.status === 'planned' ? 'Planificado' :
           itinerary.status === 'in-progress' ? 'En progreso' : 'Completado'}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{itinerary.destination}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{itinerary.startDate} → {itinerary.endDate}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Activity className="w-4 h-4 mr-2" />
          <span>{itinerary.activities} actividades</span>
        </div>
      </div>

      <div className="flex justify-end mt-4 pt-3 border-t">
        <button
          onClick={() => onDelete(itinerary.id)}
          className="text-red-500 hover:text-red-700 flex items-center text-sm"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Eliminar
        </button>
      </div>
    </div>
  );
}