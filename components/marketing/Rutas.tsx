"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface Ruta {
  id: number;
  titulo: string;
  duracion: string;
  paradas: string;
  descripcion: string;
  imagen: string;
  actividades?: Array<{ time?: string; title: string; info?: string }>;
}

const rutasData: Ruta[] = [
  {
    id: 1,
    titulo: 'Ruta del Pulque y las Haciendas',
    duracion: '2 Días / 1 Noche',
    paradas: 'Tlaxco • Nanacamilpa • Calpulalpan',
    descripcion: 'Un recorrido por la historia pulquera del estado, visitando cascos de haciendas centenarias, degustando gastronomía local y conociendo el proceso artesanal del tlachique.',
    imagen: '/tlaxco.jpg', // Usando tu imagen local guardada en public/
    actividades: [
      { time: '09:00', title: 'Visita a Hacienda El Molino', info: 'Recorrido guiado por la hacienda y degustación.' },
      { time: '12:30', title: 'Comida regional', info: 'Platillos tradicionales y maridaje con pulque.' },
      { time: '16:00', title: 'Taller de tlachique', info: 'Demostración del proceso artesanal.' },
    ],
  },
  {
    id: 2,
    titulo: 'Ruta de la Fe y el Arte Tlaxcalteca',
    duracion: '1 Día',
    paradas: 'Ocotlán • Tlaxcala Centro • Tepeyanco',
    descripcion: 'Descubre la joya arquitectónica del barroco novohispano, santuarios llenos de historia, retablos bañados en oro y los tradicionales mercados artesanales.',
    imagen: '/huamantla.jpg', // Usando tu imagen local guardada en public/
    actividades: [
      { time: '10:00', title: 'Visita a la Parroquia', info: 'Recorrido por obras barrocas y retablos.' },
      { time: '12:00', title: 'Museo local', info: 'Exhibiciones de arte y tradiciones.' },
      { time: '15:00', title: 'Mercado artesanal', info: 'Compra de artesanías y textiles.' },
    ],
  },
  {
    id: 3,
    titulo: 'Ruta de los Volcanes y Ecoturismo',
    duracion: '3 Días / 2 Noches',
    paradas: 'La Malinche • Huamantla • Ixtenco',
    descripcion: 'Aventura total entre bosques de alta montaña, campamentos ecoturísticos bajo las estrellas y ascensos guiados por las faldas de la Malinche.',
    imagen: '/malinche.jpg', // Usando tu imagen local guardada en public/
    actividades: [
      { time: '07:00', title: 'Ascenso guiado', info: 'Ruta de senderismo con guía local.' },
      { time: '13:00', title: 'Picnic en mirador', info: 'Parada para comer con vistas panorámicas.' },
      { time: '20:00', title: 'Campamento nocturno', info: 'Noche bajo las estrellas con fogata.' },
    ],
  },
];

function FavoriteButtonOverlay({ ruta }: { ruta: Ruta }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('tlaxgo_favorites') || '[]');
      const favId = `ruta:${ruta.id}`;
      setIsFavorite(saved.some((f: any) => f.id === favId));
    } catch (e) {
      setIsFavorite(false);
    }
  }, [ruta.id]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const key = 'tlaxgo_favorites';
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    const favId = `ruta:${ruta.id}`;

    let updated;
    if (isFavorite) {
      updated = saved.filter((f: any) => f.id !== favId);
      setIsFavorite(false);
    } else {
      const item = { id: favId, type: 'ruta', titulo: ruta.titulo, imagen: ruta.imagen };
      updated = [...saved, item];
      setIsFavorite(true);
    }

    localStorage.setItem(key, JSON.stringify(updated));
  };

  return (
    <button
      onClick={toggle}
      aria-label={isFavorite ? 'Quitar favorito' : 'Agregar favorito'}
      className={`absolute top-4 left-4 p-1.5 rounded-full backdrop-blur-md border transition ${
        isFavorite
          ? 'bg-rose-500/20 border-rose-500/40 text-rose-500'
          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:text-white'
      }`}
    >
      <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
    </button>
  );
}

export default function Rutas() {
  const router = useRouter();

  const handleNavigate = (event: React.MouseEvent, _path: string) => {
    event.preventDefault();
    router.push('/login');
  };

  return (
    <section id="rutas" className="py-24 bg-slate-950 text-slate-100 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sky-400 font-semibold tracking-widest text-xs uppercase block mb-3">
            Itinerarios Sugeridos
          </span>
          <h2
            onClick={() => router.push('/login')}
            role="button"
            aria-label="Ir a iniciar sesión"
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 cursor-pointer"
          >
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
                  <FavoriteButtonOverlay ruta={ruta} />
                </div>

                <div className="p-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-sky-400 block mb-2">
                    {ruta.paradas}
                  </span>
                  <h3 className="text-2xl font-bold text-white group-hover:text-sky-400 transition-colors mb-4">
                    {ruta.titulo}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {ruta.descripcion}
                  </p>

                  {ruta.actividades && ruta.actividades.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm text-sky-300 font-semibold mb-2">Actividades destacadas</h4>
                      <ul className="space-y-2 text-slate-300 text-sm">
                        {ruta.actividades.map((act, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="inline-flex items-center justify-center rounded-full bg-slate-800 w-8 h-8 text-sky-400 font-bold text-xs">{act.time ?? '—'}</span>
                            <div className="min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <strong className="text-white text-sm truncate">{act.title}</strong>
                              </div>
                              {act.info && <p className="text-slate-400 text-xs mt-1">{act.info}</p>}
                            </div>
                          </li>
                        ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}