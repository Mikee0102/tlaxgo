import { Place, PlaceCategory } from '../types/place';

const TLAXCALA_BBOX = '19.1000,-98.5000,19.6000,-97.9000';

function mapOsmTagToCategory(tags: Record<string, string>): PlaceCategory {
  if (tags.tourism === 'museum') return 'museum';
  if (tags.amenity === 'place_of_worship') return 'church';
  if (tags.leisure === 'park') return 'park';
  if (tags.tourism === 'viewpoint') return 'viewpoint';
  if (tags.amenity === 'restaurant' || tags.amenity === 'cafe') return 'restaurant';
  if (tags.tourism === 'hotel' || tags.tourism === 'guest_house') return 'hotel';
  return 'other';
}

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
    
    if (!response.ok) {
      console.warn(`Overpass API respondió con estado: ${response.status}. Usando fallback local.`);
      return getFallbackPlaces();
    }

    const data = await response.json();
    if (!data.elements) return getFallbackPlaces();

    return data.elements
      .map((element: any) => {
        const tags = element.tags || {};
        const lat = element.lat ?? element.center?.lat;
        const lon = element.lon ?? element.center?.lon;
        const category = mapOsmTagToCategory(tags);

        return {
          id: String(element.id),
          name: tags.name || tags.official_name || 'Lugar sin nombre',
          lat: Number(lat),
          lon: Number(lon),
          category: category,
          address: tags['addr:street']
            ? `${tags['addr:street']} ${tags['addr:housenumber'] || ''}`.trim()
            : undefined,
          phone: tags.phone || tags['contact:phone'] || undefined,
          website: tags.website || tags['contact:website'] || undefined,
          rating: 4.5,
          description: tags.description || `Un hermoso punto turistico ubicado en Tlaxcala.`,
          image: tags.image || tags['wikimedia_commons'] || undefined,
          wikipedia: tags.wikipedia || undefined,
        };
      })
      .filter((place: Place) => place.name !== 'Lugar sin nombre' && !isNaN(place.lat) && !isNaN(place.lon));

  } catch (error) {
    console.error('Error al conectar con Overpass API. Usando fallback local:', error);
    return getFallbackPlaces();
  }
}

function getFallbackPlaces(): Place[] {
  return [
    {
      id: 'fb-1',
      name: 'Zócalo de Tlaxcala',
      lat: 19.3182,
      lon: -98.2396,
      category: 'park',
      description: 'Plaza principal de la ciudad de Tlaxcala, rodeada de edificios coloniales históricos.',
      address: 'Portal de Hidalgo, Centro, Tlaxcala',
      wikipedia: 'es:Plaza de la Constitución (Tlaxcala)',
    },
    {
      id: 'fb-2',
      name: 'Museo de Arte de Tlaxcala',
      lat: 19.3186,
      lon: -98.2385,
      category: 'museum',
      description: 'Espacio dedicado a la difusión de las artes visuales del estado.',
      address: 'Plaza de la Constitución 21, Centro, Tlaxcala',
    },
  ];
}