const sb=supabase.createClient(CFG.URL,CFG.KEY);
const $=s=>document.querySelector(s);
const rs=n=>'Rs '+Number(n).toLocaleString();
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const cart=()=>JSON.parse(localStorage.cart||'[]');
const save=c=>{localStorage.cart=JSON.stringify(c);badge()};
function badge(){const b=$('#cb');if(b)b.textContent=cart().reduce((a,i)=>a+i.q,0)}
function head(){
 document.head.insertAdjacentHTML('beforeend','<link rel="stylesheet" href="theme.css?v=2">');
 document.body.insertAdjacentHTML('afterbegin','<header class="top"><a href="index.html" class="brand">🛍️ '+esc(CFG.STORE)+'</a><a href="cart.html" class="cartl">🛒<b id="cb">0</b></a></header>');
 document.body.insertAdjacentHTML('beforeend','<footer class="ft"><b>'+esc(CFG.STORE)+'</b><p>Cash on Delivery · Pakistan bhar mein delivery</p></footer>'+(CFG.WA?'<a class="wafab" href="https://wa.me/'+esc(CFG.WA)+'" target="_blank" aria-label="WhatsApp">💬</a>':''));
 badge()}
