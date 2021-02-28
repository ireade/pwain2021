

self.addEventListener('install', e => {
  self.skipWaiting()
});

self.addEventListener('activate', event => {
  
});

self.addEventListener('fetch', event => {
  event.respondWith(
      fetch(event.request)
  );
});