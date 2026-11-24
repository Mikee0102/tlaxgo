'use client';

import { useEffect, useState } from 'react';
import { WifiOff, RefreshCw, CheckCircle2, CloudOff, X } from 'lucide-react';
import { offlineQueueService } from '@/services/offlineQueue.service';

export default function NetworkStatusBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [dismissedOffline, setDismissedOffline] = useState(false);

  const refreshPendingCount = () => {
    setPendingCount(offlineQueueService.getQueue().length);
  };

  const syncNow = async () => {
    if (!navigator.onLine) return;
    const { synced, remaining } = await offlineQueueService.flushQueue();
    setPendingCount(remaining);
    if (synced > 0) {
      setSyncMessage(`Se subieron ${synced} cambio(s) a la nube.`);
      setTimeout(() => setSyncMessage(null), 4000);
    }
  };

  useEffect(() => {
    setIsOnline(navigator.onLine);
    refreshPendingCount();

    const handleOnline = () => {
      setIsOnline(true);
      setDismissedOffline(false);
      syncNow();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setDismissedOffline(false);
      refreshPendingCount();
    };

    const handleQueueUpdated = () => {
      refreshPendingCount();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('tlaxgo-queue-updated', handleQueueUpdated);

    if (navigator.onLine) {
      syncNow();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('tlaxgo-queue-updated', handleQueueUpdated);
    };
  }, []);

  if (isOnline && pendingCount === 0 && !syncMessage) return null;
  if (!isOnline && dismissedOffline) return null;

  return (
    <div className="fixed top-20 left-4 z-[9990] max-w-xs sm:max-w-sm pointer-events-none">
      {/* Aviso arriba a la izquierda, debajo de la barra de navegación */}
      {!isOnline && (
        <div className="pointer-events-auto flex items-center justify-between gap-2.5 rounded-2xl border-2 border-amber-400/80 bg-slate-950/95 px-3.5 py-2.5 text-amber-100 shadow-2xl shadow-amber-500/20 backdrop-blur-xl">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 animate-pulse">
              <WifiOff className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-extrabold uppercase tracking-wide text-amber-400 leading-tight">
                Sin conexión
              </p>
              <p className="text-[11px] text-slate-200 leading-snug">
                Sigue navegando; se subirá al reconectar.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {pendingCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-400/40 px-2 py-0.5 text-[11px] font-bold text-amber-300">
                <CloudOff className="w-3 h-3" />
                {pendingCount}
              </span>
            )}
            <button
              onClick={() => setDismissedOffline(true)}
              aria-label="Ocultar aviso"
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Sincronizando al recuperar conexión */}
      {isOnline && pendingCount > 0 && (
        <button
          onClick={syncNow}
          className="pointer-events-auto flex items-center gap-2 rounded-2xl border border-sky-400/60 bg-slate-950/95 px-3.5 py-2.5 text-xs font-semibold text-sky-200 shadow-2xl shadow-sky-500/20 backdrop-blur-xl hover:bg-slate-900 transition cursor-pointer"
        >
          <RefreshCw className="h-4 w-4 text-sky-400 animate-spin shrink-0" />
          <span>Subiendo {pendingCount} cambio(s)...</span>
        </button>
      )}

      {/* Confirmación de sincronización */}
      {syncMessage && (
        <div className="pointer-events-auto flex items-center gap-2 rounded-2xl border border-emerald-400/60 bg-slate-950/95 px-3.5 py-2.5 text-xs font-semibold text-emerald-200 shadow-2xl shadow-emerald-500/20 backdrop-blur-xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{syncMessage}</span>
        </div>
      )}
    </div>
  );
}