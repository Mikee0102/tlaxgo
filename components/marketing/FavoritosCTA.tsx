'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function FavoritosCTA() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading) return;
    if (user) return router.push('/itinerary');
    return router.push('/login');
  };

  return (
    <section className="py-24 bg-slate-900 text-slate-100 border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center bg-slate-950 py-16 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        
        <div className="absolute inset-0 bg-linear-to-r from-sky-500/5 via-transparent to-sky-500/5 pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-sky-400 font-semibold tracking-widest text-xs uppercase block mb-3">
            Empieza a Viajar
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            ¿Listo para planear tu viaje por los <span className="text-sky-400">60 municipios</span>?
          </h2>
          <p className="text-slate-300 text-base md:text-lg mb-6 leading-relaxed">
            Guarda tus lugares favoritos por temporada y arma un itinerario personalizado para tu próxima visita de forma rápida y sencilla.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div>
              <h4 className="text-sm text-sky-300 font-semibold">Guardar favoritos</h4>
              <p className="text-slate-400 text-sm">Marca sitios por temporada y recupéralos cuando planifiques.</p>
            </div>
            <div>
              <h4 className="text-sm text-sky-300 font-semibold">Crear itinerarios</h4>
              <p className="text-slate-400 text-sm">Organiza rutas diarias y tiempos estimados para cada parada.</p>
            </div>
            <div>
              <h4 className="text-sm text-sky-300 font-semibold">Compartir y colaborar</h4>
              <p className="text-slate-400 text-sm">Comparte tu plan con amigos o guarda versiones para futuras visitas.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}