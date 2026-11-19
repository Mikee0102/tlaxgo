import React from 'react';
import Navbar from '@/components/layout/Navbar'; // 👈 Asegúrate de que esta ruta coincida con la ubicación real de tu componente Navbar
import AuthGuard from '@/components/auth/AuthGuard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-950 text-white antialiased flex flex-col">
        {/* Barra de navegación persistente en todo el dashboard */}
        <Navbar />

        {/* Contenido principal de las subrutas */}
        <main className="flex-1 w-full">{children}</main>
      </div>
    </AuthGuard>
  );
}