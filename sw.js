const CACHE_VERSION = 'lvos-v2';
const STATIC_CACHE = 'lvos-static-' + CACHE_VERSION;
const PAGE_CACHE = 'lvos-pages-' + CACHE_VERSION;

const precacheUrls = [
	'./',
	'./index.html',
	'./mobile.html',
	'./manifest.json',
	'./manifest-mobile.json',
	'./icon-192.png',
	'./icon-512.png',
	'./desktop.dist.js',
	'./mobile.dist.js'
];

function isStaticAsset(url) {
	return url.pathname.includes('/Styles/') ||
		url.pathname.includes('/Applications/') ||
		url.pathname.includes('/Assets/') ||
		/.(css|js|mjs|json|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|otf|mp3|ogg|wav|mp4|webm)(\?.*)?$/i.test(url.pathname);
}

self.addEventListener('install', function (event) {
	event.waitUntil(caches.open(STATIC_CACHE).then(function (cache) {
		return Promise.allSettled(precacheUrls.map(function (url) {
			return cache.add(url);
		}));
	}));
	self.skipWaiting();
});

self.addEventListener('activate', function (event) {
	event.waitUntil(caches.keys().then(function (keys) {
		return Promise.all(keys.filter(function (key) {
			return key !== STATIC_CACHE && key !== PAGE_CACHE;
		}).map(function (key) {
			return caches.delete(key);
		}));
	}));
	self.clients.claim();
});

self.addEventListener('fetch', function (event) {
	var request = event.request;
	if (request.method !== 'GET') return;
	var url = new URL(request.url);
	if (url.origin !== self.location.origin) return;
	if (request.mode === 'navigate') {
		event.respondWith(fetch(request).catch(function () {
			return caches.match(request).then(function (cached) {
				return cached || caches.match('./index.html');
			});
		}));
		return;
	}
	if (isStaticAsset(url)) {
		event.respondWith(fetch(request)
			.then(function (response) {
				var clone = response.clone();
				caches.open(STATIC_CACHE).then(function (cache) { cache.put(request, clone); });
				return response;
			})
			.catch(function () {
				return caches.match(request);
			}));
	}
});
