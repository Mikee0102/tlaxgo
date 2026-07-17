// Estrategias de caché para PWA

export const CACHE_STRATEGIES = {
  // Cache First: Busca en caché primero, si no hay, va a la red
  cacheFirst: async (request: Request) => {
    const cache = await caches.open('tlaxgo-v1');
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    try {
      const response = await fetch(request);
      cache.put(request, response.clone());
      return response;
    } catch (error) {
      throw new Error('No hay conexión y el recurso no está en caché');
    }
  },

  // Network First: Busca en red primero, si falla, usa caché
  networkFirst: async (request: Request) => {
    const cache = await caches.open('tlaxgo-v1');
    
    try {
      const response = await fetch(request);
      cache.put(request, response.clone());
      return response;
    } catch (error) {
      const cached = await cache.match(request);
      if (cached) {
        return cached;
      }
      throw new Error('No hay conexión y el recurso no está en caché');
    }
  },

  // Stale While Revalidate: Devuelve caché y actualiza en background
  staleWhileRevalidate: async (request: Request) => {
    const cache = await caches.open('tlaxgo-v1');
    const cached = await cache.match(request);
    
    const fetchPromise = fetch(request).then((response) => {
      cache.put(request, response.clone());
      return response;
    }).catch(() => {});
    
    return cached || (await fetchPromise);
  }
};

// Precache de recursos estáticos
export const precacheResources = async () => {
  const cache = await caches.open('tlaxgo-v1');
  
  const resourcesToCache = [
    '/',
    '/dashboard',
    '/favorites',
    '/profile',
    '/itinerary',
    '/manifest.json',
    '/offline.html'
  ];
  
  try {
    await cache.addAll(resourcesToCache);
    console.log('Recursos precargados en caché');
  } catch (error) {
    console.error('Error al precargar recursos:', error);
  }
};