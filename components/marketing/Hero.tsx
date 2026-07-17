import React from 'react';

export default function Hero() {
  return (
    <header className="relative bg-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent z-10" />
      <img 
        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80" 
        alt="Paisaje de aventura y turismo" 
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
      />
      <div className="relative max-w-6xl mx-auto px-6 py-32 md:py-48 z-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full">
            Explora lo inexplorado
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-6 leading-tight">
            Tu próximo destino comienza <span className="text-emerald-400">aquí</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed">
            Descubre lugares mágicos, planifica rutas personalizadas por expertos locales y guarda tus rincones favoritos para tu próxima gran aventura.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#lugares" className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-8 py-3.5 rounded-lg font-bold shadow-lg shadow-emerald-950/20 transition-all">
              Explorar Destinos
            </a>
            <a href="#rutas" className="border border-slate-400 hover:bg-white/10 text-white px-8 py-3.5 rounded-lg font-semibold transition-all">
              Ver Rutas
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}