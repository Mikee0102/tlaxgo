'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Place } from '../../types/place';
import { Layers, Navigation } from 'lucide-react';

// Corrección de íconos por defecto de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Tipos de capas disponibles
type TileProvider = 'dark' | 'standard' | 'satellite';

const TILE_LAYERS: Record<TileProvider, { url: string; attribution: string }> = {
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
  standard: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  },
};

// Componente para re-centrar el mapa programáticamente
function MapController({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

interface MapProps {
  places: Place[];
  selectedPlace: Place | null;
  onSelectPlace: (place: Place | null) => void;
}

export default function Map({ places, selectedPlace, onSelectPlace }: MapProps) {
  const defaultCenter: [number, number] = [19.3182, -98.2396]; // Zócalo de Tlaxcala
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [currentLayer, setCurrentLayer] = useState<TileProvider>('dark');
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  // Mover el centro cuando cambia el selectedPlace
  useEffect(() => {
    if (selectedPlace) {
      setMapCenter([selectedPlace.lat, selectedPlace.lon]);
    }
  }, [selectedPlace]);

  // Geolocalización en Tiempo Real
  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(loc);
          setMapCenter(loc);
        },
        (error) => {
          alert('No se pudo obtener tu ubicación. Por favor activa el GPS.');
          console.error(error);
        }
      );
    }
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        className="w-full h-full z-0"
        zoomControl={false}
      >
        <TileLayer
          url={TILE_LAYERS[currentLayer].url}
          attribution={TILE_LAYERS[currentLayer].attribution}
        />

        <MapController center={mapCenter} />

        {/* Marcador de ubicación del usuario */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={L.divIcon({
              className: 'custom-user-marker',
              html: `<div class="w-4 h-4 bg-sky-400 rounded-full border-2 border-white shadow-lg animate-ping"></div>`,
            })}
          >
            <Popup>¡Estás aquí!</Popup>
          </Marker>
        )}

        {/* Marcadores de atractivos */}
        {places.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lon]}
            eventHandlers={{
              click: () => onSelectPlace(place),
            }}
          >
            <Popup>
              <div className="text-slate-900 font-sans">
                <strong className="block text-sm">{place.name}</strong>
                <span className="text-xs text-slate-600 capitalize">{place.category}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Botones de Control Flotantes (Lado Derecho) */}
      <div className="absolute bottom-24 right-4 z-[9999] flex flex-col gap-2">
        {/* Selector de Capas */}
        <div className="relative">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="p-3 rounded-full bg-slate-950/90 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-white shadow-2xl transition"
            title="Cambiar capa de mapa"
          >
            <Layers className="w-5 h-5" />
          </button>

          {showLayerMenu && (
            <div className="absolute right-12 bottom-0 bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-2xl p-2 shadow-2xl flex flex-col gap-1 w-32">
              <button
                onClick={() => { setCurrentLayer('dark'); setShowLayerMenu(false); }}
                className={`text-xs px-3 py-1.5 rounded-xl text-left transition ${currentLayer === 'dark' ? 'bg-sky-500 text-white' : 'text-slate-300 hover:bg-slate-900'}`}
              >
                🌙 Oscuro
              </button>
              <button
                onClick={() => { setCurrentLayer('standard'); setShowLayerMenu(false); }}
                className={`text-xs px-3 py-1.5 rounded-xl text-left transition ${currentLayer === 'standard' ? 'bg-sky-500 text-white' : 'text-slate-300 hover:bg-slate-900'}`}
              >
                🗺️ Estándar
              </button>
              <button
                onClick={() => { setCurrentLayer('satellite'); setShowLayerMenu(false); }}
                className={`text-xs px-3 py-1.5 rounded-xl text-left transition ${currentLayer === 'satellite' ? 'bg-sky-500 text-white' : 'text-slate-300 hover:bg-slate-900'}`}
              >
                🛰️ Satelital
              </button>
            </div>
          )}
        </div>

        {/* Botón Geolocalización */}
        <button
          onClick={handleGetLocation}
          className="p-3 rounded-full bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20 transition"
          title="Mi Ubicación Actual"
        >
          <Navigation className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}