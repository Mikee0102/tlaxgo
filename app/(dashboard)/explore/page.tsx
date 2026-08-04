'use client';

import { useState, useEffect, useTransition } from 'react';
import dynamic from 'next/dynamic';
import { Place, PlaceCategory } from '../../../types/place';
import { fetchPlacesFromOverpass } from '../../../services/places.service';
import SearchBar from '../../../components/map/SearchBar';
import Filters from '../../../components/map/Filters';
import PlaceCard from '../../../components/map/PlaceCard';

// Componente del mapa con SSR deshabilitado explícitamente
const Map = dynamic(() => import('../../../components/map/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 gap-3">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-400"></div>
      <p className="text-slate-400 text-sm font-medium animate-pulse">
        Inicializando mapa de Tlaxcala...
      </p>
    </div>
  ),
});

export default function ExplorePage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [allPlaces, setAllPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<PlaceCategory | 'all' | 'favorites'>('all');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // 1. Garantizar que el componente esté completamente montado en el cliente antes de renderizar Leaflet
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // 2. Cargar datos iniciales de la API al montar el cliente
  useEffect(() => {
    if (!hasMounted) return;

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
  }, [hasMounted]);

  // 3. Filtrado reactivo (incluyendo soporte a favoritos)
  useEffect(() => {
    if (!hasMounted) return;

    startTransition(() => {
      let result = allPlaces;

      // Filtrar por categoría / Favoritos
      if (activeCategory === 'favorites') {
        const savedFavorites: Place[] = JSON.parse(localStorage.getItem('tlaxgo_favorites') || '[]');
        const favIds = new Set(savedFavorites.map((fav) => fav.id));
        result = result.filter((place) => favIds.has(place.id));
      } else if (activeCategory !== 'all') {
        result = result.filter((place) => place.category === activeCategory);
      }

      // Filtrar por texto de búsqueda
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        result = result.filter(
          (place) =>
            place.name.toLowerCase().includes(query) ||
            (place.description && place.description.toLowerCase().includes(query))
        );
      }

      setFilteredPlaces(result);
    });
  }, [searchTerm, activeCategory, allPlaces, hasMounted]);

  // Si aún no se ha completado la hidratación en el cliente, mostramos el skeleton
  if (!hasMounted) {
    return (
      <main className="relative flex flex-col h-[calc(100vh-80px)] w-full overflow-hidden bg-slate-950 items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-400"></div>
      </main>
    );
  }

  return (
    <main className="relative flex flex-col h-[calc(100vh-80px)] w-full overflow-hidden bg-slate-950">
      {/* Contenedor Flotante de Controles */}
      <div className="absolute top-4 left-4 right-4 z-[9999] max-w-xl mx-auto flex flex-col gap-3">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <Filters activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>

      {/* Área del mapa */}
      <div className="flex-1 w-full h-full">
        {isLoading ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-400"></div>
            <p className="text-slate-400 text-sm font-medium animate-pulse">
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

      {/* Tarjeta de detalle */}
      <PlaceCard place={selectedPlace} onClose={() => setSelectedPlace(null)} />

      {/* Loader de transición */}
      {isPending && (
        <div className="absolute top-24 right-4 z-[9999] bg-slate-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-2xl border border-slate-800 text-xs text-sky-400 font-medium animate-pulse">
          Actualizando mapa...
        </div>
      )}
    </main>
  );
}