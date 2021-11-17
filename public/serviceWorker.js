const STATIC_CACHE_NAME = 'static-v1';
const DYNAMIC_CACHE_NAME = 'dynamic-v1';

const STATIC_REQUESTS = [
    '/',
    '/index.html',
    '/app.js',
    '/app.css',
    '/logo.jpg',
    '/manifest.json',
    '/gokulnathp.webp',
    '/favicon.ico'
];

self.addEventListener('install', function (event) {
    console.log('[Service worker] installing....');
    self.skipWaiting();
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then(function (cache) {
                console.log('[Service worker] caching...');
                return cache.addAll(STATIC_REQUESTS);
            })
    );
});

self.addEventListener('activate', function (event) {
    console.log('[Service worker] activating...');
    event.waitUntil(
        caches.keys()
            .then(function (keyList) {
                return Promise.all(keyList.map(function (key) {
                    if (!(key === STATIC_CACHE_NAME || key === DYNAMIC_CACHE_NAME)) {
                        return caches.delete(key);
                    }
                }));
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request).then(function (res) {
                    caches.open(DYNAMIC_CACHE_NAME).then(function (cache) {
                        cache.put(event.request.url, res.clone());
                        return res;
                    });
                });
            }
        })
    );
});