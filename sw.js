const CACHE_NAME = 'tarot-app-v1';
const urlsToCache = [
    './',
    './index.html',
    './tarot-data.js',
    './app.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

// Service Worker インストール
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('キャッシュを開きました');
                return cache.addAll(urlsToCache);
            })
    );
});

// キャッシュからレスポンスを返す
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // キャッシュにあれば返す
                if (response) {
                    return response;
                }

                // ネットワークから取得
                return fetch(event.request);
            }
            )
    );
});

// 古いキャッシュを削除
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('古いキャッシュを削除:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
}); 