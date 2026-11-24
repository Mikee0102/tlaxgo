'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    let registration: ServiceWorkerRegistration | null = null;

    const checkForUpdates = () => {
      if (navigator.onLine && registration) {
        registration.update().catch((error) => {
          console.error('Falló la comprobación de actualizaciones:', error);
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkForUpdates();
      }
    };

    const registerSW = () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((serviceWorkerRegistration) => {
          registration = serviceWorkerRegistration;
          console.log('Service Worker registrado con éxito:', serviceWorkerRegistration.scope);
        })
        .catch((error) => {
          console.error('Falló el registro del Service Worker:', error);
        });
    };

    window.addEventListener('online', checkForUpdates);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (document.readyState === 'complete') {
      registerSW();
    } else {
      window.addEventListener('load', registerSW, { once: true });
    }

    return () => {
      window.removeEventListener('load', registerSW);
      window.removeEventListener('online', checkForUpdates);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
}