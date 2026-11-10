'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Menu, 
  X, 
  Compass, 
  UserCircle2, 
  LogOut, 
  ShieldCheck, 
  LayoutDashboard,
  Sparkles
} from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const router = useRouter();
  const { user, profile, isAdmin, loading, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = !loading && !!user;

  const handleLogout = async () => {
    try {
      setIsOpen(false);
      await logout();
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xl font-black text-white tracking-wider flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Compass className="w-5 h-5" />
            </div>
            Tlaxgo <span className="text-sky-400 font-light text-xs bg-sky-950 border border-sky-900 px-2.5 py-0.5 rounded-full hidden sm:inline-block">60 Municipios</span>
          </Link>
        </div>

        {/* NAVEGACIÓN PÚBLICA / GENERAL */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-sky-400 transition cursor-pointer">Inicio</Link>
          <Link href="/explore" className="hover:text-sky-400 transition cursor-pointer">Explore</Link>
          <Link href="/itinerary" className="hover:text-sky-400 transition cursor-pointer">Itinerarios</Link>
        </nav>

        {/* CONTROLES DE USUARIO / ACCIONES (DESKTOP) */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2.5">
              {/* BADGE DE ROL */}
              {isAdmin ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  Admin
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  Turista
                </span>
              )}

              {/* ACCESO AL DASHBOARD */}
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3.5 py-2 text-sm font-medium text-slate-200 transition hover:border-sky-500/40 hover:text-sky-300"
              >
                <LayoutDashboard className="h-4 w-4" />
                Panel
              </Link>

              {/* PERFIL */}
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3.5 py-2 text-sm font-medium text-slate-200 transition hover:border-sky-500/40 hover:text-sky-300"
                title={profile?.name || user?.email || 'Mi Perfil'}
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Avatar"
                    className="h-5 w-5 rounded-full object-cover"
                  />
                ) : (
                  <UserCircle2 className="h-4 w-4" />
                )}
                <span className="max-w-[100px] truncate">
                  {profile?.name?.split(' ')[0] || 'Perfil'}
                </span>
              </Link>

              {/* BOTÓN CERRAR SESIÓN */}
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-red-950/40 hover:text-red-300 hover:border-red-800/40"
                title="Cerrar sesión"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : !loading ? (
            <Link
              href="/auth/login"
              className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-6 py-2.5 rounded-full text-xs transition shadow-lg shadow-sky-500/20 inline-block cursor-pointer"
            >
              Login
            </Link>
          ) : null}
        </div>

        {/* BOTÓN MENÚ MÓVIL */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2"
          aria-label="Menú"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MENÚ DESPLEGABLE (MÓVIL) */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-4 shadow-2xl">
          {isAuthenticated && (
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Avatar"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <UserCircle2 className="h-6 w-6 text-slate-400" />
                )}
                <span className="text-sm font-medium text-white">
                  {profile?.name || user?.email}
                </span>
              </div>

              {isAdmin ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  <ShieldCheck className="w-3 h-3 text-amber-400" /> Admin
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/30">
                  <Sparkles className="w-3 h-3 text-sky-400" /> Turista
                </span>
              )}
            </div>
          )}

          <Link href="/" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-sky-400 text-sm font-medium">Inicio</Link>
          <Link href="/explore" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-sky-400 text-sm font-medium">Explore</Link>
          <Link href="/itinerary" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-sky-400 text-sm font-medium">Itinerarios</Link>

          {isAuthenticated ? (
            <div className="pt-2 space-y-3 border-t border-slate-800">
              <Link 
                href="/dashboard" 
                onClick={() => setIsOpen(false)} 
                className="flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm font-semibold"
              >
                <LayoutDashboard className="h-4 w-4" />
                {isAdmin ? 'Panel de Administración' : 'Mi Panel de Turista'}
              </Link>
              
              <Link 
                href="/profile" 
                onClick={() => setIsOpen(false)} 
                className="flex items-center gap-2 text-slate-300 hover:text-sky-400 text-sm font-medium"
              >
                <UserCircle2 className="h-4 w-4" />
                Mi Perfil
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left text-red-400 hover:text-red-300 text-sm font-medium pt-2"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </div>
          ) : !loading ? (
            <Link 
              href="/auth/login" 
              onClick={() => setIsOpen(false)} 
              className="block text-center bg-sky-500 text-slate-950 font-bold py-2 rounded-xl text-sm"
            >
              Iniciar sesión
            </Link>
          ) : null}
        </div>
      )}
    </header>
  );
}