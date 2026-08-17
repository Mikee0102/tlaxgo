'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { itineraryService } from '@/services/itinerary.service';
import { Itinerary } from '@/types/itinerary';
import ItineraryCard from '@/components/intinerary/intinerarycard';
import ItineraryForm from '@/components/intinerary/intineraryform';
import { Compass, Heart, PlusCircle } from 'lucide-react';

export default function ItinerariesPage() {
  const { user, isAdmin } = useAuth();
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [activeTab, setActiveTab] = useState<'available' | 'favorites'>('available');
  const [editingItinerary, setEditingItinerary] = useState<Itinerary | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await itineraryService.getItineraries(user?.id);
      setItineraries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleToggleFavorite = async (id: string, currentStatus: boolean) => {
    if (!user) return;
    try {
      setItineraries((prev) =>
        prev.map((it) => (it.id === id ? { ...it, is_favorite: !currentStatus } : it))
      );
      await itineraryService.toggleFavorite(user.id, id, currentStatus);
    } catch (err) {
      console.error(err);
      loadData();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este itinerario y todas sus actividades?')) return;
    try {
      await itineraryService.deleteItinerary(id);
      loadData();
    } catch (err: any) {
      alert('Error al eliminar: ' + err.message);
    }
  };

  const isFormVisible = showCreateForm || !!editingItinerary;

  const displayedItineraries =
    activeTab === 'favorites'
      ? itineraries.filter((it) => it.is_favorite)
      : itineraries;

  return (
    <div className="min-h-[85vh] bg-slate-950 text-white p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold">Itinerarios de Viaje</h1>
          <p className="text-slate-400 text-sm mt-1">
            Explora y administra las rutas turísticas oficiales de Tlaxcala.
          </p>
        </div>

        {isAdmin && !isFormVisible && (
          <button
            onClick={() => {
              setEditingItinerary(null);
              setShowCreateForm(true);
            }}
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-5 py-2.5 rounded-full text-sm transition shadow-lg shadow-sky-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            Crear Itinerario
          </button>
        )}
      </header>

      {isFormVisible ? (
        <ItineraryForm
          initialData={editingItinerary}
          onSuccess={() => {
            setShowCreateForm(false);
            setEditingItinerary(null);
            loadData();
          }}
          onCancel={() => {
            setShowCreateForm(false);
            setEditingItinerary(null);
          }}
        />
      ) : (
        <>
          <div className="flex gap-3 border-b border-slate-800 pb-4">
            <button
              onClick={() => setActiveTab('available')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                activeTab === 'available'
                  ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              Disponibles ({itineraries.length})
            </button>

            <button
              onClick={() => setActiveTab('favorites')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                activeTab === 'favorites'
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Heart className="w-4 h-4" />
              Favoritos ({itineraries.filter((i) => i.is_favorite).length})
            </button>
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-500 animate-pulse">
              Cargando itinerarios...
            </div>
          ) : displayedItineraries.length === 0 ? (
            <div className="py-16 text-center bg-slate-900/50 rounded-3xl border border-slate-800/60 p-8">
              <p className="text-slate-400 text-sm">
                {activeTab === 'favorites'
                  ? 'No tienes itinerarios guardados en favoritos.'
                  : 'No hay itinerarios registrados.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedItineraries.map((itinerary) => (
                <ItineraryCard
                  key={itinerary.id}
                  itinerary={itinerary}
                  isAdmin={isAdmin}
                  onToggleFavorite={handleToggleFavorite}
                  onEdit={(it) => setEditingItinerary(it)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}