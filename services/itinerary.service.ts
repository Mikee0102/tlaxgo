import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

// ============================================================
// TIPOS
// ============================================================

export interface Itinerary {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  days: ItineraryDay[];
}

export interface ItineraryDay {
  id: string;
  itinerary_id: string;
  date: string;
  title?: string;
  items: ItineraryItem[];
}

export interface ItineraryItem {
  id: string;
  day_id: string;
  place_id?: string;
  title: string;
  start_time?: string;
  duration_minutes?: number;
  notes?: string;
  position: number;
}

// ============================================================
// SERVICIOS
// ============================================================

export const itineraryService = {
  // ==========================================================
  // 1. OBTENER ITINERARIO COMPLETO
  // ==========================================================
  async getFullItinerary(itineraryId: string): Promise<Itinerary | null> {
    // 1. Obtener el itinerario
    const { data: itinerary, error: itineraryError } = await supabase
      .from('itineraries')
      .select('*')
      .eq('id', itineraryId)
      .single();

    if (itineraryError) throw itineraryError;
    if (!itinerary) return null;

    // 2. Obtener los días
    const { data: days, error: daysError } = await supabase
      .from('itinerary_days')
      .select('*')
      .eq('itinerary_id', itineraryId)
      .order('date', { ascending: true });

    if (daysError) throw daysError;

    // 3. Obtener los items de cada día
    const daysWithItems = await Promise.all(
      (days || []).map(async (day) => {
        const { data: items, error: itemsError } = await supabase
          .from('itinerary_items')
          .select('*')
          .eq('day_id', day.id)
          .order('position', { ascending: true });

        if (itemsError) throw itemsError;
        return { ...day, items: items || [] };
      })
    );

    return { ...itinerary, days: daysWithItems };
  },

  // ==========================================================
  // 2. OBTENER TODOS LOS ITINERARIOS DEL USUARIO
  // ==========================================================
  async getUserItineraries(userId: string): Promise<Itinerary[]> {
    const { data, error } = await supabase
      .from('itineraries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // ==========================================================
  // 3. CREAR ITINERARIO
  // ==========================================================
  async createItinerary(
    userId: string,
    title: string,
    description?: string,
    start_date?: string,
    end_date?: string
  ): Promise<Itinerary> {
    const { data, error } = await supabase
      .from('itineraries')
      .insert({
        user_id: userId,
        title,
        description,
        start_date,
        end_date,
        status: 'planned'
      })
      .select()
      .single();

    if (error) throw error;
    return { ...data, days: [] };
  },

  // ==========================================================
  // 4. ACTUALIZAR ITINERARIO
  // ==========================================================
  async updateItinerary(
    itineraryId: string,
    updates: Partial<Omit<Itinerary, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
  ): Promise<Itinerary> {
    const { data, error } = await supabase
      .from('itineraries')
      .update(updates)
      .eq('id', itineraryId)
      .select()
      .single();

    if (error) throw error;
    return { ...data, days: [] };
  },

  // ==========================================================
  // 5. ELIMINAR ITINERARIO
  // ==========================================================
  async deleteItinerary(itineraryId: string): Promise<void> {
    const { error } = await supabase
      .from('itineraries')
      .delete()
      .eq('id', itineraryId);

    if (error) throw error;
  },

  // ==========================================================
  // 6. AGREGAR DÍA A ITINERARIO
  // ==========================================================
  async addDay(
    itineraryId: string,
    date: string,
    title?: string
  ): Promise<ItineraryDay> {
    const { data, error } = await supabase
      .from('itinerary_days')
      .insert({
        itinerary_id: itineraryId,
        date,
        title
      })
      .select()
      .single();

    if (error) throw error;
    return { ...data, items: [] };
  },

  // ==========================================================
  // 7. ELIMINAR DÍA
  // ==========================================================
  async deleteDay(dayId: string): Promise<void> {
    const { error } = await supabase
      .from('itinerary_days')
      .delete()
      .eq('id', dayId);

    if (error) throw error;
  },

  // ==========================================================
  // 8. ACTUALIZAR DÍA
  // ==========================================================
  async updateDay(
    dayId: string,
    updates: Partial<Omit<ItineraryDay, 'id' | 'itinerary_id'>>
  ): Promise<ItineraryDay> {
    const { data, error } = await supabase
      .from('itinerary_days')
      .update(updates)
      .eq('id', dayId)
      .select()
      .single();

    if (error) throw error;
    return { ...data, items: [] };
  },

  // ==========================================================
  // 9. AGREGAR ACTIVIDAD (ITEM)
  // ==========================================================
  async addItem(
    dayId: string,
    item: Omit<ItineraryItem, 'id' | 'day_id' | 'position'>
  ): Promise<ItineraryItem> {
    // Obtener la posición actual máxima para este día
    const { data: existing, error: countError } = await supabase
      .from('itinerary_items')
      .select('position')
      .eq('day_id', dayId)
      .order('position', { ascending: false })
      .limit(1);

    if (countError) throw countError;

    const nextPosition = (existing && existing.length > 0)
      ? existing[0].position + 1
      : 0;

    const { data, error } = await supabase
      .from('itinerary_items')
      .insert({
        ...item,
        day_id: dayId,
        position: nextPosition
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // ==========================================================
  // 10. ELIMINAR ACTIVIDAD
  // ==========================================================
  async deleteItem(itemId: string): Promise<void> {
    const { error } = await supabase
      .from('itinerary_items')
      .delete()
      .eq('id', itemId);

    if (error) throw error;
  },

  // ==========================================================
  // 11. ACTUALIZAR ACTIVIDAD
  // ==========================================================
  async updateItem(
    itemId: string,
    updates: Partial<Omit<ItineraryItem, 'id' | 'day_id' | 'position'>>
  ): Promise<ItineraryItem> {
    const { data, error } = await supabase
      .from('itinerary_items')
      .update(updates)
      .eq('id', itemId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // ==========================================================
  // 12. REORDENAR ACTIVIDADES
  // ==========================================================
  async reorderItems(dayId: string, itemIds: string[]): Promise<void> {
    // Actualiza la posición de cada item según el orden dado
    const updates = itemIds.map((id, index) => ({
      id,
      position: index
    }));

    const { error } = await supabase
      .from('itinerary_items')
      .upsert(updates, { onConflict: 'id' });

    if (error) throw error;
  },

  // ==========================================================
  // 13. OBTENER ACTIVIDAD POR ID
  // ==========================================================
  async getItem(itemId: string): Promise<ItineraryItem | null> {
    const { data, error } = await supabase
      .from('itinerary_items')
      .select('*')
      .eq('id', itemId)
      .single();

    if (error) throw error;
    return data;
  }
};