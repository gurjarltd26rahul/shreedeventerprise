const cart = JSON.parse(localStorage.getItem('sdeCart') || '[]');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const drawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('overlay');

function saveCart(){localStorage.setItem('sdeCart', JSON.stringify(cart)); renderCart();}
function renderCart(){
  cartCount.textContent = cart.reduce((s,i)=>s+i.qty,0);
  cartItems.innerHTML = cart.length ? cart.map((i,idx)=>`<div class="cart-item"><div><b>${i.name}</b><small>₹${i.price} × ${i.qty}</small></div><button onclick="removeItem(${idx})">Remove</button></div>`).join('') : '<p>Your cart is empty.</p>';
  cartTotal.textContent = '₹' + cart.reduce((s,i)=>s+i.price*i.qty,0);
}
window.removeItem = function(idx){cart.splice(idx,1);saveCart();}
document.querySelectorAll('.add-cart').forEach(btn=>btn.addEventListener('click',()=>{
  const name=btn.dataset.name, price=Number(btn.dataset.price);
  const found=cart.find(i=>i.name===name);
  found ? found.qty++ : cart.push({name,price,qty:1});
  saveCart(); openCart();
}));
function openCart(){drawer.classList.add('open');overlay.classList.add('show');drawer.setAttribute('aria-hidden','false')}
function closeCart(){drawer.classList.remove('open');overlay.classList.remove('show');drawer.setAttribute('aria-hidden','true')}
document.getElementById('cartBtn').addEventListener('click',openCart);
document.getElementById('closeCart').addEventListener('click',closeCart);
overlay.addEventListener('click',closeCart);
document.getElementById('checkoutBtn').addEventListener('click',()=>{
  if(!cart.length){alert('Cart is empty');return;}
  const lines=cart.map(i=>`${i.name} x ${i.qty} = ₹${i.price*i.qty}`).join('%0A');
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  window.open(`https://wa.me/917891097928?text=Hello%20SHREE%20DEV%20ENTERPRISE%2C%20I%20want%20to%20place%20this%20order%3A%0A${lines}%0A%0ATotal%3A%20₹${total}`,'_blank');
});
document.querySelectorAll('.wish').forEach(b=>b.addEventListener('click',()=>{b.classList.toggle('active');b.textContent=b.classList.contains('active')?'♥':'♡'}));
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  document.querySelectorAll('.product-card').forEach(card=>card.style.display=(btn.dataset.filter==='all'||card.dataset.category===btn.dataset.filter)?'block':'none');
}));
document.querySelector('.menu-toggle').addEventListener('click',()=>document.querySelector('.nav').classList.toggle('open'));
renderCart();
