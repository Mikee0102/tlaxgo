'use client';

import { PlaceCategory } from '../../types/place';

interface FiltersProps {
  activeCategory: PlaceCategory | 'all';
  onCategoryChange: (category: PlaceCategory | 'all') => void;
}

interface FilterOption {
  id: PlaceCategory | 'all';
  label: string;
  icon: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { id: 'all', label: 'Todos', icon: '🗺️' },
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
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
              isActive
                ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
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
