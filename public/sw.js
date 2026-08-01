// ── QR Menü Service Worker ──────────────────────────────────────────────────
// Note: Video files (.mp4, .webm, .mov) and Range requests are bypassed
// so mobile browsers (iOS Safari, Android Chrome) can perform native HTTP 206
// Range streaming directly with the backend.

const CACHE_NAME = 'qrmenu-cache-v2';
const STATIC_ASSETS = ['/'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET
  if (event.request.method !== 'GET') return;

  // ── CRITICAL: Bypass Service Worker for Range requests & video files ────────
  // iOS Safari and Android Chrome require native HTTP 206 Range request handling for <video>
  if (
    event.request.headers.has('range') ||
    url.pathname.endsWith('.mp4') ||
    url.pathname.endsWith('.webm') ||
    url.pathname.endsWith('.mov') ||
    url.pathname.endsWith('.ogg')
  ) {
    return; // Pass through to native browser network engine
  }

  // ── API calls: Network-First ──────────────────────────────────────────────
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // ── Everything else (App Shell): Cache-First ──────────────────────────────
  event.respondWith(cacheFirst(event.request));
});

async function networkFirst(request) {
  try {
    return await fetch(request);
  } catch {
    const cache = await caches.open(CACHE_NAME);
    return (await cache.match(request)) || new Response('Çevrimdışı', { status: 503 });
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone()).catch(() => {});
    }
    return networkResponse;
  } catch {
    return new Response('Ağ hatası', { status: 503 });
  }
}
