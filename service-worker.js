const CACHE = "ui-energy-exp-v2";

const ASSETS = [
"./",
"./index.html",

// 실험 페이지
"./image-heavy-jpg.html",
"./image-optimized-jpg.html",
"./image-textonly.html",

// 색상 페이지
"./color-black.html",
"./color-blue.html",
"./color-cyan.html",
"./color-green.html",
"./color-magenta.html",
"./color-red.html",
"./color-white.html",
"./color-yellow.html",

// 이미지 리소스
"./assets/heavy.jpg",
"./assets/optimized.jpg",

// 아이콘(설치형 PWA에서 자주 필요)
"./icons/icon-192.png",
"./icons/icon-512.png",

// (있다면) 스타일/스크립트
"./app.js"
];

self.addEventListener("install", (e) => {
e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
self.skipWaiting();
});

self.addEventListener("activate", (e) => {
e.waitUntil(
    (async () => {
    // 이전 캐시 정리(버전 바꿨으니 깔끔하게)
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (k !== CACHE ? caches.delete(k) : null)));
    await self.clients.claim();
    })()
);
});

self.addEventListener("fetch", (e) => {
e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
);
});