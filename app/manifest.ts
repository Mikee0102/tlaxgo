// app/manifest.ts
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tlax.go - Guía Turística de Tlaxcala',
    short_name: 'Tlax.go',
    description: 'Explora itinerarios y rutas turísticas oficiales de Tlaxcala',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#020617',
    icons: [
      {
        src: '/icons/icon.jpg',
        sizes: '192x192',
        type: 'image/jpg',
      },
      {
        src: '/icons/icon.jpg',
        sizes: '512x512',
        type: 'image/jpg',
      },
    ],
  };
}