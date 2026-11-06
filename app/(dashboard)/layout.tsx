import Navbar from '@/components/layout/Navbar';
import React from 'react';
// 👈 Asegúrate de que esta ruta coincida con la ubicación real de tu componente Navbar

export default function DashboardLayout({
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
    <div className="min-h-screen bg-slate-950 text-white antialiased flex flex-col">
      {/* Barra de navegación persistente en todo el dashboard */}
      <Navbar />

      {/* Contenido principal de las subrutas (itinerario, exploración, etc.) */}
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
}