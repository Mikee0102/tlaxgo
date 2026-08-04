'use client';

export default function ChartWidget() {
  const data = [
    { day: 'Lun', visits: 4 },
    { day: 'Mar', visits: 7 },
    { day: 'Mié', visits: 5 },
    { day: 'Jue', visits: 9 },
    { day: 'Vie', visits: 12 },
    { day: 'Sáb', visits: 8 },
    { day: 'Dom', visits: 6 },
  ];

  const maxValue = Math.max(...data.map(d => d.visits));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Visitas Semanales</h2>
      <div className="flex items-end justify-between h-48 space-x-2">
        {data.map((item) => (
          <div key={item.day} className="flex flex-col items-center flex-1">
            <div 
              className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
              style={{ 
                height: `${(item.visits / maxValue) * 100}%`,
                minHeight: '10px'
              }}
            />
            <span className="text-xs text-gray-500 mt-2">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}