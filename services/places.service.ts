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
    
    // Si el servidor de Overpass da Timeout (504) o falla, devolvemos un array vacío
    // en lugar de lanzar una excepción que tire la aplicación.
    if (!response.ok) {
      console.warn(`Overpass API respondió con estado: ${response.status}. Usando fallback vacío.`);
      return getFallbackPlaces(); // Retornamos datos de prueba locales para que puedas seguir desarrollando
    }

    const data = await response.json();
    if (!data.elements) return getFallbackPlaces();

    return data.elements.map((element: any) => {
      const tags = element.tags || {};
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
        rating: 4.5, 
        description: tags.description || `Un hermoso lugar de interés ubicado en Tlaxcala.`,
      };
    }).filter((place: Place) => place.name !== 'Lugar sin nombre' && !isNaN(place.lat) && !isNaN(place.lon));

  } catch (error) {
    console.error('Error de red al conectar con Overpass API. Usando fallback vacío:', error);
    return getFallbackPlaces(); 
  }
}

// Función auxiliar para que tu mapa nunca se quede vacío si la API externa falla
function getFallbackPlaces(): Place[] {
  return [
    {
      id: 'fb-1',
      name: 'Zócalo de Tlaxcala',
      lat: 19.3182,
      lon: -98.2396,
      category: 'park',
      description: 'Plaza principal de la ciudad de Tlaxcala, rodeada de edificios coloniales históricos.',
      address: 'Portal de Hidalgo, Centro, Tlaxcala'
    },
    {
      id: 'fb-2',
      name: 'Museo de Arte de Tlaxcala',
      lat: 19.3186,
      lon: -98.2385,
      category: 'museum',
      description: 'Espacio dedicado a la difusión de las artes visuales del estado.',
      address: 'Plaza de la Constitución 21, Centro, Tlaxcala'
    }
  ];
}