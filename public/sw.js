const CACHE_NAME = 'tlaxgo-cache-v5';

const PRECACHE_URLS = [
  '/',
  '/explore',
  '/itinerary',
  '/favorites',
  '/dashboard',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Solo peticiones GET del mismo origen
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // 2. NUNCA interceptar ni cachear archivos internos de Next.js (chunks, HMR, RSC)
  // Esto elimina el bucle infinito de recargas en `pnpm run dev`
  if (
    url.pathname.startsWith('/_next/') ||
    url.searchParams.has('_rsc') ||
    url.pathname === '/sw.js'
  ) {
    return;
  }

  // 3. Navegación entre pantallas HTML (Network-First con respaldo en caché)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedPage = await caches.match(request);
          return cachedPage || (await caches.match('/')) || new Response('Sin conexión', { status: 503 });
        })
    );
    return;
  }

  // 4. Recursos estáticos propios (iconos, imágenes en /public, manifest)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => new Response('', { status: 408, statusText: 'Offline' }));
    })
  );
});