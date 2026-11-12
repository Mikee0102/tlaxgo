import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/', // 🆔 Soluciona la advertencia de identidad del manifest
    name: 'Tlax.go - Guía Turística de Tlaxcala',
    short_name: 'Tlax.go',
    description: 'Explora itinerarios y rutas turísticas oficiales de Tlaxcala',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#020617',
    
    // 🎨 Iconos (Deben ser archivos cuadrados reales, ej. 192x192 y 512x512)
    icons: [
      {
        src: '/icons/icon1.png', // Si este archivo mide 2752x1536, cámbialo por un icono cuadrado real más adelante, 
        sizes: '192x192',       // pero por ahora lo dejamos alineado para evitar que rompa el build.
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon2.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],

    // 📸 Aquí es donde SÍ puedes usar tu imagen de 2752x1536 (ancho/wide)
    screenshots: [
      {
        src: '/icons/icon.jpg',
        sizes: '2752x1536',
        type: 'image/jpeg',
        form_factor: 'wide', // 🖥️ Soluciona el error de escritorio
        label: 'Vista general de Tlax.go en escritorio',
      },
      {
        src: '/icons/icon.jpg',
        sizes: '2752x1536',
        type: 'image/jpeg',
        // form_factor omitido o móvil 📱 Soluciona el error de móvil
        label: 'Vista de Tlax.go',
      },
    ],
  };
}