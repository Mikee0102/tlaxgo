export type PlaceCategory = 'museum' | 'church' | 'park' | 'viewpoint' | 'restaurant' | 'hotel' | 'other';

export interface Place {
  id: string;
  name: string;
  lat: number;
  lon: number;
  category: PlaceCategory;
  description?: string;
  address?: string;
  phone?: string;
  website?: string;
  rating?: number;
  imageUrl?: string;
  isFavorite?: boolean;
}