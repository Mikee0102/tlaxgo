export type PlaceCategory =
  | 'museum'
  | 'church'
  | 'park'
  | 'viewpoint'
  | 'restaurant'
  | 'hotel'
  | 'other';

export interface Place {
  id: string;
  name: string;
  lat: number;
  lon: number;
  category: PlaceCategory;
  address?: string;
  phone?: string;
  website?: string;
  // Campos que se conectarán con Supabase en fases posteriores
  rating?: number;
  imageUrl?: string;
  description?: string;
}
