'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Loader2, ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

const supabase = createClient();

export default function AdminItineraryPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.replace('/');
    }
    if (isAdmin) {
      loadItineraries();
    }
  }, [isAdmin, authLoading]);

  const loadItineraries = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('itineraries')
      .select('*')
      .order('created_at', { ascending: false });
    setItineraries(data || []);
    setLoading(false);
  };

  const createItinerary = async () => {
    const title = prompt('Título del itinerario:');
    if (!title) return;

    const { data, error } = await supabase
      .from('itineraries')
      .insert({
        user_id: user?.id,
        title,
        status: 'planned'
      })
      .select();

    if (error) {
      alert('Error al crear: ' + error.message);
    } else {
      loadItineraries();
    }
  };

  const deleteItinerary = async (id: string) => {
    if (!confirm('¿Eliminar este itinerario?')) return;
    await supabase.from('itineraries').delete().eq('id', id);
    loadItineraries();
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="text-slate-400 hover:text-sky-400 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold">Panel de Itinerarios</h1>
          <span className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30">
            Admin
          </span>
        </div>

        <button
          onClick={createItinerary}
          className="bg-sky-500 text-slate-950 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-sky-400 transition mb-6"
        >
          <Plus className="w-4 h-4" /> Nuevo Itinerario
        </button>

        <div className="space-y-4">
          {itineraries.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              No hay itinerarios creados
            </div>
          ) : (
            itineraries.map((it) => (
              <div
                key={it.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex justify-between items-center hover:border-slate-700 transition"
              >
                <div>
                  <h3 className="text-xl font-semibold">{it.title}</h3>
                  <p className="text-sm text-slate-400">
                    Creado: {new Date(it.created_at).toLocaleDateString('es-MX')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/admin/itinerary/${it.id}`)}
                    className="p-2 hover:bg-slate-800 rounded-full transition"
                  >
                    <Edit className="w-4 h-4 text-sky-400" />
                  </button>
                  <button
                    onClick={() => deleteItinerary(it.id)}
                    className="p-2 hover:bg-slate-800 rounded-full transition"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}