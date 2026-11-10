// types/place.ts

export type PlaceCategory = 'museum' | 'church' | 'park' | 'viewpoint' | 'restaurant' | 'hotel' | 'other';

export interface Place {
  id: string;
  name: string;
  lat: number;
  lon: number;
  category: PlaceCategory;
  address?: string;
  phone?: string;
  website?: string;
  rating?: number;
  description?: string;
  image?: string;
  wikipedia?: string; // 👈 Agrega esta propiedad opcional
}