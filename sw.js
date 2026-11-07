const CACHE = 'fab-e12e6cc3aa3f';
const PRECACHE = ["./","./index.html","./manifest.webmanifest","./icon.svg","./assets/index-C40hvBdv.css","./assets/three-bgh7UvrC.js","./assets/index-Dw7IjA_r.js","./assets/fabPlay-rXPg203X.js"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('fab-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    // 문서는 네트워크 우선 → 실패 시 캐시된 앱 셸
    e.respondWith(fetch(req).catch(() => caches.match('./index.html', { ignoreSearch: true })));
    return;
  }
  // 해시된 정적 자산은 캐시 우선
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
    return res;
  })));
});
