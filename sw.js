self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
 e.respondWith(fetch(e.request).catch(()=>new Response('Internet nahi hai. Dobara koshish karein.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})))});
