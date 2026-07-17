import React from 'react';

interface Ruta {
  id: number;
  nombre: string;
  duracion: string;
  dificultad: 'Fácil' | 'Moderada' | 'Desafiante';
  descripcion: string;
}

const rutasSugeridas: Ruta[] = [
  {
    id: 1,
    nombre: "Sendero de la Selva Alta",
    duracion: "3 días",
    dificultad: "Moderada",
    descripcion: "Aventura de senderismo cruzando puentes colgantes y campamentos bajo las estrellas."
  },
  {
    id: 2,
    nombre: "Circuito de los Volcanes",
    duracion: "1 día",
    dificultad: "Desafiante",
    descripcion: "Ascenso guiado para observar amaneceres únicos desde las cumbres más altas."
  }
];

export default function Rutas() {
  return (
    <section id="rutas" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl font-bold text-slate-950 tracking-tight">Rutas Aventureras</h2>
          <p className="text-slate-600 mt-2">Sigue caminos prediseñados y vive la experiencia como un local.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rutasSugeridas.map((ruta) => (
            <div key={ruta.id} className="p-8 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                    Duración: {ruta.duracion}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                    ruta.dificultad === 'Fácil' ? 'bg-blue-50 text-blue-600' :
                    ruta.dificultad === 'Moderada' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                  }`}>
                    Dificultad: {ruta.dificultad}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-950 mb-2">{ruta.nombre}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{ruta.descripcion}</p>
              </div>
              <button className="text-left font-bold text-slate-950 hover:text-emerald-600 flex items-center gap-2 transition-all">
                Ver mapa de ruta <span>&rarr;</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}