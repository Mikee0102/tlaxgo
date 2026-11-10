/// <reference lib="webworker" />

// Declaramos explicitamente el contexto de tipo para que TypeScript no marque errores
const sw = self as unknown as ServiceWorkerGlobalScope;

const CACHE_NAME = 'tlaxgo-cache-v1';
const urlsToCache = [
  '/',
  '/explore',
  '/itinerary',
  '/favorites',
  '/dashboard'
];

// 1. Instalación del Service Worker
sw.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Archivos en caché abriéndose...');
      return cache.addAll(urlsToCache);
    })
  );
  sw.skipWaiting();
});

// 2. Activación del Service Worker
sw.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Borrando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  sw.clients.claim();
});

// 3. Interceptar peticiones de red (Fetch)
sw.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});