const CACHE_VERSION = "itqan-20261012-1";
const SHELL = ["./", "./index.html", "./special.html", "./config.js?v=20261012-1", "./itqan-addon.js?v=20261012-1", "./itqan-curriculum.js?v=20261012-1", "./itqan-v3.js?v=20261012-1", "./special-addon.js?v=20261012-1", "./special-letters.js?v=6", "./special-math.js?v=6"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE_VERSION).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request).then(response => response || caches.match("./index.html"))));
});
