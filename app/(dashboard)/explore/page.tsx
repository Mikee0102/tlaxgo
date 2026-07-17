<<<<<<< HEAD
'use client';

import { useState, useEffect, useTransition } from 'react';
import dynamic from 'next/dynamic';
import { Place, PlaceCategory } from '../../../types/place';
import { fetchPlacesFromOverpass } from '../../../services/places.service';
import SearchBar from '../../../components/map/SearchBar';
import Filters from '../../../components/map/Filters';
import PlaceCard from '../../../components/map/PlaceCard';

// Importación dinámica del Mapa para evitar fallos de SSR con Leaflet
const Map = dynamic(() => import('../../../components/map/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 gap-3">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      <p className="text-slate-500 text-sm font-medium animate-pulse">
        Inicializando mapa de Tlaxcala...
      </p>
    </div>
  ),
});

export default function ExplorePage() {
  const [allPlaces, setAllPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<PlaceCategory | 'all'>('all');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // 1. Cargar datos iniciales desde Overpass API al montar el componente
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await fetchPlacesFromOverpass();
        setAllPlaces(data);
        setFilteredPlaces(data);
      } catch (error) {
        console.error('Error al inicializar los datos:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // 2. Filtrar lugares cuando cambie la búsqueda o la categoría seleccionada
  useEffect(() => {
    startTransition(() => {
      let result = allPlaces;

      // Filtrar por categoría
      if (activeCategory !== 'all') {
        result = result.filter((place) => place.category === activeCategory);
      }

      // Filtrar por término de búsqueda (nombre)
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        result = result.filter((place) => 
          place.name.toLowerCase().includes(query) ||
          (place.description && place.description.toLowerCase().includes(query))
        );
      }

      setFilteredPlaces(result);
    });
  }, [searchTerm, activeCategory, allPlaces]);

  return (
    <main className="relative flex flex-col h-[calc(100vh-64px)] w-full overflow-hidden bg-slate-50">
      {/* Contenedor Flotante de Controles superiores (Buscador y Filtros) */}
      <div className="absolute top-4 left-4 right-4  max-w-xl mx-auto flex flex-col gap-3">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <Filters activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>

      {/* Área del mapa interactivo */}
      <div className="flex-1 w-full h-full">
        {isLoading ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <p className="text-slate-500 text-sm font-medium">
              Obteniendo atractivos de Overpass API...
            </p>
          </div>
        ) : (
          <Map
            places={filteredPlaces}
            selectedPlace={selectedPlace}
            onSelectPlace={setSelectedPlace}
          />
        )}
      </div>

      {/* Tarjeta Informativa de Lugar Seleccionado */}
      <PlaceCard place={selectedPlace} onClose={() => setSelectedPlace(null)} />

      {/* Indicador visual discreto de recálculo de filtros */}
      {isPending && (
        <div className="absolute top-20 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow border border-slate-100 text-xs text-slate-500  animate-pulse">
          Actualizando mapa...
        </div>
      )}
    </main>
  );
}
=======
export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold">Explore</h1>
      </div>
    </div>
  );
}
>>>>>>> origin/feat-landing-marketing
