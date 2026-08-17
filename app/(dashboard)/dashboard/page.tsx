'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import StatsCard from '@/components/dashborad/statscard';
import ChartWidget from '@/components/dashborad/chartwidget';
import RecentActivity from '@/components/dashborad/recentactivity';
import { ShieldCheck, Sparkles, MapPin, Calendar, PlusCircle, Compass } from 'lucide-react';

const userItineraries = [
  {
    name: 'Ruta de los pueblos mágicos',
    days: '3 días',
    status: 'En progreso',
    accent: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
  },
  {
    name: 'Cultura y gastronomía',
    days: '2 días',
    status: 'Programado',
    accent: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
  },
  {
    name: 'Aventura en la montaña',
    days: '1 día',
    status: 'Completado',
    accent: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  },
];

const userFavorites = [
  'Catedral de Tlaxcala',
  'Parque Nacional de la Malinche',
  'Mercado de la ciudad',
  'Museo de Arte',
];

export default function DashboardPage() {
  const { user, profile, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-slate-400">
        <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm font-medium">Cargando panel de Tlaxgo...</p>
      </div>
    );
  }

  // =========================================================================
  // 1. VISTA DE ADMINISTRADOR
  // =========================================================================
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        {/* Glow de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-[-8rem] top-[-5rem] h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute right-[-5rem] top-1/3 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
          {/* Header Admin */}
          <header className="flex flex-col gap-4 rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  Panel de Administración
                </span>
              </div>
              <h1 className="mt-2 text-3xl font-black text-white">
                Gestión Central Tlaxgo
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Monitoreo de actividad de usuarios, métricas de destinos y eventos turísticos.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/admin/places/new"
                className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2.5 text-sm font-semibold text-sky-200 transition hover:bg-sky-500/20"
              >
                <PlusCircle className="w-4 h-4" />
                Nuevo Atractivo
              </Link>
              <Link
                href="/admin/events/new"
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                <Calendar className="w-4 h-4" />
                Publicar Evento
              </Link>
            </div>
          </header>

          {/* Estadísticas Globales Admin */}
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatsCard title="Usuarios Registrados" value={128} icon="👥" color="blue" />
            <StatsCard title="Destinos Activos" value={60} icon="📍" color="green" />
            <StatsCard title="Itinerarios Creados" value={342} icon="🗺️" color="purple" />
            <StatsCard title="Eventos Activos" value={14} icon="🎉" color="red" />
          </section>

          {/* Gráficas y Métricas */}
          <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
            <ChartWidget />
            <RecentActivity />
          </section>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. VISTA DE USUARIO TURISTA
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Glow de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[-8rem] top-[-5rem] h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute right-[-5rem] top-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Header Turista */}
        <header className="flex flex-col gap-4 rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-sky-950/20 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/30">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                Turista
              </span>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Dashboard</p>
            </div>
            <h1 className="mt-2 text-3xl font-black text-white">
              ¡Hola, {profile?.name || user?.email?.split('@')[0]}!
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Descubre nuevas rutas y planifica tu visita por los 60 municipios.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2.5 text-sm font-semibold text-sky-200 transition hover:bg-sky-500/20"
            >
              <Compass className="w-4 h-4" />
              Explorar rutas
            </Link>
            <Link
              href="/itinerary"
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              <PlusCircle className="w-4 h-4" />
              Nuevo itinerario
            </Link>
          </div>
        </header>

        {/* Tarjetas de estadísticas de usuario */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard title="Itinerarios" value={userItineraries.length} icon="🗺️" color="blue" />
          <StatsCard title="Favoritos" value={userFavorites.length} icon="⭐" color="purple" />
          <StatsCard title="Municipios Visitados" value={12} icon="📍" color="green" />
          <StatsCard title="Eventos Guardados" value={3} icon="🎫" color="red" />
        </section>

        {/* Gráfica y Lugares Favoritos */}
        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <ChartWidget />

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Lugares favoritos</h2>
                <Link href="/favorites" className="text-xs font-medium text-sky-400 hover:text-sky-300">
                  Ver todos
                </Link>
              </div>
              <ul className="space-y-3">
                {userFavorites.map((place) => (
                  <li
                    key={place}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3"
                  >
                    <div className="flex items-center gap-2 text-sm text-slate-200">
                      <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>{place}</span>
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-400">
                      Guardado
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Mis Itinerarios y Actividad */}
        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Mis itinerarios</h2>
              <Link href="/itinerary" className="text-sm font-medium text-sky-400 hover:text-sky-300">
                Ver todos
              </Link>
            </div>

            <div className="space-y-4">
              {userItineraries.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 hover:border-slate-700 transition"
                >
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="mt-1 text-xs text-slate-400">Duración: {item.days}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${item.accent}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <RecentActivity />
        </section>
      </div>
    </div>
  );
}