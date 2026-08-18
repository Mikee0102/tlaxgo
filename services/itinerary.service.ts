import { createClient } from "@/lib/supabase/client";
import { Itinerary } from "@/types/itinerary";

export const itineraryService = {
  // READ ALL
  async getItineraries(userId?: string): Promise<Itinerary[]> {
    const supabase = createClient();
    
    const { data: itineraries, error } = await supabase
      .from("itineraries")
      .select(`
        *,
        itinerary_days (
          *,
          itinerary_items (*)
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    let favoriteIds = new Set<string>();
    if (userId) {
      const { data: favs } = await supabase
        .from("itinerary_favorites")
        .select("itinerary_id")
        .eq("user_id", userId);
      
      favoriteIds = new Set(favs?.map((f) => f.itinerary_id) || []);
    }

    return (itineraries || []).map((it) => ({
      ...it,
      is_favorite: favoriteIds.has(it.id),
      itinerary_days: (it.itinerary_days || []).sort(
        (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    })) as Itinerary[];
  },

  // READ ONE
  async getItineraryById(id: string): Promise<Itinerary | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("itineraries")
      .select(`
        *,
        itinerary_days (
          *,
          itinerary_items (*)
        )
      `)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Itinerary;
  },

  // CREATE
  async createFullItinerary(
    userId: string,
    data: {
      title: string;
      description: string;
      start_date: string;
      end_date: string;
      days: { date: string; title: string; items: { title: string; start_time: string; duration_minutes: number; notes: string }[] }[];
    }
  ) {
    const supabase = createClient();

    const { data: itData, error: itError } = await supabase
      .from("itineraries")
      .insert({
        user_id: userId,
        title: data.title,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        status: "planned",
      })
      .select()
      .single();

    if (itError) throw itError;

    for (const day of data.days) {
      const { data: dayData, error: dayError } = await supabase
        .from("itinerary_days")
        .insert({
          itinerary_id: itData.id,
          date: day.date,
          title: day.title,
        })
        .select()
        .single();

      if (dayError) throw dayError;

      if (day.items.length > 0) {
        const itemsToInsert = day.items.map((item, idx) => ({
          day_id: dayData.id,
          title: item.title,
          start_time: item.start_time || null,
          duration_minutes: item.duration_minutes || null,
          notes: item.notes || null,
          position: idx,
        }));

        const { error: itemsError } = await supabase
          .from("itinerary_items")
          .insert(itemsToInsert);

        if (itemsError) throw itemsError;
      }
    }

    return itData;
  },

  // UPDATE
  async updateFullItinerary(
    itineraryId: string,
    data: {
      title: string;
      description: string;
      start_date: string;
      end_date: string;
      days: { date: string; title: string; items: { title: string; start_time: string; duration_minutes: number; notes: string }[] }[];
    }
  ) {
    const supabase = createClient();

    // 1. Actualizar cabecera
    const { error: itError } = await supabase
      .from("itineraries")
      .update({
        title: data.title,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
      })
      .eq("id", itineraryId);

    if (itError) throw itError;

    // 2. Re-sincronizar días (los ON DELETE CASCADE eliminan los items automáticamente)
    await supabase.from("itinerary_days").delete().eq("itinerary_id", itineraryId);

    for (const day of data.days) {
      const { data: dayData, error: dayError } = await supabase
        .from("itinerary_days")
        .insert({
          itinerary_id: itineraryId,
          date: day.date,
          title: day.title,
        })
        .select()
        .single();

      if (dayError) throw dayError;

      if (day.items.length > 0) {
        const itemsToInsert = day.items.map((item, idx) => ({
          day_id: dayData.id,
          title: item.title,
          start_time: item.start_time || null,
          duration_minutes: item.duration_minutes || null,
          notes: item.notes || null,
          position: idx,
        }));

        const { error: itemsError } = await supabase
          .from("itinerary_items")
          .insert(itemsToInsert);

        if (itemsError) throw itemsError;
      }
    }
  },

  // DELETE
  async deleteItinerary(itineraryId: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from("itineraries")
      .delete()
      .eq("id", itineraryId);

    if (error) throw error;
  },

  // FAVORITES
  async toggleFavorite(userId: string, itineraryId: string, isFav: boolean) {
    const supabase = createClient();
    if (isFav) {
      return await supabase
        .from("itinerary_favorites")
        .delete()
        .eq("user_id", userId)
        .eq("itinerary_id", itineraryId);
    } else {
      return await supabase
        .from("itinerary_favorites")
        .insert({ user_id: userId, itinerary_id: itineraryId });
    }
  },
};