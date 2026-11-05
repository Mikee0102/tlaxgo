import type { Metadata, Viewport } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Tlax.go | Rutas e Itinerarios Turísticos de Tlaxcala',
  description: 'Descubre haciendas, ecoturismo, gastronomía y eventos culturales en Tlaxcala.',
};

// Configuración recomendada para Next.js 14 / 15 / 16
export const viewport: Viewport = {
  themeColor: '#020617', // slate-950
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}