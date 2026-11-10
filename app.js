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
function soc(){const L=[['FB','Facebook','📘'],['INSTA','Instagram','📸'],['TIKTOK','TikTok','🎵']].filter(x=>CFG[x[0]]).map(x=>'<a href="'+esc(CFG[x[0]])+'" target="_blank" rel="noopener">'+x[2]+' '+x[1]+'</a>');return L.length?'<p class="soc">'+L.join(' ')+'</p>':''}
function head(){
 document.head.insertAdjacentHTML('beforeend','<link rel="stylesheet" href="theme.css?v=4">');
 if(CFG.GA){const s=document.createElement('script');s.async=1;s.src='https://www.googletagmanager.com/gtag/js?id='+CFG.GA;document.head.appendChild(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',CFG.GA)}
 if(CFG.PIXEL){(function(f,b,e,v){if(f.fbq)return;var n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];var t=b.createElement(e);t.async=!0;t.src=v;var s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)})(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',CFG.PIXEL);fbq('track','PageView')}
 document.body.insertAdjacentHTML('afterbegin','<header class="top"><a href="index.html" class="brand">🛍️ '+esc(CFG.STORE)+'</a><a href="cart.html" class="cartl">🛒<b id="cb">0</b></a></header>');
 document.body.insertAdjacentHTML('beforeend','<footer class="ft"><b id="fb">'+esc(CFG.STORE)+'</b><p><a href="info.html?p=about">Hamare baare mein</a> · <a href="info.html?p=delivery">Delivery</a> · <a href="info.html?p=return">Return Policy</a> · <a href="info.html?p=faq">FAQ</a> · <a href="info.html?p=contact">Rabta</a> · <a href="track.html">📍 Order Track</a></p><p>Cash on Delivery · Pakistan bhar mein delivery</p>'+soc()+'</footer><button class="up" id="up" aria-label="Upar" onclick="window.scrollTo({top:0,behavior:\'smooth\'})">↑</button>'+(CFG.WA?'<a class="wafab" href="https://wa.me/'+esc(CFG.WA)+'" target="_blank" aria-label="WhatsApp">💬</a>':''));
 badge();
 addEventListener('scroll',()=>{const u=$('#up');if(u)u.classList.toggle('show',scrollY>500)},{passive:true});
 let tc=0;$('#fb').onclick=()=>{tc++;setTimeout(()=>tc=0,2500);if(tc>=5)location='panel.html'};
 Promise.resolve(sb.from('settings').select('*')).then(r=>{const S={};(r.data||[]).forEach(x=>S[x.k]=x.v);if(S.announce)document.body.insertAdjacentHTML('afterbegin','<div class="ann">'+esc(S.announce)+'</div>');if(window.onS)window.onS(S)}).catch(()=>{})}
if(!document.querySelector('link[rel=manifest]'))document.head.insertAdjacentHTML('beforeend','<link rel="manifest" href="manifest.json"><link rel="apple-touch-icon" href="icon-192.png">');
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
let dip;addEventListener('beforeinstallprompt',e=>{e.preventDefault();dip=e;if($('#ib'))return;const adm=/panel/.test(location.pathname),h=document.querySelector('header.top')||$('#app');if(h)h.insertAdjacentHTML(adm?'beforebegin':'afterend','<div class="instb" id="ib"><span>'+(adm?'📲 Admin panel ko app ki tarah rakhein':'📲 Store ko phone mein app ki tarah rakhein')+'</span><button onclick="dip.prompt();$(\'#ib\').remove()">Install</button><i onclick="$(\'#ib\').remove()">✕</i></div>')});
addEventListener('appinstalled',()=>{const b=$('#ib');if(b)b.remove()});

const SRC=window.SpeechRecognition||window.webkitSpeechRecognition;
function voice(o){
 if(!SRC){alert('Is browser mein awaaz se likhna nahi chalta.\nKeyboard ke 🎤 (Gboard) se bol kar likh sakte hain.');return null}
 const st={got:false,err:false,retry:false,r:null,tried:[]};
 const go=lg=>{st.tried.push(lg);st.got=st.err=st.retry=false;
  const r=new SRC();st.r=r;r.lang=lg;r.interimResults=true;r.continuous=false;r.maxAlternatives=1;
  r.onresult=e=>{let t='',fin=false;for(let i=e.resultIndex;i<e.results.length;i++){t+=e.results[i][0].transcript;if(e.results[i].isFinal)fin=true}st.got=true;if(fin)o.onFinal(t.trim());else if(o.onInterim)o.onInterim(t.trim())};
  r.onerror=e=>{const c=e.error;if(c=='aborted')return;st.err=true;
   if(c=='language-not-supported'&&!st.tried.includes('en-IN')){st.retry=true;alert('Is phone par Urdu awaaz nahi chali, ab English mein sun raha hoon.\nRoman Urdu alfaaz (ring, wallet, jootay) English lehje mein bolein.');setTimeout(()=>go('en-IN'),300);return}
   const M={'not-allowed':'Mic ki ijazat nahi mili.\nChrome ke ⋮ menu mein Settings > Site settings > Microphone mein is website ko Allow karein.','service-not-allowed':'Is phone mein awaaz pehchanne ki service band hai.\nKeyboard ke 🎤 (Gboard) se bol kar likhein.','network':'Internet check karein (awaaz pehchanne ke liye internet zaroori hai).','audio-capture':'Mic nahi mila ya kisi aur app mein istemal ho raha hai.','no-speech':'Awaaz sunai nahi di. Mic ke qareeb bolein aur dobara koshish karein.'};
   alert(M[c]||('Awaaz ka masla: '+c+'.\nKeyboard ke 🎤 (Gboard) se bol kar likhein.'))};
  r.onend=()=>{if(st.retry)return;if(!st.got&&!st.err)alert('Kuch likha nahi gaya.\nEN dabakar English mein try karein, ya keyboard ke 🎤 se bolein.');if(o.onEnd)o.onEnd()};
  try{r.start()}catch(x){alert('Mic shuru nahi hua: '+x.message);if(o.onEnd)o.onEnd()}};
 go(o.lang||'ur-PK');return{stop:()=>{try{st.r.stop()}catch(e){}}}}
