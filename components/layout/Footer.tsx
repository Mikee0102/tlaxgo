import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <span className="text-white text-lg font-bold">Tlaxcala Turística</span>
          <p className="text-sm mt-2 text-gray-400">
            Plataforma interactiva para conocer la riqueza de los 60 municipios clasificados por temporada.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Enlaces Rápidos</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#hero" className="hover:text-white transition">Inicio</a></li>
            <li><a href="#temporadas" className="hover:text-white transition">Temporadas</a></li>
            <li><a href="#rutas" className="hover:text-white transition">Rutas Turísticas</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Estado de Tlaxcala</h4>
          <p className="text-sm text-gray-400">
            Orgullosamente rico en historia, tradiciones, cultura y calidez.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Tlaxcala 60 Municipios. Todos los derechos reservados.
      </div>
    </footer>
  );
}