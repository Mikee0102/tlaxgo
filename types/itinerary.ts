export interface ItineraryItem {
  id?: string;
  day_id?: string;
  place_id?: string | null;
  title: string;
  start_time?: string;
  duration_minutes?: number;
  notes?: string;
  position: number;
}

export interface ItineraryDay {
  id?: string;
  itinerary_id?: string;
  date: string;
  title?: string;
  itinerary_items: ItineraryItem[];
}

export interface Itinerary {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  created_at: string;
  itinerary_days?: ItineraryDay[];
  is_favorite?: boolean;
}