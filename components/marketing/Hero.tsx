'use client';
import React from 'react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center bg-slate-950 text-slate-100 overflow-hidden pt-16 pb-16">
      {/* Imagen local cargada desde la carpeta public */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/hero.jpg" 
          alt="Paisaje panorámico de Tlaxcala" 
          className="w-full h-full object-cover opacity-35 scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/60 via-slate-950/80 to-slate-950"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <span className="inline-block py-1.5 px-5 rounded-full bg-slate-900/90 text-sky-400 text-xs font-bold uppercase tracking-widest mb-6 border border-slate-800 shadow-lg backdrop-blur-md">
          ✨ Descubre la riqueza de Tlaxcala
        </span>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
          Tu guía inteligente para explorar <span className="text-sky-400">Tlaxcala</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Planifica rutas interactivas, descubre los 60 municipios, tradiciones centenarias y vive una experiencia turística única con Tlaxgo.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#destinos"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-sky-500 text-slate-950 font-bold text-sm tracking-wider uppercase shadow-lg shadow-sky-500/20 hover:bg-sky-400 transition-all duration-300"
          >
            Explorar Destinos
          </a>
          <a
            href="/auth/register"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-200 font-bold text-sm tracking-wider uppercase border border-slate-800 hover:bg-slate-800 hover:text-white transition-all duration-300"
          >
            Crear mi Cuenta
          </a>
        </div>
      </div>
    </section>
  );
}