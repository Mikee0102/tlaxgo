'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Compass } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xl font-black text-white tracking-wider flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Compass className="w-5 h-5" />
            </div>
            Tlaxgo <span className="text-sky-400 font-light text-xs bg-sky-950 border border-sky-900 px-2.5 py-0.5 rounded-full">60 Municipios</span>
          </Link>
        </div>

        {/* Enlaces de Escritorio */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#hero" onClick={(e) => handleScrollTo(e, 'hero')} className="hover:text-sky-400 transition cursor-pointer">Inicio</a>
          <a href="#municipios" onClick={(e) => handleScrollTo(e, 'municipios')} className="text-sky-400 font-semibold hover:text-sky-300 transition cursor-pointer">Municipios</a>
          <Link href="/explore" className="hover:text-sky-400 transition cursor-pointer">Lugares</Link>
        </nav>

        {/* Botón de Acción */}
        <div>
          <a 
            href="#municipios" 
            onClick={(e) => handleScrollTo(e, 'municipios')}
            className="bg-sky-500 hover:bg-sky-400 text-white font-semibold px-6 py-2.5 rounded-full text-xs transition shadow-lg shadow-sky-500/20 inline-block cursor-pointer"
          >
            EXPLORAR AHORA
          </a>
        </div>

        {/* Botón Menú Hamburguesa Móvil */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2"
          aria-label="Menú"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menú Desplegable Móvil */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-4 shadow-2xl">
          <a href="#hero" onClick={(e) => handleScrollTo(e, 'hero')} className="block text-slate-300 hover:text-sky-400 text-sm font-medium cursor-pointer">Inicio</a>
          <a href="#destinos" onClick={(e) => handleScrollTo(e, 'destinos')} className="block text-slate-300 hover:text-sky-400 text-sm font-medium cursor-pointer">Destinos</a>
          <a href="#municipios" onClick={(e) => handleScrollTo(e, 'municipios')} className="block text-sky-400 font-semibold text-sm cursor-pointer">Municipios</a>
          <Link href="/explore" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-sky-400 text-sm font-medium cursor-pointer">Lugares</Link>
          <a href="/explore" onClick={(e) => handleScrollTo(e, 'lugares')} className="block text-slate-300 hover:text-sky-400 text-sm font-medium cursor-pointer">Lugares</a>
        </div>
      )}
    </header>
  );
}