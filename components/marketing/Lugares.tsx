import React from 'react';

interface Destino {
  id: number;
  nombre: string;
  ubicacion: string;
  imagen: string;
  descripcion: string;
}

const destinosDestacados: Destino[] = [
  {
    id: 1,
    nombre: "Cascadas Esmeralda",
    ubicacion: "Chiapas, México",
    imagen: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    descripcion: "Explora la majestuosidad de aguas turquesas rodeadas de selva tropical profunda."
  },
  {
    id: 2,
    nombre: "Valle de las Luces",
    ubicacion: "Tlaxcala, México",
    imagen: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    descripcion: "Un místico santuario natural donde la fauna y los senderos nocturnos cobran vida."
  },
  {
    id: 3,
    nombre: "Ruinas del Viento",
    ubicacion: "Yucatán, México",
    imagen: "https://images.unsplash.com/photo-1518638150341-f81217277c04?auto=format&fit=crop&w=600&q=80",
    descripcion: "Camina por senderos ancestrales y descubre la historia de las civilizaciones milenarias."
  }
];

export default function Lugares() {
  return (
    <section id="lugares" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-950 tracking-tight">Destinos Recomendados</h2>
            <p className="text-slate-600 mt-2">Los rincones mejor calificados por nuestra comunidad de viajeros.</p>
          </div>
          <button className="mt-4 md:mt-0 text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-2 transition-all">
            Ver todos los lugares <span>&rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinosDestacados.map((destino) => (
            <div key={destino.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={destino.imagen} 
                  alt={destino.nombre} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350"
                />
                <span className="absolute top-4 left-4 bg-slate-950/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {destino.ubicacion}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-950 mb-2">{destino.nombre}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{destino.descripcion}</p>
                <button className="w-full py-2.5 bg-slate-100 hover:bg-emerald-500 hover:text-slate-950 text-slate-700 font-semibold rounded-lg text-sm transition-all">
                  Explorar Lugar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}