"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Menu,
  X,
  Compass,
  LogIn,
  User,
  LogOut,
  Heart,
  Map,
  Route,
  Home,
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/services/auth.service";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { user, loading } = useAuth();

  /*
   * ============================================================
   * RUTAS PRIVADAS
   * ============================================================
   */

  const isPrivateRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/explore") ||
    pathname.startsWith("/favorites") ||
    pathname.startsWith("/itinerary") ||
    pathname.startsWith("/profile");

  /*
   * Solo mostramos la navegación privada cuando:
   *
   * 1. La ruta pertenece al área privada
   * 2. Existe un usuario autenticado
   */

  const isDashboard = isPrivateRoute && !!user;

  /*
   * ============================================================
   * SCROLL DE LA LANDING
   * ============================================================
   */

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();

    setIsOpen(false);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  /*
   * ============================================================
   * CERRAR SESIÓN
   * ============================================================
   */

  const handleLogout = async () => {
    setIsOpen(false);

    const { error } = await signOut();

    if (error) {
      console.error("Error al cerrar sesión:", error);
      return;
    }

    router.push("/");
    router.refresh();
  };

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <header className="w-full">
      <div className="flex items-center justify-between px-6 py-4">

        {/* ================================================== */}
        {/* LOGO */}
        {/* ================================================== */}

        <div className="flex items-center gap-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-xl font-black text-white tracking-wider flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Compass className="w-5 h-5" />
            </div>

            Tlaxgo

            <span className="text-sky-400 font-light text-xs bg-sky-950 border border-sky-900 px-2.5 py-0.5 rounded-full">
              60 Municipios
            </span>
          </Link>
        </div>

        {/* ================================================== */}
        {/* NAVEGACIÓN DESKTOP */}
        {/* ================================================== */}

        {!isDashboard ? (
          /*
           * ================================================
           * LANDING PAGE
           * ================================================
           */

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">

            <a
              href="#hero"
              onClick={(e) => handleScrollTo(e, "hero")}
              className="hover:text-sky-400 transition cursor-pointer"
            >
              Inicio
            </a>

            <a
              href="#destinos"
              onClick={(e) => handleScrollTo(e, "destinos")}
              className="hover:text-sky-400 transition cursor-pointer"
            >
              Destinos
            </a>

            <a
              href="#municipios"
              onClick={(e) => handleScrollTo(e, "municipios")}
              className="text-sky-400 font-semibold hover:text-sky-300 transition cursor-pointer"
            >
              Municipios
            </a>

            <a
              href="#rutas"
              onClick={(e) => handleScrollTo(e, "rutas")}
              className="hover:text-sky-400 transition cursor-pointer"
            >
              Rutas
            </a>

          </nav>
        ) : (
          /*
           * ================================================
           * DASHBOARD
           * ================================================
           */

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">

            <Link
              href="/dashboard"
              className="flex items-center gap-2 hover:text-sky-400 transition"
            >
              <Home className="w-4 h-4" />
              Inicio
            </Link>

            <Link
              href="/explore"
              className="flex items-center gap-2 hover:text-sky-400 transition"
            >
              <Map className="w-4 h-4" />
              Explorar
            </Link>

            <Link
              href="/favorites"
              className="flex items-center gap-2 hover:text-sky-400 transition"
            >
              <Heart className="w-4 h-4" />
              Favoritos
            </Link>

            <Link
              href="/itinerary"
              className="flex items-center gap-2 hover:text-sky-400 transition"
            >
              <Route className="w-4 h-4" />
              Itinerario
            </Link>

          </nav>
        )}

        {/* ================================================== */}
        {/* ACCIONES DESKTOP */}
        {/* ================================================== */}

        <div className="hidden md:flex items-center gap-3">

          {/* ============================================== */}
          {/* USUARIO NO AUTENTICADO */}
          {/* ============================================== */}

          {!loading && !user && (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white transition"
              >
                <LogIn className="w-4 h-4" />
                Iniciar sesión
              </Link>

              <Link
                href="/register"
                className="bg-sky-500 hover:bg-sky-400 text-white font-semibold px-5 py-2.5 rounded-full text-xs transition shadow-lg shadow-sky-500/20"
              >
                CREAR CUENTA
              </Link>
            </>
          )}

          {/* ============================================== */}
          {/* USUARIO AUTENTICADO */}
          {/* ============================================== */}

          {!loading && user && (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition"
              >
                <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
                  <User className="w-4 h-4 text-sky-400" />
                </div>

                <span className="max-w-[150px] text-sm truncate">
                  {user.user_metadata?.full_name || user.email}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </>
          )}

        </div>

        {/* ================================================== */}
        {/* BOTÓN MENÚ MÓVIL */}
        {/* ================================================== */}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

      </div>

      {/* ==================================================== */}
      {/* MENÚ MÓVIL */}
      {/* ==================================================== */}

      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-4 shadow-2xl">

          {/* ================================================= */}
          {/* NAVEGACIÓN PÚBLICA */}
          {/* ================================================= */}

          {!isDashboard ? (
            <>
              <a
                href="#hero"
                onClick={(e) => handleScrollTo(e, "hero")}
                className="block text-slate-300 hover:text-sky-400 text-sm font-medium cursor-pointer"
              >
                Inicio
              </a>

              <a
                href="#destinos"
                onClick={(e) => handleScrollTo(e, "destinos")}
                className="block text-slate-300 hover:text-sky-400 text-sm font-medium cursor-pointer"
              >
                Destinos
              </a>

              <a
                href="#municipios"
                onClick={(e) => handleScrollTo(e, "municipios")}
                className="block text-sky-400 font-semibold text-sm cursor-pointer"
              >
                Municipios
              </a>

              <a
                href="#rutas"
                onClick={(e) => handleScrollTo(e, "rutas")}
                className="block text-slate-300 hover:text-sky-400 text-sm font-medium cursor-pointer"
              >
                Rutas
              </a>
            </>
          ) : (
            /*
             * ================================================
             * NAVEGACIÓN PRIVADA
             * ================================================
             */

            <>
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-slate-300 hover:text-sky-400"
              >
                <Home className="w-4 h-4" />
                Inicio
              </Link>

              <Link
                href="/explore"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-slate-300 hover:text-sky-400"
              >
                <Map className="w-4 h-4" />
                Explorar
              </Link>

              <Link
                href="/favorites"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-slate-300 hover:text-sky-400"
              >
                <Heart className="w-4 h-4" />
                Favoritos
              </Link>

              <Link
                href="/itinerary"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-slate-300 hover:text-sky-400"
              >
                <Route className="w-4 h-4" />
                Itinerario
              </Link>

              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-slate-300 hover:text-sky-400"
              >
                <User className="w-4 h-4" />
                Mi perfil
              </Link>
            </>
          )}

          {/* ================================================= */}
          {/* ACCIONES MÓVILES */}
          {/* ================================================= */}

          <div className="pt-4 border-t border-slate-800">

            {/* ============================================= */}
            {/* NO AUTENTICADO */}
            {/* ============================================= */}

            {!loading && !user && (
              <div className="space-y-3">

                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-slate-300 hover:text-white"
                >
                  <LogIn className="w-4 h-4" />
                  Iniciar sesión
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-sky-500 hover:bg-sky-400 text-white font-semibold px-5 py-2.5 rounded-full text-xs"
                >
                  CREAR CUENTA
                </Link>

              </div>
            )}

            {/* ============================================= */}
            {/* AUTENTICADO */}
            {/* ============================================= */}

            {!loading && user && (
              <div className="space-y-3">

                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-slate-300 hover:text-white"
                >
                  <User className="w-4 h-4" />
                  <span className="truncate">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-400 hover:text-red-300"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>

              </div>
            )}

          </div>

        </div>
      )}
    </header>
  );
}