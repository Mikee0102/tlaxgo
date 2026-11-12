// types/itinerary.ts

export interface Activity {
  id?: string;
  title: string;
  description?: string;
  time?: string;
  start_time?: string;
  duration_minutes?: number;
  location?: string;
  notes?: string;
}

export interface DayItinerary {
  day_number?: number;
  date?: string;
  title?: string;
  activities?: Activity[];
  items?: Activity[];
}

export interface Itinerary {
  id?: string;
  userId?: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  is_favorite?: boolean;
  days?: DayItinerary[]; // 👈 Agrega esta propiedad opcional
  itinerary_days?: DayItinerary[]; // Opcional por compatibilidad
  createdAt?: string;
  updatedAt?: string;
}