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

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(cacheStaticRequests());
});

self.addEventListener('activate', (event) => {
    event.waitUntil(cleanUpCaches());
});

self.addEventListener('fetch', (event) => {
    event.respondWith(staleWhileRevalidate(event));
});

const cacheStaticRequests = () => {
    return caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll(STATIC_REQUESTS);
    });
};

const cleanUpCaches = () => {
    return caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
            if (!(key === STATIC_CACHE_NAME || key === DYNAMIC_CACHE_NAME)) {
                return caches.delete(key);
            }
        }));
    });
};

const staleWhileRevalidate = (event) => {
    return staleWhileRevalidateFromStaticCache(event)
        .then((staticResponse) => {
            if (staticResponse) {
                return staticResponse;
            }
            return staleWhileRevalidateFromDynamicCache(event);
        });
};

const staleWhileRevalidateFromStaticCache = (event) => {
    return caches.open(STATIC_CACHE_NAME).then((staticCache) => {
        return staticCache.match(event.request).then((staticResponse) => {
            if (staticResponse) {
                fetch(event.request).then((networkResponse) => {
                    staticCache.put(event.request.url, networkResponse.clone());
                })
                return staticResponse;
            }
            return undefined;
        });
    });
};

const staleWhileRevalidateFromDynamicCache = (event) => {
    return caches.open(DYNAMIC_CACHE_NAME).then((dynamicCache) => {
        return dynamicCache.match(event.request).then((dynamicResponse) => {
            if (dynamicResponse) {
                fetch(event.request).then((networkResponse) => {
                    dynamicCache.put(event.request, networkResponse.clone());
                });
                return dynamicResponse;
            }
            return fetch(event.request).then((networkResponse) => {
                dynamicCache.put(event.request, networkResponse.clone());
                return networkResponse;
            });
        });
    });
};