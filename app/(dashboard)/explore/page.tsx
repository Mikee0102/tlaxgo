'use client';

import { useState, useEffect, useTransition, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Place, PlaceCategory } from '../../../types/place';
import { fetchPlacesFromOverpass } from '../../../services/places.service';
import SearchBar from '../../../components/map/SearchBar';
import Filters from '../../../components/map/Filters';
import PlaceCard from '../../../components/map/PlaceCard';
import { ArrowLeft } from 'lucide-react';

// Componente del mapa con SSR deshabilitado explícitamente
const Map = dynamic(() => import('../../../components/map/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 gap-3">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600"></div>
      <p className="text-slate-600 text-sm font-medium animate-pulse">
        Inicializando mapa de Tlaxcala...
      </p>
    </div>
  ),
});

function ExploreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const latParam = searchParams.get('lat');
  const lonParam = searchParams.get('lon');

  const [hasMounted, setHasMounted] = useState(false);
  const [allPlaces, setAllPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<PlaceCategory | 'all' | 'favorites'>('all');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // 1. Garantizar que el componente esté montado y en modo claro por defecto
  useEffect(() => {
    setHasMounted(true);
    document.documentElement.classList.remove('dark');
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

        // Si la URL trae coordenadas (viniendo desde el Dashboard/Favoritos), 
        // buscamos el lugar correspondiente o creamos uno temporal para seleccionarlo
        if (latParam && lonParam) {
          const lat = parseFloat(latParam);
          const lon = parseFloat(lonParam);

          if (!isNaN(lat) && !isNaN(lon)) {
            // Buscamos si existe un lugar con esas coordenadas exactas en los datos de Overpass
            const matchedPlace = data.find(
              (p) => Math.abs(p.lat - lat) < 0.0001 && Math.abs(p.lon - lon) < 0.0001
            );

            if (matchedPlace) {
              setSelectedPlace(matchedPlace);
            } else {
              // Si no está exacto en la lista de Overpass, montamos un marcador temporal con los datos de la URL
              setSelectedPlace({
                id: 'custom-view-place',
                name: 'Lugar Turístico Guardado',
                category: 'other',
                description: 'Ubicación seleccionada desde tu panel de control.',
                lat,
                lon,
                address: 'Tlaxcala, México'
              } as Place);
            }
          }
        }
      } catch (error) {
        console.error('Error al inicializar los datos:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [hasMounted, latParam, lonParam]);

  // 3. Filtrado reactivo (incluyendo soporte a favoritos)
  useEffect(() => {
    if (!hasMounted) return;

    startTransition(() => {
      let result = allPlaces;

      if (activeCategory === 'favorites') {
        const savedFavorites: Place[] = JSON.parse(localStorage.getItem('tlaxgo_favorites') || '[]');
        const favIds = new Set(savedFavorites.map((fav) => fav.id));
        result = result.filter((place) => favIds.has(place.id));
      } else if (activeCategory !== 'all') {
        result = result.filter((place) => place.category === activeCategory);
      }

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

  if (!hasMounted) {
    return (
      <main className="relative flex flex-col h-[calc(100vh-80px)] w-full overflow-hidden bg-slate-50 items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600"></div>
      </main>
    );
  }

  return (
    <main className="relative flex flex-col h-[calc(100vh-80px)] w-full overflow-hidden bg-slate-50 text-slate-900">

      {/* Contenedor Flotante de Controles */}
      <div className="absolute top-16 sm:top-4 left-16 right-4 z-[9999] max-w-xl mx-auto flex flex-col gap-3">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <Filters activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>

      {/* Área del mapa */}
      <div className="flex-1 w-full h-full">
        {isLoading ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600"></div>
            <p className="text-slate-500 text-sm font-medium animate-pulse">
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
        <div className="absolute top-28 right-4 z-[9999] bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-xl border border-slate-200 text-xs text-sky-600 font-medium animate-pulse">
          Actualizando mapa...
        </div>
      )}
    </main>
  );
}

// Envoltorio con Suspense requerido por Next.js al utilizar useSearchParams
export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-slate-50 gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600"></div>
        <p className="text-slate-600 text-sm font-medium">Cargando explorador...</p>
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}
