"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type CategoriaKey = 'todos' | 'naturaleza' | 'cultura' | 'aventura';

interface Destino {
  id: number;
  nombre: string;
  categoria: CategoriaKey;
  region: string;
  descripcion: string;
  imagen: string;
}

const destinosData: Destino[] = [
  {
    id: 1,
    nombre: 'Santuario de las Luciérnagas',
    categoria: 'naturaleza',
    region: 'Nanacamilpa',
    descripcion: 'Un espectáculo natural único donde los bosques de coníferas se iluminan por miles de luciérnagas durante el verano.',
    imagen: '/luciernagas.jpg',
  },
  {
    id: 2,
    nombre: 'Huamantla y su Tradición',
    categoria: 'cultura',
    region: 'Huamantla',
    descripcion: 'Pueblo Mágico reconocido por sus hermosos alfombrados de aserrín y la tradicional noche que nadie duerme.',
    imagen: '/huamantla.jpg',
  },
  {
    id: 3,
    nombre: 'Haciendas Pulqueras de Tlaxco',
    categoria: 'aventura',
    region: 'Tlaxco',
    descripcion: 'Recorridos históricos entre arquitectura colonial, degustación de pulque artesanal y paisajes boscosos de altura.',
    imagen: '/tlaxco.jpg',
  },
  {
    id: 4,
    nombre: 'Zona Arqueológica Cacaxtla',
    categoria: 'cultura',
    region: 'Nativitas',
    descripcion: 'Impresionantes murales prehispánicos de colores originales que narran la historia militar y mitológica de la región.',
    imagen: '/cacaxtla.jpg',
  },
  {
    id: 5,
    nombre: 'La Malinche (Matlalcueye)',
    categoria: 'naturaleza',
    region: 'Centro / Huamantla',
    descripcion: 'Parque Nacional ideal para el ecoturismo, senderismo de montaña y campamentos rodeados de bosques.',
    imagen: '/malinche.jpg',
  },
  {
    id: 6,
    nombre: 'Ixtenco y el Maíz Nativo',
    categoria: 'cultura',
    region: 'Ixtenco',
    descripcion: 'Último bastión de la cultura Otomí, famoso por sus cuadros elaborados con semillas y granos ancestrales.',
    imagen: '/ixtenco.jpg',
  },
];

const categorias: { key: CategoriaKey; label: string }[] = [
  { key: 'todos', label: '✨ Todos los Lugares' },
  { key: 'naturaleza', label: '🌲 Naturaleza' },
  { key: 'cultura', label: '🏛️ Cultura & Tradición' },
  { key: 'aventura', label: '⛰️ Aventura' },
];

export default function Lugares() {
  const [filtro, setFiltro] = useState<CategoriaKey>('todos');
  const router = useRouter();

  const handleNavigate = (event: React.MouseEvent, _path: string) => {
    event.preventDefault();
    router.push('/login');
  };

  const destinosFiltrados = filtro === 'todos' 
    ? destinosData 
    : destinosData.filter((d) => d.categoria === filtro);

  return (
    <section id="destinos" className="py-24 bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-sky-400 font-semibold tracking-widest text-xs uppercase block mb-3">
              Descubre el Corazón de México
            </span>
            <h2
              onClick={() => router.push('/login')}
              role="button"
              aria-label="Ir a iniciar sesión"
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-white cursor-pointer"
            >
              Destinos Imperdibles de <span className="text-sky-400">Tlaxcala</span>
            </h2>
          </div>
          <p className="text-slate-300 max-w-md text-sm md:text-base leading-relaxed">
            Sumérgete en la magia de nuestros municipios. Experiencias diseñadas para conectar con la historia, el arte y los paisajes naturales.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-12 border-b border-slate-800 pb-6">
          {categorias.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFiltro(cat.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                filtro === cat.key
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-lg shadow-sky-500/20'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinosFiltrados.map((item) => (
            <div 
              key={item.id}
              className="group relative bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 hover:border-sky-500/50 transition-all duration-500 flex flex-col"
            >
              <div className="relative h-72 w-full overflow-hidden bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={item.imagen} 
                  alt={item.nombre} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-sky-400 border border-slate-700/50 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {item.region}
                </span>
              </div>

              <div className="p-8 flex flex-col grow justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-sky-400 transition-colors mb-3">
                    {item.nombre}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.descripcion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}