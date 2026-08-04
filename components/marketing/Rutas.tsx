'use client';
import React from 'react';

interface Ruta {
  id: number;
  titulo: string;
  duracion: string;
  paradas: string;
  descripcion: string;
  imagen: string;
}

const rutasData: Ruta[] = [
  {
    id: 1,
    titulo: 'Ruta del Pulque y las Haciendas',
    duracion: '2 Días / 1 Noche',
    paradas: 'Tlaxco • Nanacamilpa • Calpulalpan',
    descripcion: 'Un recorrido por la historia pulquera del estado, visitando cascos de haciendas centenarias, degustando gastronomía local y conociendo el proceso artesanal del tlachique.',
    imagen: '/tlaxco.jpg', // Usando tu imagen local guardada en public/
  },
  {
    id: 2,
    titulo: 'Ruta de la Fe y el Arte Tlaxcalteca',
    duracion: '1 Día',
    paradas: 'Ocotlán • Tlaxcala Centro • Tepeyanco',
    descripcion: 'Descubre la joya arquitectónica del barroco novohispano, santuarios llenos de historia, retablos bañados en oro y los tradicionales mercados artesanales.',
    imagen: '/huamantla.jpg', // Usando tu imagen local guardada en public/
  },
  {
    id: 3,
    titulo: 'Ruta de los Volcanes y Ecoturismo',
    duracion: '3 Días / 2 Noches',
    paradas: 'La Malinche • Huamantla • Ixtenco',
    descripcion: 'Aventura total entre bosques de alta montaña, campamentos ecoturísticos bajo las estrellas y ascensos guiados por las faldas de la Malinche.',
    imagen: '/malinche.jpg', // Usando tu imagen local guardada en public/
  },
];

export default function Rutas() {
  return (
    <section id="rutas" className="py-24 bg-slate-950 text-slate-100 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sky-400 font-semibold tracking-widest text-xs uppercase block mb-3">
            Itinerarios Sugeridos
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Rutas Turísticas <span className="text-sky-400">Diseñadas para Ti</span>
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Aprovecha al máximo tu estancia recorriendo circuitos temáticos optimizados para conectar los mejores atractivos del estado.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {rutasData.map((ruta) => (
            <div 
              key={ruta.id}
              className="group bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-sky-500/50 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 w-full overflow-hidden bg-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={ruta.imagen} 
                    alt={ruta.titulo} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-85"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
                  <span className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md text-sky-400 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    {ruta.duracion}
                  </span>
                </div>

                <div className="p-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-sky-400 block mb-2">
                    {ruta.paradas}
                  </span>
                  <h3 className="text-2xl font-bold text-white group-hover:text-sky-400 transition-colors mb-4">
                    {ruta.titulo}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {ruta.descripcion}
                  </p>
                </div>
              </div>

              <div className="px-8 pb-8 pt-0">
                <a 
                  href={`/rutas/${ruta.id}`}
                  className="w-full py-3.5 px-6 rounded-2xl bg-slate-950 text-slate-200 border border-slate-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-sky-500 hover:text-slate-950 hover:border-sky-500 transition-all duration-300"
                >
                  Ver Itinerario Completo
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}