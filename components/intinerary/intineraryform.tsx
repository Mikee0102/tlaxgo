'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { itineraryService } from '@/services/itinerary.service';
import { Itinerary } from '@/types/itinerary';
import { Plus, Trash2, CalendarPlus, Clock, MapPin } from 'lucide-react';

interface Props {
  initialData?: Itinerary | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ItineraryForm({ initialData, onSuccess, onCancel }: Props) {
  const { user } = useAuth();
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [startDate, setStartDate] = useState(initialData?.start_date || '');
  const [endDate, setEndDate] = useState(initialData?.end_date || '');
  const [days, setDays] = useState<{
    date: string;
    title: string;
    items: { title: string; start_time: string; duration_minutes: number; notes: string }[];
  }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData?.days && initialData.days.length > 0) {
      setDays(
        initialData.days.map((d: any, idx: number) => ({
          date: d.date || startDate,
          title: d.title || `Día ${idx + 1} - Explorando Tlaxcala`,
          items: (d.activities || d.items || []).map((i: any) => ({
            title: i.title || '',
            start_time: i.start_time || i.time || '09:00',
            duration_minutes: i.duration_minutes || 60,
            notes: i.notes || '',
          })),
        }))
      );
    }
  }, [initialData]);

  // Agregar un nuevo día secuencialmente
  const handleAddNewDay = () => {
    if (!startDate) {
      alert('Por favor, selecciona primero la fecha de inicio del itinerario.');
      return;
    }

    let nextDateStr = startDate;

    if (days.length > 0) {
      const lastDate = new Date(days[days.length - 1].date);
      lastDate.setDate(lastDate.getDate() + 1);
      nextDateStr = lastDate.toISOString().split('T')[0];
    }

    const newDayIndex = days.length + 1;
    const newDay = {
      date: nextDateStr,
      title: `Día ${newDayIndex} - Explorando Tlaxcala`,
      items: [
        {
          title: 'Parada o Atractivo',
          start_time: '09:00',
          duration_minutes: 90,
          notes: '',
        },
      ],
    };

    const updatedDays = [...days, newDay];
    setDays(updatedDays);
    setEndDate(nextDateStr);
  };

  // Eliminar un día y recalcular fechas y números de día
  const handleRemoveDay = (dayIndex: number) => {
    const filtered = days.filter((_, idx) => idx !== dayIndex);

    if (startDate && filtered.length > 0) {
      const recalculated = filtered.map((d, idx) => {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + idx);
        const dateStr = currentDate.toISOString().split('T')[0];

        const subTitle = d.title.includes(' - ') ? d.title.split(' - ')[1] : 'Explorando Tlaxcala';

        return {
          ...d,
          date: dateStr,
          title: `Día ${idx + 1} - ${subTitle}`,
        };
      });

      setDays(recalculated);
      setEndDate(recalculated[recalculated.length - 1].date);
    } else {
      setDays(filtered);
      setEndDate(startDate);
    }
  };

  const handleStartDateChange = (newStartDate: string) => {
    setStartDate(newStartDate);

    if (newStartDate && days.length > 0) {
      const recalculated = days.map((d, idx) => {
        const currentDate = new Date(newStartDate);
        currentDate.setDate(currentDate.getDate() + idx);
        return {
          ...d,
          date: currentDate.toISOString().split('T')[0],
        };
      });

      setDays(recalculated);
      setEndDate(recalculated[recalculated.length - 1].date);
    } else {
      setEndDate(newStartDate);
    }
  };

  const addItemToDay = (dayIndex: number) => {
    const newDays = [...days];
    newDays[dayIndex].items.push({
      title: '',
      start_time: '12:00',
      duration_minutes: 60,
      notes: '',
    });
    setDays(newDays);
  };

  const removeItemFromDay = (dayIndex: number, itemIndex: number) => {
    const newDays = [...days];
    newDays[dayIndex].items.splice(itemIndex, 1);
    setDays(newDays);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;
    if (days.length === 0) {
      alert('Agrega al menos un día al itinerario.');
      return;
    }

    try {
      setLoading(true);
      const itineraryPayload = {
        title,
        description,
        start_date: startDate,
        end_date: endDate || startDate,
        days: days.map((d, idx) => ({
          day_number: idx + 1,
          title: d.title,
          activities: d.items.map((item) => ({
            title: item.title,
            time: item.start_time,
            duration_minutes: item.duration_minutes,
            notes: item.notes,
          })),
        })),
      };

      if (initialData?.id) {
        // Actualizamos pasando el user.uid y el id del itinerario
        await itineraryService.updateFullItinerary(user.uid, initialData.id, itineraryPayload);
      } else {
        await itineraryService.createFullItinerary(user.uid, itineraryPayload);
      }
      onSuccess();
    } catch (err: any) {
      alert('Error al guardar el itinerario: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-white"
    >
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-sky-400">
            {initialData ? 'Editar Itinerario' : 'Crear Nuevo Itinerario'}
          </h2>
          <p className="text-xs text-slate-400">Configura la ruta día a día</p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-slate-400 hover:text-white cursor-pointer"
        >
          Cancelar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Título del Itinerario
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej. Ruta del Maguey y Haciendas Pulqueras"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-sky-500 outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Descripción
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe la experiencia turística y recomendaciones..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-sky-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Fecha de Inicio
          </label>
          <input
            type="date"
            required
            value={startDate}
            onChange={(e) => handleStartDateChange(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-sky-500 outline-none text-slate-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Fecha de Fin (Calculada automáticamente)
          </label>
          <input
            type="date"
            disabled
            value={endDate || startDate}
            className="w-full bg-slate-950/50 border border-slate-800/80 rounded-xl px-4 py-2 text-sm text-slate-500 cursor-not-allowed outline-none"
          />
        </div>
      </div>

      {/* Lista de días creados */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-sky-400" />
            Días del Itinerario ({days.length})
          </h3>

          <button
            type="button"
            onClick={handleAddNewDay}
            className="px-4 py-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          >
            <CalendarPlus className="w-4 h-4 text-sky-400" />
            + Agregar nuevo día
          </button>
        </div>

        {days.length === 0 ? (
          <div className="p-8 text-center bg-slate-950/40 rounded-2xl border border-dashed border-slate-800 text-slate-400 text-xs">
            Selecciona la fecha de inicio y haz clic en <strong>&quot;+ Agregar nuevo día&quot;</strong> para armar el cronograma.
          </div>
        ) : (
          days.map((day, dIdx) => (
            <div
              key={day.date + dIdx}
              className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-2xl space-y-3"
            >
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <input
                  type="text"
                  value={day.title}
                  onChange={(e) => {
                    const newDays = [...days];
                    newDays[dIdx].title = e.target.value;
                    setDays(newDays);
                  }}
                  className="bg-transparent font-bold text-sm text-sky-300 outline-none border-b border-transparent focus:border-sky-500 flex-1 mr-4"
                />
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-mono">{day.date}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDay(dIdx)}
                    className="text-slate-500 hover:text-red-400 text-xs flex items-center gap-1 transition cursor-pointer"
                    title="Eliminar este día"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Items / Actividades del día */}
              <div className="space-y-2">
                {day.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="flex flex-wrap gap-2 items-center bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-xs"
                  >
                    <input
                      type="text"
                      placeholder="Nombre del atractivo o actividad"
                      value={item.title}
                      required
                      onChange={(e) => {
                        const newDays = [...days];
                        newDays[dIdx].items[iIdx].title = e.target.value;
                        setDays(newDays);
                      }}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white outline-none"
                    />
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <input
                        type="time"
                        value={item.start_time}
                        onChange={(e) => {
                          const newDays = [...days];
                          newDays[dIdx].items[iIdx].start_time = e.target.value;
                          setDays(newDays);
                        }}
                        className="w-24 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-slate-300 outline-none"
                      />
                    </div>
                    <input
                      type="number"
                      placeholder="Minutos"
                      value={item.duration_minutes}
                      onChange={(e) => {
                        const newDays = [...days];
                        newDays[dIdx].items[iIdx].duration_minutes = Number(e.target.value);
                        setDays(newDays);
                      }}
                      className="w-20 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-slate-300 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeItemFromDay(dIdx, iIdx)}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition cursor-pointer"
                      title="Eliminar parada"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => addItemToDay(dIdx)}
                className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium pt-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Agregar parada o actividad
              </button>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl border border-slate-700 text-sm font-semibold text-slate-300 hover:bg-slate-800 transition cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-sm font-bold transition disabled:opacity-50 cursor-pointer"
        >
          {loading
            ? 'Guardando...'
            : initialData
            ? 'Actualizar Itinerario'
            : 'Publicar Itinerario'}
        </button>
      </div>
    </form>
  );
}
//mostrar la imformacion de la ubicacion de cada parada, con un mapa y la direccion, ademas de la opcion de agregar fotos y videos de cada parada