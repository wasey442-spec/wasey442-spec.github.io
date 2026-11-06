const sb=supabase.createClient(CFG.URL,CFG.KEY);
const $=s=>document.querySelector(s);
const rs=n=>'Rs '+Number(n).toLocaleString();
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const cart=()=>JSON.parse(localStorage.cart||'[]');
const save=c=>{localStorage.cart=JSON.stringify(c);badge()};
function badge(){const b=$('#cb');if(b)b.textContent=cart().reduce((a,i)=>a+i.q,0)}
function head(){document.body.insertAdjacentHTML('afterbegin',`<header><a href="index.html">${esc(CFG.STORE)}</a><a href="cart.html" class="cartl">🛒<b id="cb">0</b></a></header>`);badge()}
