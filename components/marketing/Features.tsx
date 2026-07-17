import React from 'react';

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Viaja de manera inteligente e independiente</h2>
          <p className="text-slate-600 mt-4 text-lg">Te ofrecemos las herramientas necesarias para que tu única preocupación sea disfrutar del camino.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center text-xl font-bold mb-6">📍</div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">Guías de Lugares</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Información detallada, horarios ideales, costos y recomendaciones locales de cada punto de interés.</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center text-xl font-bold mb-6">🗺️</div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">Rutas Trazadas</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Itinerarios optimizados por tiempo, dificultad y paradas estratégicas para aprovechar al máximo tu día.</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center text-xl font-bold mb-6">❤️</div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">Tus Favoritos</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Crea tu propia bitácora digital guardando destinos para planificar escapadas de fin de semana en segundos.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
