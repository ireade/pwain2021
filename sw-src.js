import * as navigationPreload from 'workbox-navigation-preload';
import {registerRoute, NavigationRoute} from 'workbox-routing';
import {NetworkOnly, StaleWhileRevalidate} from 'workbox-strategies';

const CACHE_OFFLINE_PAGE = 'offline-html';
const FALLBACK_HTML_URL = '/offline.html';

console.log("hello from swc")


// Install & Activate -----------------------------------------------

self.addEventListener('install', async (event) => {

    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_OFFLINE_PAGE)
            .then((cache) => cache.add(FALLBACK_HTML_URL))
    );
});

self.addEventListener('activate', event => {

});

navigationPreload.enable();

// Offline Page -----------------------------------------------

const networkOnly = new NetworkOnly();

const navigationHandler = async (params) => {
    try {
        return await networkOnly.handle(params);
    } catch (error) {
        return caches.match(FALLBACK_HTML_URL, {
            cacheName: CACHE_OFFLINE_PAGE,
        });
    }
};

registerRoute(
    new NavigationRoute(navigationHandler)
);


// Cache Static Assets -----------------------------------------------

registerRoute(
    ({request}) => request.destination === 'script' || request.destination === 'style',
    new StaleWhileRevalidate({
        cacheName: 'static-resources',
    })
);

registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
    new StaleWhileRevalidate({
        cacheName: 'google-fonts',
    }),
);

// Fetch, Push, Sync -----------------------------------------------

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
    );
});

self.addEventListener('push', event => {
    event.waitUntil(
        self.registration.showNotification(
            'Hello from PWA in 2021!',
            { body: 'How are you doing?', icon: '/images/icon-256.png' }
        )
    );
});

self.addEventListener('sync', event => {
    if (event.tag == 'do-background-sync') {
        event.waitUntil(
            self.registration.showNotification(
                'Background Sync',
                { body: 'The background sync task has been activated', icon: '/images/icon-256.png' }
            )
        );
    }
});

self.addEventListener('periodicsync', event => {
    if (event.tag == 'do-periodic-sync') {
        event.waitUntil(
            self.registration.showNotification(
                'Periodic Background Sync',
                { body: 'The periodic background sync task has been activated', icon: '/images/icon-256.png' }
            )
        );
    }
});