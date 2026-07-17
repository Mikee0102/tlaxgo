'use client';

import { useState } from 'react';
import FavoriteCard from './components/faboritecard';

interface Favorite {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  category: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([
    {
      id: 1,
      name: 'Catedral de Tlaxcala',
      location: 'Centro Histórico',
      image: '/placeholder.jpg',
      rating: 4.8,
      category: 'Arquitectura'
    },
    {
      id: 2,
      name: 'Parque Nacional La Malinche',
      location: 'San Pablo del Monte',
      image: '/placeholder.jpg',
      rating: 4.9,
      category: 'Naturaleza'
    },
    {
      id: 3,
      name: 'Museo de Arte de Tlaxcala',
      location: 'Centro',
      image: '/placeholder.jpg',
      rating: 4.6,
      category: 'Cultura'
    }
  ]);

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mis Favoritos</h1>
        <span className="text-gray-500">{favorites.length} lugares</span>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No tienes favoritos aún</p>
          <p className="text-gray-400">Explora y agrega lugares que te gusten</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <FavoriteCard 
              key={fav.id} 
              favorite={fav} 
              onRemove={removeFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}