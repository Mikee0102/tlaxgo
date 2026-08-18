'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { profileService } from '@/services/profile.service';
import { UserCircle2, MapPin, Mail, ShieldCheck, Sparkles, Check, AlertCircle } from 'lucide-react';

export default function ProfilePage() {
  const { user, profile, isAdmin, refreshProfile } = useAuth();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setBio(profile.bio || '');
      setLocation(profile.location || '');
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      setFeedback(null);
      await profileService.updateProfile(user.id, {
        name,
        bio,
        location,
      });
      await refreshProfile();
      setFeedback({ type: 'success', message: '¡Perfil actualizado correctamente!' });
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Error al guardar los cambios' });
    } finally {
      setLoading(false);
    }

  return (
    <div className="min-h-[85vh] bg-slate-950 text-white p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <header className="pb-6 border-b border-slate-800">
        <h1 className="text-3xl font-extrabold tracking-tight">Mi Perfil</h1>
        <p className="text-slate-400 text-sm mt-1">
          Gestiona tu información personal y preferencias de cuenta en Tlaxgo.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Tarjeta de Identificación */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col items-center text-center space-y-4 h-fit">
          <div className="relative">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-sky-500/50 shadow-xl"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-700">
                <UserCircle2 className="w-16 h-16" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1">
              {isAdmin ? (
                <span className="p-1.5 bg-amber-500/20 border border-amber-500 text-amber-400 rounded-full block" title="Administrador">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              ) : (
                <span className="p-1.5 bg-sky-500/20 border border-sky-500 text-sky-400 rounded-full block" title="Turista">
                  <Sparkles className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">{profile?.name || 'Usuario'}</h2>
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-1">
              <Mail className="w-3.5 h-3.5" />
              <span className="truncate max-w-[180px]">{user?.email}</span>
            </div>
          </div>

          <div className="w-full pt-4 border-t border-slate-800/80">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              isAdmin 
                ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                : 'bg-sky-500/10 text-sky-300 border border-sky-500/30'
            }`}>
              {isAdmin ? 'Administrador del Sistema' : 'Turista Tlaxgo'}
            </span>
          </div>
        </div>

        {/* Formulario de Edición */}
        <form onSubmit={handleSubmit} className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          {feedback && (
            <div className={`p-4 rounded-2xl text-xs flex items-center gap-2 ${
              feedback.type === 'success' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                : 'bg-red-500/10 text-red-400 border border-red-500/30'
            }`}>
              {feedback.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{feedback.message}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nombre Completo</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-sky-500 outline-none text-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Ubicación / Procedencia</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ej. Tlaxcala Centro, Puebla, CDMX..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-sky-500 outline-none text-white transition"
              />
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Biografía o Intereses</label>
            <textarea
              rows={3}
              placeholder="Cuéntanos qué te gusta descubrir: haciendas, ecoturismo, gastronomía, eventos..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-sky-500 outline-none text-white transition"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-800">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-sm font-bold transition disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
}