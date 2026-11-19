import { Place, PlaceCategory } from '../types/place';

const TLAXCALA_BBOX = '19.1000,-98.5000,19.6000,-97.9000';

const TLAXCALA_MUNICIPALITIES: { name: string; lat: number; lon: number }[] = [
  { name: 'Acuamanala de Miguel Hidalgo', lat: 19.2225, lon: -98.2014 },
  { name: 'Amaxac de Guerrero', lat: 19.3497, lon: -98.1694 },
  { name: 'Apetatitlán de Antonio Carvajal', lat: 19.3458, lon: -98.1917 },
  { name: 'Apizaco', lat: 19.4167, lon: -98.1375 },
  { name: 'Atlangatepec', lat: 19.5389, lon: -98.1986 },
  { name: 'Atltzayanca', lat: 19.4314, lon: -97.7958 },
  { name: 'Benito Juárez', lat: 19.5889, lon: -98.4236 },
  { name: 'Calpulalpan', lat: 19.5881, lon: -98.5686 },
  { name: 'Chiautempan', lat: 19.3136, lon: -98.2206 },
  { name: 'Contla de Juan Cuamatzi', lat: 19.3333, lon: -98.1667 },
  { name: 'Cuapiaxtla', lat: 19.2972, lon: -97.7681 },
  { name: 'Cuaxomulco', lat: 19.3542, lon: -98.1014 },
  { name: 'El Carmen Tequexquitla', lat: 19.3250, lon: -97.6542 },
  { name: 'Emiliano Zapata', lat: 19.5583, lon: -97.9167 },
  { name: 'Españita', lat: 19.4625, lon: -98.4236 },
  { name: 'Huamantla', lat: 19.3139, lon: -97.9236 },
  { name: 'Hueyotlipan', lat: 19.4722, lon: -98.3472 },
  { name: 'Ixtacuixtla de Mariano Matamoros', lat: 19.3278, lon: -98.3778 },
  { name: 'Ixtenco', lat: 19.2528, lon: -97.8958 },
  { name: 'La Magdalena Tlaltelulco', lat: 19.2750, lon: -98.1972 },
  { name: 'Lázaro Cárdenas', lat: 19.5361, lon: -97.9833 },
  { name: 'Mazatecochco de José María Morelos', lat: 19.1806, lon: -98.1875 },
  { name: 'Muñoz de Domingo Arenas', lat: 19.4750, lon: -98.2083 },
  { name: 'Nanacamilpa de Mariano Arista', lat: 19.4931, lon: -98.5361 },
  { name: 'Natívitas', lat: 19.2333, lon: -98.3167 },
  { name: 'Panotla', lat: 19.3153, lon: -98.2736 },
  { name: 'Papalotla de Xicohténcatl', lat: 19.1667, lon: -98.2000 },
  { name: 'San Damián Texóloc', lat: 19.2778, lon: -98.2833 },
  { name: 'San Francisco Tetlanohcan', lat: 19.2611, lon: -98.1639 },
  { name: 'San Jerónimo Zacualpan', lat: 19.2417, lon: -98.2583 },
  { name: 'San José Teacalco', lat: 19.3361, lon: -98.0639 },
  { name: 'San Juan Huactzinco', lat: 19.2333, lon: -98.2500 },
  { name: 'San Lorenzo Axocomanitla', lat: 19.2222, lon: -98.2472 },
  { name: 'San Lucas Tecopilco', lat: 19.4778, lon: -98.2611 },
  { name: 'San Pablo del Monte', lat: 19.1167, lon: -98.1667 },
  { name: 'Sanctórum de Lázaro Cárdenas', lat: 19.4917, lon: -98.4722 },
  { name: 'Santa Ana Nopalucan', lat: 19.2972, lon: -98.3389 },
  { name: 'Santa Apolonia Teacalco', lat: 19.2417, lon: -98.3083 },
  { name: 'Santa Catarina Ayometla', lat: 19.1972, lon: -98.2083 },
  { name: 'Santa Cruz Quilehtla', lat: 19.2056, lon: -98.2167 },
  { name: 'Santa Cruz Tlaxcala', lat: 19.3556, lon: -98.1500 },
  { name: 'Santa Isabel Xiloxoxtla', lat: 19.2639, lon: -98.2139 },
  { name: 'Tenancingo', lat: 19.1472, lon: -98.2000 },
  { name: 'Teolocholco', lat: 19.2389, lon: -98.1861 },
  { name: 'Tepetitla de Lardizábal', lat: 19.2667, lon: -98.3750 },
  { name: 'Tepeyanco', lat: 19.2472, lon: -98.2306 },
  { name: 'Terrenate', lat: 19.4778, lon: -97.9194 },
  { name: 'Tetla de la Solidaridad', lat: 19.4333, lon: -98.1000 },
  { name: 'Tetlatlahuca', lat: 19.2222, lon: -98.2944 },
  { name: 'Tlaxcala', lat: 19.3182, lon: -98.2375 },
  { name: 'Tlaxco', lat: 19.6139, lon: -98.1194 },
  { name: 'Tocatlán', lat: 19.3889, lon: -98.0278 },
  { name: 'Totolac', lat: 19.3278, lon: -98.2583 },
  { name: 'Tzompantepec', lat: 19.3750, lon: -98.0917 },
  { name: 'Xaloztoc', lat: 19.4056, lon: -98.0472 },
  { name: 'Xaltocan', lat: 19.4194, lon: -98.2083 },
  { name: 'Xicohtzinco', lat: 19.1750, lon: -98.2333 },
  { name: 'Yauhquemehcan', lat: 19.4056, lon: -98.1750 },
  { name: 'Zacatelco', lat: 19.2167, lon: -98.2417 },
  { name: 'Ziltlaltépec de Trinidad Sánchez Santos', lat: 19.2028, lon: -97.9083 },
];

