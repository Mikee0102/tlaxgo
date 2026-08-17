'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { profileService } from '@/services/profile.service';
import StatsCard from '@/components/dashborad/statscard';
import ChartWidget from '@/components/dashborad/chartwidget';
import RecentActivity from '@/components/dashborad/recentactivity';
import { 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Calendar, 
  PlusCircle, 
  Compass, 
  Heart,
  Users,
  Map,
  Ticket
} from 'lucide-react';

export default function DashboardPage() {
  const { user, profile, isAdmin, loading: authLoading } = useAuth();
  const [adminStats, setAdminStats] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        setLoadingData(true);
        if (isAdmin) {
          const stats = await profileService.getAdminStats();
          setAdminStats(stats);
        } else {
          const data = await profileService.getUserDashboardData(user.id);
          setUserData(data);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoadingData(false);
      }
    };

    if (!authLoading && user) {
      fetchData();
    }
  }, [user, isAdmin, authLoading]);

  if (authLoading || loadingData) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-slate-400">
        <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm font-medium">Cargando panel de Tlaxgo...</p>
      </div>
    );
  }

  // =========================================================================
  // 1. DASHBOARD ADMINISTRADOR
  // =========================================================================
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 pb-12">
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
          
          <header className="flex flex-col gap-4 rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Panel de Administración
              </span>
              <h1 className="text-3xl font-black text-white">Gestión Central Tlaxgo</h1>
              <p className="text-slate-400 text-sm mt-1">
                Monitoreo general de destinos turísticos, eventos e itinerarios oficiales.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/itinerary"
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                <PlusCircle className="w-4 h-4" />
                Crear Itinerario Oficial
              </Link>
            </div>
          </header>

          {/* Tarjetas con datos reales de la BD */}
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatsCard title="Usuarios Registrados" value={adminStats?.totalUsers || 0} icon="👥" color="blue" />
            <StatsCard title="Destinos y Atractivos" value={adminStats?.totalPlaces || 0} icon="📍" color="green" />
            <StatsCard title="Itinerarios Publicados" value={adminStats?.totalItineraries || 0} icon="🗺️" color="purple" />
            <StatsCard title="Eventos Activos" value={adminStats?.totalEvents || 0} icon="🎉" color="red" />
          </section>

          {/* Widgets analíticos */}
          <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
            <ChartWidget />
            <RecentActivity />
          </section>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. DASHBOARD USUARIO TURISTA
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-12">
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        <header className="flex flex-col gap-4 rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-sky-950/20 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/30">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                Turista
              </span>
            </div>
            <h1 className="text-3xl font-black text-white">
              ¡Hola, {profile?.name || user?.email?.split('@')[0]}!
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {profile?.location ? `Explorando desde ${profile.location}` : 'Planifica tu próxima aventura por Tlaxcala.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2.5 text-sm font-semibold text-sky-200 transition hover:bg-sky-500/20"
            >
              <Compass className="w-4 h-4" />
              Explorar destinos
            </Link>
            <Link
              href="/itinerary"
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              <Map className="w-4 h-4" />
              Ver Itinerarios
            </Link>
          </div>
        </header>

        {/* Métricas de Turista */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard title="Itinerarios Guardados" value={userData?.favoriteItineraries?.length || 0} icon="🗺️" color="blue" />
          <StatsCard title="Lugares Favoritos" value={userData?.favoritePlaces?.length || 0} icon="⭐" color="purple" />
          <StatsCard title="Reseñas Escritas" value={userData?.userReviews?.length || 0} icon="✍️" color="green" />
          <StatsCard title="Municipios por Visitar" value={60} icon="📍" color="red" />
        </section>

        {/* Sección de Guardados y Rutas */}
        <section className="grid gap-6 xl:grid-cols-2">
          {/* Itinerarios Favoritos */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Map className="w-4 h-4 text-sky-400" />
                Mis Itinerarios Favoritos
              </h2>
              <Link href="/itinerary" className="text-xs font-medium text-sky-400 hover:text-sky-300">
                Ver todos
              </Link>
            </div>

            {userData?.favoriteItineraries?.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">
                Aún no has guardado itinerarios. ¡Explora las rutas disponibles!
              </p>
            ) : (
              <div className="space-y-3">
                {userData?.favoriteItineraries?.slice(0, 3).map((it: any) => (
                  <div
                    key={it.id}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-950/60"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{it.title}</p>
                      <p className="text-[11px] text-slate-400">
                        {it.start_date} al {it.end_date}
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">
                      Guardado
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Lugares Favoritos */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                Lugares Turísticos Guardados
              </h2>
              <Link href="/favorites" className="text-xs font-medium text-sky-400 hover:text-sky-300">
                Ver todos
              </Link>
            </div>

            {userData?.favoritePlaces?.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">
                No tienes lugares turísticos guardados en favoritos.
              </p>
            ) : (
              <div className="space-y-3">
                {userData?.favoritePlaces?.slice(0, 3).map((place: any) => (
                  <div
                    key={place.id}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-950/60"
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-white">{place.name}</p>
                        <p className="text-[11px] text-slate-400">{place.category}</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {place.address || 'Tlaxcala'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}