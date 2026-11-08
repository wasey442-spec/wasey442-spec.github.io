const sb=supabase.createClient(CFG.URL,CFG.KEY);
const $=s=>document.querySelector(s);
const rs=n=>'Rs '+Number(n).toLocaleString();
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const cart=()=>JSON.parse(localStorage.cart||'[]');
const save=c=>{localStorage.cart=JSON.stringify(c);badge()};
const wish=()=>JSON.parse(localStorage.wish||'[]');
const tw=id=>{let w=wish();w=w.includes(id)?w.filter(x=>x!=id):[...w,id];localStorage.wish=JSON.stringify(w);return w.includes(id)};
function badge(){const b=$('#cb');if(b)b.textContent=cart().reduce((a,i)=>a+i.q,0)}
function ev(n,d){try{window.fbq&&fbq('track',n,d);window.gtag&&gtag('event',n,d)}catch(e){}}
function head(){
 document.head.insertAdjacentHTML('beforeend','<link rel="stylesheet" href="theme.css?v=4">');
 if(CFG.GA){const s=document.createElement('script');s.async=1;s.src='https://www.googletagmanager.com/gtag/js?id='+CFG.GA;document.head.appendChild(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',CFG.GA)}
 if(CFG.PIXEL){(function(f,b,e,v){if(f.fbq)return;var n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];var t=b.createElement(e);t.async=!0;t.src=v;var s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)})(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',CFG.PIXEL);fbq('track','PageView')}
 document.body.insertAdjacentHTML('afterbegin','<header class="top"><a href="index.html" class="brand">🛍️ '+esc(CFG.STORE)+'</a><a href="cart.html" class="cartl">🛒<b id="cb">0</b></a></header>');
 document.body.insertAdjacentHTML('beforeend','<footer class="ft"><b>'+esc(CFG.STORE)+'</b><p><a href="info.html?p=about">Hamare baare mein</a> · <a href="info.html?p=delivery">Delivery</a> · <a href="info.html?p=return">Return Policy</a> · <a href="info.html?p=contact">Rabta</a> · <a href="track.html">📍 Order Track</a></p><p>Cash on Delivery · Pakistan bhar mein delivery</p></footer>'+(CFG.WA?'<a class="wafab" href="https://wa.me/'+esc(CFG.WA)+'" target="_blank" aria-label="WhatsApp">💬</a>':''));
 badge();
 Promise.resolve(sb.from('settings').select('*')).then(r=>{const S={};(r.data||[]).forEach(x=>S[x.k]=x.v);if(S.announce)document.body.insertAdjacentHTML('afterbegin','<div class="ann">'+esc(S.announce)+'</div>');if(window.onS)window.onS(S)}).catch(()=>{})}
if(!document.querySelector('link[rel=manifest]'))document.head.insertAdjacentHTML('beforeend','<link rel="manifest" href="manifest.json"><link rel="apple-touch-icon" href="icon-192.png">');
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
let dip;addEventListener('beforeinstallprompt',e=>{e.preventDefault();dip=e;const h=document.querySelector('header.top');if(h&&!$('#ib'))h.insertAdjacentHTML('afterend','<div class="instb" id="ib"><span>📲 Store ko phone mein app ki tarah rakhein</span><button onclick="dip.prompt();$(\'#ib\').remove()">Install</button><i onclick="$(\'#ib\').remove()">✕</i></div>')});
addEventListener('appinstalled',()=>{const b=$('#ib');if(b)b.remove()});
