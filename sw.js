const CACHE_VERSION = 'lvos-v3';
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

const staticRoutePatterns = [
	'/Styles/*',
	'/Scripts/*',
	'/Assets/*',
	'/Applications/*',
	'/**/*.css',
	'/**/*.js',
	'/**/*.mjs',
	'/**/*.json',
	'/**/*.png',
	'/**/*.jpg',
	'/**/*.jpeg',
	'/**/*.gif',
	'/**/*.svg',
	'/**/*.webp',
	'/**/*.avif',
	'/**/*.ico',
	'/**/*.woff',
	'/**/*.woff2',
	'/**/*.ttf',
	'/**/*.otf',
	'/**/*.mp3',
	'/**/*.ogg',
	'/**/*.wav',
	'/**/*.mp4',
	'/**/*.webm'
];

function isStaticAsset(url) {
	return url.pathname.includes('/Styles/') ||
		url.pathname.includes('/Applications/') ||
		url.pathname.includes('/Assets/') ||
		/.(css|js|mjs|json|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|otf|mp3|ogg|wav|mp4|webm)(\?.*)?$/i.test(url.pathname);
}

async function networkFirst(request, preload) {
	var cache = await caches.open(PAGE_CACHE);
	try {
		var response = null;
		if (preload) {
			try { response = await preload; } catch (error) {}
		}
		if (!response) response = await fetch(request);
		if (response.ok) {
			await cache.put(request, response.clone());
		}
		return response;
	} catch (error) {
		return await caches.match(request) || await caches.match('./index.html') || Response.error();
	}
}

self.addEventListener('install', function (event) {
	event.waitUntil(caches.open(STATIC_CACHE).then(function (cache) {
		return Promise.allSettled(precacheUrls.map(function (url) {
			return cache.add(url);
		}));
	}));
	if (typeof event.addRoutes === 'function') {
		event.waitUntil(event.addRoutes(staticRoutePatterns.map(function (pattern) {
			return {
				condition: {
					urlPattern: pattern,
					requestMethod: 'get',
					runningStatus: 'not-running'
				},
				source: { cacheName: STATIC_CACHE }
			};
		})).catch(function (error) {
			console.warn('Static route registration failed:', error);
		}));
	}
	self.skipWaiting();
});

self.addEventListener('activate', function (event) {
	event.waitUntil((async function () {
		var preload = self.registration.navigationPreload;
		if (preload && typeof preload.enable === 'function') {
			try { await preload.enable(); }
			catch (error) { console.warn('Navigation preload enable failed:', error); }
		}
		await caches.keys().then(function (keys) {
			return Promise.all(keys.filter(function (key) {
				return key !== STATIC_CACHE && key !== PAGE_CACHE;
			}).map(function (key) {
				return caches.delete(key);
			}));
		});
		await self.clients.claim();
	})());
});

self.addEventListener('fetch', function (event) {
	var request = event.request;
	if (request.method !== 'GET') return;
	var url = new URL(request.url);
	if (url.origin !== self.location.origin) return;
	if (request.mode === 'navigate') {
		event.respondWith(networkFirst(request, event.preloadResponse));
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
