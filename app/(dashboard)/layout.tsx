export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra superior simple */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-800">Tlaxgo</h1>
            <div className="flex space-x-4">
              <a href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</a>
              <a href="/favorites" className="text-gray-600 hover:text-gray-900">Favoritos</a>
              <a href="/profile" className="text-gray-600 hover:text-gray-900">Perfil</a>
              <a href="/itinerary" className="text-gray-600 hover:text-gray-900">Itinerarios</a>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Aquí se renderizan tus páginas */}
      <main>
        {children}
      </main>
    </div>
  );
}