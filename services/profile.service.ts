import { createClient } from "@/lib/supabase/client";
import { UserProfile } from "@/types/user";

export const profileService = {
  // Actualizar perfil de usuario
  async updateProfile(
    userId: string,
    updates: { name?: string; bio?: string; location?: string; avatar_url?: string }
  ) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    return data as UserProfile;
  },

  // Métricas agregadas para el Dashboard de Administrador
  async getAdminStats() {
    const supabase = createClient();

    const [usersRes, placesRes, itinerariesRes, eventsRes, reviewsRes] = await Promise.all([
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("places").select("id", { count: "exact", head: true }),
      supabase.from("itineraries").select("id", { count: "exact", head: true }),
      supabase.from("events").select("id", { count: "exact", head: true }),
      supabase.from("reviews").select("id, rating, created_at, profiles(name), places(name)"),
    ]);

    return {
      totalUsers: usersRes.count || 0,
      totalPlaces: placesRes.count || 0,
      totalItineraries: itinerariesRes.count || 0,
      totalEvents: eventsRes.count || 0,
      recentReviews: reviewsRes.data || [],
    };
  },

  // Resumen personalizado para el Dashboard de Turista
  async getUserDashboardData(userId: string) {
    const supabase = createClient();

    const [favsRes, itFavsRes, reviewsRes] = await Promise.all([
      supabase
        .from("favorites")
        .select("saved_at, places(*)")
        .eq("user_id", userId),
      supabase
        .from("itinerary_favorites")
        .select("saved_at, itineraries(*, itinerary_days(*))")
        .eq("user_id", userId),
      supabase
        .from("reviews")
        .select("id, rating, comment, places(name)")
        .eq("user_id", userId),
    ]);

    return {
      favoritePlaces: favsRes.data?.map((f: any) => f.places) || [],
      favoriteItineraries: itFavsRes.data?.map((f: any) => f.itineraries) || [],
      userReviews: reviewsRes.data || [],
    };
  },
};