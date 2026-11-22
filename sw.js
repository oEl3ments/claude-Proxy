importScripts("/uv/uv.bundle.js");
importScripts("/uv/uv.config.js");
importScripts(__uv$config.sw);

const uv = new UVServiceWorker();

async function handle(event) {
  if (uv.route(event)) return await uv.fetch(event);
  return await fetch(event.request);
}
self.addEventListener("fetch", (event) => event.respondWith(handle(event)));
