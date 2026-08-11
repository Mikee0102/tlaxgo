'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Compass } from 'lucide-react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [filtro, setFiltro] = useState('');

  const municipiosSimples = [
    { id: 1, nombre: 'Apizaco', lugar: 'La Maquinaria y Basílica', feria: 'Marzo' },
    { id: 2, nombre: 'Huamantla', lugar: 'Museo del Títere y Noche que Nadie Duerme', feria: 'Agosto' },
    { id: 3, nombre: 'Tlaxcala', lugar: 'Palacio de Gobierno y Murales', feria: 'Octubre - Noviembre' },
    { id: 4, nombre: 'Chiautempan', lugar: 'Artesanías de Lana y Sarapes', feria: 'Julio - Agosto' },
    { id: 5, nombre: 'Calpulalpan', lugar: 'Zona Arqueológica de Tecoaque', feria: 'Junio' },
    { id: 6, nombre: 'Nanacamilpa', lugar: 'Santuario de las Luciérnagas', feria: 'Junio a Agosto' },
  ];

  const resultados = municipiosSimples.filter(m => 
    m.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    m.lugar.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-white">
      {/* Navbar integrado */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xl font-black text-white tracking-wider flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Compass className="w-5 h-5" />
              </div>
              Tlaxgo <span className="text-sky-400 font-light text-xs bg-sky-950 border border-sky-900 px-2.5 py-0.5 rounded-full">60 Municipios</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" onClick={(e) => handleScrollTo(e, 'hero')} className="hover:text-sky-400 transition cursor-pointer">Inicio</a>
            <a href="#municipios" onClick={(e) => handleScrollTo(e, 'municipios')} className="text-sky-400 font-semibold hover:text-sky-300 transition cursor-pointer">Municipios</a>
          </nav>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Sección Hero */}
      <section id="hero" className="py-20 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
          Descubre la magia de <span className="text-sky-400">Tlaxcala</span>
        </h1>
        <p className="text-slate-300 text-lg">
          Explora cada rincón, sus tradiciones y su cultura en un solo lugar.
        </p>
      </section>

      {/* SECCIÓN DE MUNICIPIOS DIRECTA */}
      <section id="municipios" className="py-16 max-w-7xl mx-auto px-6">
        <div className="w-full bg-slate-900 p-8 rounded-3xl border border-sky-500/35 shadow-2xl">
          <h2 className="text-3xl font-extrabold text-white text-center mb-4">
            Directorio de <span className="text-sky-400">Municipios</span>
          </h2>
          <p className="text-slate-300 text-center mb-6 text-sm">
            Busca tu municipio o atractivo principal:
          </p>

          <div className="max-w-md mx-auto mb-8">
            <input 
              type="text"
              placeholder="Escribe Apizaco, Huamantla..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {resultados.map((m) => (
              <div key={m.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-sky-400">#0{m.id}</span>
                <h3 className="text-lg font-bold text-white mt-1">{m.nombre}</h3>
                <p className="text-xs text-slate-300 mt-2">📍 {m.lugar}</p>
                <p className="text-xs text-sky-300 mt-3 font-semibold">📅 Feria: {m.feria}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}