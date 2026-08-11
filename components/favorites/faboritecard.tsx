'use client';

import { Heart, MapPin, Star } from 'lucide-react';

interface Favorite {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  category: string;
}

interface FavoriteCardProps {
  favorite: Favorite;
  onRemove: (id: number) => void;
}

export default function FavoriteCard({ favorite, onRemove }: FavoriteCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-200">
        {/* Imagen placeholder */}
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          📸 {favorite.name}
        </div>
        <button
          onClick={() => onRemove(favorite.id)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
        >
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">{favorite.name}</h3>
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{favorite.location}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
            {favorite.category}
          </span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-medium">{favorite.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}