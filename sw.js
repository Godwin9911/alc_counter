const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  'index.html',
  'alc.css',
  'alc.jpg',
  'alc2.png',
  'googleafrica.png',
  'pluralsight.png'
]

self.addEventListener('install', event => {
  // console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  // console.log('Service worker activate event!');
  // remove unwanted caches

});

self.addEventListener('fetch', event => {
  // console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
});