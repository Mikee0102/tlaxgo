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
<<<<<<< HEAD
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium">Cargando Tlaxgo...</p>
        </div>
      </div>
    );
  }
 

  if (!user) return null;

=======
>>>>>>> origin/develop
  return (
    <html lang="es">
      <body className="bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}