'use client';
import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full shadow-2xl">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sky-400">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar museos, parques o municipio (ej. Huamantla, Tlaxco)..."
        className="w-full pl-11 pr-10 py-3 bg-slate-950/90 backdrop-blur-md text-slate-100 placeholder-slate-400 text-sm font-medium rounded-2xl border border-slate-800 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition shadow-lg"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Limpiar búsqueda"
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}