'use client';

const activities = [
  { id: 1, action: 'Visitó la Catedral de Tlaxcala', time: 'Hace 2 horas' },
  { id: 2, action: 'Agregó a favoritos el Parque Nacional', time: 'Hace 5 horas' },
  { id: 3, action: 'Creó un nuevo itinerario', time: 'Hace 1 día' },
  { id: 4, action: 'Compartió una experiencia', time: 'Hace 2 días' },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Actividad Reciente</h2>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-700">{activity.action}</span>
            <span className="text-sm text-gray-400">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}