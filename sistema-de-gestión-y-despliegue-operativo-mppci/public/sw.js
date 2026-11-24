// =========================================================================
// SERVICE WORKER SOBERANO PWA — SGDO-VSCC (OFFLINE-FIRST DESIGN)
// Conformidad: Principio I de la Guía Maestra de Ingeniería Institucional
// =========================================================================

const CACHE_NAME_STATIC = 'sgdo-static-v1';
const CACHE_NAME_DATA = 'sgdo-data-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logos/LOGOTIPO VSCC_V1-VSCC.png'
];

// Instalación del Service Worker: precacheo del shell soberano
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME_STATIC).then((cache) => {
      console.log('[SW] Pre-cacheando App Shell soberano...');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Aviso al precachear algunos recursos:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activación: limpieza de cachés antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME_STATIC && key !== CACHE_NAME_DATA) {
            console.log('[SW] Eliminando caché obsoleto:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Intercepción de peticiones: CacheFirst para estáticos, NetworkFirst para API
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Ignorar métodos no GET
  if (event.request.method !== 'GET') {
    return;
  }

  // 1. Peticiones de API: Estrategia NetworkFirst con fallback a caché
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME_DATA).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          console.warn('[SW] Red no disponible, recuperando API desde caché local:', url.pathname);
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // Respuesta de contingencia offline si no está en caché
          return new Response(
            JSON.stringify({
              offline: true,
              message: 'Modo desconectado soberano activo. Datos temporales no disponibles en caché.',
              timestamp: new Date().toISOString()
            }),
            { headers: { 'Content-Type': 'application/json' }, status: 200 }
          );
        })
    );
    return;
  }

  // 2. Activos Estáticos (JS, CSS, Imágenes, Fuentes): Estrategia CacheFirst con Network Fallback
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // En segundo plano refrescar caché (Stale-While-Revalidate selectivo)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME_STATIC).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME_STATIC).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          // Si es navegación HTML, retornar shell base
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/index.html');
          }
        });
    })
  );
});
