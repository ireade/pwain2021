import * as navigationPreload from 'workbox-navigation-preload';
import {registerRoute, NavigationRoute} from 'workbox-routing';
import {NetworkOnly, StaleWhileRevalidate} from 'workbox-strategies';

const CACHE_OFFLINE_PAGE = 'offline-html';
const FALLBACK_HTML_URL = '/offline.html';

self.addEventListener('install', async (event) => {

    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_OFFLINE_PAGE)
            .then((cache) => cache.add(FALLBACK_HTML_URL))
    );
});

navigationPreload.enable();

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

self.addEventListener('activate', event => {

});

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
