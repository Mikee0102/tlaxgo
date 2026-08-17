import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export const itineraryService = {
  // Obtener días y actividades por separado para evitar fallos de Foreign Key
  async getDaysWithActivities(userId: string) {
    // 1. Obtener los días
    const { data: days, error: daysError } = await supabase
      .from('itinerary_days')
      .select('*')
      .order('date', { ascending: true });

    if (daysError) throw daysError;

    // 2. Cargar actividades de cada día
    const daysWithActivities = await Promise.all(
      (days || []).map(async (day) => {
        const { data: activities, error: activitiesError } = await supabase
          .from('activities')
          .select('*')
          .eq('day_id', day.id)
          .order('time', { ascending: true });

        if (activitiesError) throw activitiesError;
        return { ...day, activities: activities || [] };
      })
    );

    return daysWithActivities;
  },

  // Agregar un día
  async addDay(userId: string, date: string, title: string) {
    // Intentamos insertar con user_id. Si tu tabla no tiene esa columna, insertamos sin él.
    const payload: Record<string, any> = { date, title };
    if (userId) payload.user_id = userId;

    const { data, error } = await supabase
      .from('itinerary_days')
      .insert([payload])
      .select();

    if (error) throw error;
    return { ...data[0], activities: [] };
  },

  // Eliminar un día
  async deleteDay(id: string) {
    const { error } = await supabase
      .from('itinerary_days')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  // Actualizar título del día
  async updateDayTitle(id: string, title: string) {
    const { data, error } = await supabase
      .from('itinerary_days')
      .update({ title })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  },

  // Agregar actividad
  async addActivity(dayId: string, activity: any) {
    const { data, error } = await supabase
      .from('activities')
      .insert([{ ...activity, day_id: dayId }])
      .select();

    if (error) throw error;
    return data[0];
  },

  // Eliminar actividad
  async deleteActivity(id: string) {
    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },
};