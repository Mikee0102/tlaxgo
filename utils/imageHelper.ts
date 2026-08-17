import { PlaceCategory } from '../types/place';

// Colección de imágenes de respaldo organizadas por categoría
const CATEGORY_FALLBACKS: Record<PlaceCategory | 'default', string[]> = {
  museum: [
    'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=600&q=80',
  ],
  church: [
    'https://images.unsplash.com/photo-1548625361-185121303248?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=600&q=80',
  ],
  park: [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
  ],
  viewpoint: [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
  ],
  restaurant: [
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
  ],
  hotel: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
  ],
  other: [
    'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=600&q=80',
  ],
  default: [
    'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=600&q=80',
  ],
};

interface PlaceForImage {
  id: string;
  category: PlaceCategory;
  image?: string;
  wikipedia?: string;
}

/**
 * Devuelve un arreglo de URLs de imagen específicas para cada lugar.
 */
export function getPlaceImages(place: PlaceForImage): string[] {
  // 1. Imagen directa si el nodo de OpenStreetMap incluye la etiqueta 'image' o 'wikimedia_commons'
  if (place.image) {
    return [place.image];
  }

  // 2. Imagen desde Wikipedia si el lugar tiene la etiqueta 'wikipedia'
  if (place.wikipedia) {
    const wikiTitle = place.wikipedia.split(':')[1] || place.wikipedia;
    const wikiImageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(wikiTitle)}.jpg`;
    return [wikiImageUrl];
  }

  // 3. Fallback dinámico usando el ID único para que lugares distintos no repitan la misma imagen
  const fallbacks = CATEGORY_FALLBACKS[place.category] || CATEGORY_FALLBACKS.default;
  const hash = place.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const primaryFallback = fallbacks[hash % fallbacks.length];

  return [
    primaryFallback,
    `https://picsum.photos/seed/${place.id}/600/400`,
  ];
}