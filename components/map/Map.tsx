'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Place } from '../../types/place';

// Importar los estilos de Leaflet directamente
import 'leaflet/dist/leaflet.css';

// Corregir el bug de los iconos de Leaflet en Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Componente auxiliar para mover la cámara del mapa de forma suave cuando se seleccione un lugar
function ChangeMapView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  return null;
}

interface MapProps {
  places: Place[];
  selectedPlace: Place | null;
  onSelectPlace: (place: Place | null) => void;
}

export default function Map({ places, selectedPlace, onSelectPlace }: MapProps) {
  // Coordenadas iniciales: Centro de Tlaxcala (Zócalo)
  const defaultCenter: [number, number] = [19.3182, -98.2396];
  const activeCenter: [number, number] = selectedPlace 
    ? [selectedPlace.lat, selectedPlace.lon] 
    : defaultCenter;

  return (
    <div className="w-full h-full relative" style={{ minHeight: '400px' }}>
      <MapContainer
        center={activeCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Efecto de movimiento de cámara */}
        {selectedPlace && <ChangeMapView center={activeCenter} />}

        {/* Renderizado de marcadores */}
        {places.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lon]}
            eventHandlers={{
              click: () => onSelectPlace(place),
            }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-sm text-slate-800">{place.name}</h3>
                <p className="text-xs text-slate-500 capitalize">{place.category}</p>
                <button
                  onClick={() => onSelectPlace(place)}
                  className="mt-2 text-xs text-blue-600 font-semibold hover:underline block"
                >
                  Ver detalles
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}