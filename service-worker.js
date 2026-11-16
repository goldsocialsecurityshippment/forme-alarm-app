const CACHE_NAME = "forme-routine-v2";
const APP_FILES = ["./", "./index.html", "./manifest.json", "./icon.svg"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match("./index.html"))));
});
self.addEventListener("push", event => {
  let data = { title: "FORME Routine", body: "It's time for your next activity." };
  try { if (event.data) data = { ...data, ...event.data.json() }; } catch (_) {
    if (event.data) data.body = event.data.text();
  }
  event.waitUntil(self.registration.showNotification(data.title, {
    body: data.body, icon: "./icon.svg", badge: "./icon.svg",
    tag: data.tag || "forme-push", data: { url: data.url || "./" }
  }));
});
self.addEventListener("notificationclick", event => {
  event.notification.close();
  const target = new URL(event.notification.data?.url || "./", self.location.origin).href;
  event.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const client of list) if (client.url.startsWith(self.location.origin) && "focus" in client) return client.focus();
    if (self.clients.openWindow) return self.clients.openWindow(target);
  }));
});
