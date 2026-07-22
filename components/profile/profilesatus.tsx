'use client';

const stats = [
  { label: 'Lugares visitados', value: 12 },
  { label: 'Favoritos', value: 8 },
  { label: 'Itinerarios creados', value: 3 },
  { label: 'Comentarios', value: 15 },
];

export default function ProfileStats() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Estadísticas</h2>
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex justify-between items-center">
            <span className="text-gray-600">{stat.label}</span>
            <span className="text-lg font-bold text-blue-500">{stat.value}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-700">
            🏆 ¡Has visitado el 40% de los lugares destacados!
          </p>
        </div>
      </div>
    </div>
  );
}