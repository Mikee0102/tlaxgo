'use client';
import React from 'react';

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const featuresData: Feature[] = [
  {
    id: 1,
    icon: '🗺️',
    title: 'Mapas Interactivos y GPS',
    description: 'Ubica en tiempo real los 60 municipios de Tlaxcala con rutas optimizadas para llegar sin contratiempos a cada destino.',
  },
  {
    id: 2,
    icon: '🌟',
    title: 'Experiencias Personalizadas',
    description: 'Filtra atracciones según tus intereses: ecoturismo, historia, tradiciones, gastronomía o aventura extrema.',
  },
  {
    id: 3,
    icon: '📅',
    title: 'Agenda Cultural Actualizada',
    description: 'No te pierdas ninguna festividad, feria patronal, noche de luciérnagas o eventos estacionales en todo el estado.',
  },
  {
    id: 4,
    icon: '🏨',
    title: 'Directorio Local Verificado',
    description: 'Encuentra fácilmente los mejores hoteles, cabañas, restaurantes tradicionales y guías turísticos certificados.',
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-slate-900 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sky-400 font-semibold tracking-widest text-xs uppercase block mb-3">
            Tecnología y Turismo
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            ¿Por qué viajar con <span className="text-sky-400">Tlaxgo</span>?
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Hemos desarrollado herramientas digitales pensadas para facilitarte la planeación y hacer de tu visita una experiencia inolvidable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((item) => (
            <div 
              key={item.id}
              className="bg-slate-950 p-8 rounded-3xl border border-slate-800 hover:border-sky-500/50 transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}