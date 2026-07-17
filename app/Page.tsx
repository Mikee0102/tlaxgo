import React from 'react';
import Hero from '@/components/marketing/Hero';
import Features from '@/components/marketing/Features';
import Lugares from '@/components/marketing/Lugares';
import Rutas from '@/components/marketing/Rutas';
import FavoritosCTA from '@/components/marketing/FavoritosCTA';

export default function MarketingLandingPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      
      {/* Hero e Imagen Principal */}
      <Hero />

      {/* Características */}
      <Features />

      {/* Lugares */}
      <Lugares />

      {/* Rutas */}
      <Rutas />

      {/* Favoritos */}
      <FavoritosCTA />

    </div>
  );
}
