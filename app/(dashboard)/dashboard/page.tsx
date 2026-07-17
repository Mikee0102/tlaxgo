'use client';

import { useState, useEffect } from 'react';
import StatsCard from './components/statscard';
import RecentActivity from './components/recentactivity';
import ChartWidget from './components/chartwidget';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    placesVisited: 0,
    favorites: 0,
    itineraries: 0,
    travelDays: 0
  });

  useEffect(() => {
    // Simular carga de datos
    setStats({
      placesVisited: 12,
      favorites: 8,
      itineraries: 3,
      travelDays: 15
    });
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard 
          title="Lugares Visitados" 
          value={stats.placesVisited} 
          icon="📍"
          color="blue"
        />
        <StatsCard 
          title="Favoritos" 
          value={stats.favorites} 
          icon="❤️"
          color="red"
        />
        <StatsCard 
          title="Itinerarios" 
          value={stats.itineraries} 
          icon="🗺️"
          color="green"
        />
        <StatsCard 
          title="Días de Viaje" 
          value={stats.travelDays} 
          icon="📅"
          color="purple"
        />
      </div>

      {/* Charts y Actividad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWidget />
        <RecentActivity />
      </div>
    </div>
  );
}