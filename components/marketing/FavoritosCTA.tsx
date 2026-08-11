'use client';
import React from 'react';

export default function FavoritosCTA() {
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
          <p className="text-slate-300 text-base md:text-lg mb-8 leading-relaxed">
            Guarda tus lugares favoritos por temporada y arma un itinerario personalizado para tu próxima visita de forma rápida y sencilla.
          </p>
          <a
            href="/auth/register"
            className="inline-block bg-sky-500 text-slate-950 font-bold px-8 py-4 rounded-full shadow-lg shadow-sky-500/20 hover:bg-sky-400 transition-all duration-300 text-sm tracking-wider uppercase"
          >
            Comenzar Mi Itinerario
          </a>
        </div>

      </div>
    </section>
  );
}