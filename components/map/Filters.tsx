'use client';

import { PlaceCategory } from '../../types/place';

interface FiltersProps {
  activeCategory: PlaceCategory | 'all' | 'favorites';
  onCategoryChange: (category: PlaceCategory | 'all' | 'favorites') => void;
}

interface FilterOption {
  id: PlaceCategory | 'all' | 'favorites';
  label: string;
  icon: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { id: 'all', label: 'Todos', icon: '🗺️' },
  { id: 'favorites', label: 'Mis Favoritos', icon: '❤️' },
  { id: 'museum', label: 'Museos', icon: '🏛️' },
  { id: 'church', label: 'Templos', icon: '⛪' },
  { id: 'park', label: 'Parques', icon: '🌳' },
  { id: 'viewpoint', label: 'Miradores', icon: '📸' },
  { id: 'restaurant', label: 'Comida', icon: '🌮' },
  { id: 'hotel', label: 'Hospedaje', icon: '🏨' },
];

export default function Filters({ activeCategory, onCategoryChange }: FiltersProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {FILTER_OPTIONS.map((option) => {
        const isActive = activeCategory === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onCategoryChange(option.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
              isActive
                ? 'bg-sky-500 border-sky-400 text-white shadow-lg shadow-sky-500/20'
                : 'bg-slate-950/90 backdrop-blur-md border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
            }`}
          >
            <span>{option.icon}</span>
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}