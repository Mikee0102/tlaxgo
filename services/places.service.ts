import { Place, PlaceCategory } from '../types/place';

// Coordenadas aproximadas que encierran al Estado de Tlaxcala (Bounding Box)
// Formato Overpass: (sur, oeste, norte, este)
const TLAXCALA_BBOX = '19.09,-98.63,19.74,-97.90';

// Mapa de etiquetas de OpenStreetMap a nuestras categorías de TlaxGo
const CATEGORY_MAPPING: Record<string, PlaceCategory> = {
  museum: 'museum',
  arts_centre: 'museum',
  place_of_worship: 'church',
  park: 'park',
  viewpoint: 'viewpoint',
  restaurant: 'restaurant',
  cafe: 'restaurant',
  hotel: 'hotel',
  guest_house: 'hotel',
};

/**
 * Determina la categoría de TlaxGo basándose en las etiquetas de OpenStreetMap
 */
function getCategoryFromTags(tags: Record<string, string>): PlaceCategory {
  if (tags.tourism === 'museum' || tags.amenity === 'arts_centre') return 'museum';
  if (tags.amenity === 'place_of_worship') return 'church';
  if (tags.leisure === 'park') return 'park';
  if (tags.tourism === 'viewpoint') return 'viewpoint';
  if (tags.amenity === 'restaurant' || tags.amenity === 'cafe') return 'restaurant';
  if (tags.tourism === 'hotel' || tags.tourism === 'guest_house') return 'hotel';
  return 'other';
}

/**
 * Consulta la Overpass API para obtener lugares turísticos en Tlaxcala
 */
export async function fetchPlacesFromOverpass(): Promise<Place[]> {
  // Consulta Overpass QL
  // Busca nodos (node) y maneras (way) con etiquetas turísticas y de interés dentro del Bbox de Tlaxcala
  const query = `
    [out:json][timeout:25];
    (
      node["tourism"~"museum|viewpoint|hotel|guest_house"](${TLAXCALA_BBOX});
      node["amenity"~"place_of_worship|restaurant|cafe"](${TLAXCALA_BBOX});
      node["leisure"="park"](${TLAXCALA_BBOX});
      
      way["tourism"~"museum|viewpoint|hotel|guest_house"](${TLAXCALA_BBOX});
      way["amenity"~"place_of_worship|restaurant|cafe"](${TLAXCALA_BBOX});
      way["leisure"="park"](${TLAXCALA_BBOX});
    );
    out center;
  `;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error en la petición a Overpass: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.elements) return [];

    // Mapeamos y limpiamos los elementos de OSM al formato de nuestro contrato (Place)
    return data.elements.map((element: any) => {
      const tags = element.tags || {};
      
      // Overpass devuelve las coordenadas en 'center' para "ways" (polígonos) o en 'lat'/'lon' para "nodes" (puntos)
      const lat = element.lat ?? element.center?.lat;
      const lon = element.lon ?? element.center?.lon;

      return {
        id: String(element.id),
        name: tags.name || tags.official_name || 'Lugar sin nombre',
        lat: Number(lat),
        lon: Number(lon),
        category: getCategoryFromTags(tags),
        address: tags['addr:street'] 
          ? `${tags['addr:street']} ${tags['addr:housenumber'] || ''}`.trim() 
          : undefined,
        phone: tags.phone || tags['contact:phone'] || undefined,
        website: tags.website || tags['contact:website'] || undefined,
        // Valores por defecto para el Sprint 1 (se conectarán a Supabase en el futuro)
        rating: 4.5, 
        description: tags.description || `Un hermoso lugar de interés ubicado en Tlaxcala.`,
      };
    }).filter((place: Place) => place.name !== 'Lugar sin nombre' && !isNaN(place.lat) && !isNaN(place.lon));

  } catch (error) {
    console.error('Error al cargar los lugares desde Overpass:', error);
    return [];
  }
}