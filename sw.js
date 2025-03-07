const cacheName = 'weather-app-cache-v1';
const assetsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/manifest.json',
  '/path/to/index.html',
  '/path/to/styles.css',
  '/path/to/app.js'
];

// Installera service worker och cacha resurser
self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(cacheName).then(cache => {
        console.log('Caching app shell');
        return cache.addAll(assetsToCache);
      })
    );
  });

// Hämta resurser från cache eller nätverk
self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      }).catch(() => {
        return caches.match('/index.html');
      })
    );
  });

  