function resolveMunicipality(tags: Record<string, string>, lat: number, lon: number): string {
  const osmMunicipality =
    tags['addr:municipality'] ||
    tags['addr:city'] ||
    tags['addr:town'] ||
    tags['addr:village'];

  if (osmMunicipality && osmMunicipality.trim() !== '') {
    return osmMunicipality.trim();
  }

  let closest = TLAXCALA_MUNICIPALITIES[0];
  let minDistance = Infinity;

  for (const mun of TLAXCALA_MUNICIPALITIES) {
    const dLat = lat - mun.lat;
    const dLon = lon - mun.lon;
    const dist = dLat * dLat + dLon * dLon;
    if (dist < minDistance) {
      minDistance = dist;
      closest = mun;
    }
  }

  return closest.name;
}

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
        const lat = Number(element.lat ?? element.center?.lat);
        const lon = Number(element.lon ?? element.center?.lon);
        const category = mapOsmTagToCategory(tags);
        const municipality = !isNaN(lat) && !isNaN(lon) ? resolveMunicipality(tags, lat, lon) : 'Tlaxcala';

        const streetAddress = tags['addr:street']
          ? `${tags['addr:street']} ${tags['addr:housenumber'] || ''}`.trim()
          : '';

        return {
          id: String(element.id),
          name: tags.name || tags.official_name || 'Lugar sin nombre',
          lat,
          lon,
          category,
          municipality,
          address: streetAddress ? `${streetAddress}, ${municipality}` : `${municipality}, Tlaxcala`,
          phone: tags.phone || tags['contact:phone'] || undefined,
          website: tags.website || tags['contact:website'] || undefined,
          rating: 4.5,
          description: tags.description || `Punto turístico ubicado en ${municipality}, Tlaxcala.`,
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
      municipality: 'Tlaxcala',
      description: 'Plaza principal de la ciudad de Tlaxcala, rodeada de edificios coloniales históricos.',
      address: 'Portal de Hidalgo, Centro, Tlaxcala',
      wikipedia: 'es:Plaza de la Constitución (Tlaxcala)',
    } as Place,
    {
      id: 'fb-2',
      name: 'Museo de Arte de Tlaxcala',
      lat: 19.3186,
      lon: -98.2385,
      category: 'museum',
      municipality: 'Tlaxcala',
      description: 'Espacio dedicado a la difusión de las artes visuales del estado.',
      address: 'Plaza de la Constitución 21, Centro, Tlaxcala',
    } as Place,
  ];
}