import React from 'react';

export default function FavoritosCTA() {
  return (
    <section className="py-20 bg-emerald-950 text-white relative overflow-hidden">
      <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-emerald-800 rounded-full blur-3xl opacity-50" />
      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        <span className="text-3xl">❤️</span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4">¿Te gustó un destino? Guárdalo en tus Favoritos</h2>
        <p className="mt-4 text-emerald-200 text-lg max-w-xl mx-auto">
          Crea tu cuenta gratuita hoy para empezar a armar la colección con los lugares y rutas de tus sueños.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-white text-emerald-950 hover:bg-emerald-100 px-8 py-3.5 rounded-lg font-bold transition-all shadow-md">
            Crear mi Cuenta
          </button>
        </div>
      </div>
    </section>
  );
}