console.log("ready");const r=document.querySelector(".products-list"),d=document.querySelector(".header-input"),l=document.querySelector(".header-button"),i=document.querySelector(".shop-cart-list");let n=[];const u=()=>{fetch("https://fakestoreapi.com/products").then(e=>e.json()).then(e=>{n=e,a(n)}).catch(e=>console.error("Error cargando API:",e))};u();const a=e=>{r.innerHTML="",e.forEach(t=>{const c=document.createElement("li");c.classList.add("product-item"),c.dataset.id=t.id,c.innerHTML=`
      <div class="product-cart">
        <img class="product-image" src="${t.image||"https://placehold.co/600x400"}" alt="${t.title}">
        <p class="product-name">${t.title}</p>
        <p class="product-price">€${t.price.toFixed(2)}</p>
        <p class="product-description">${t.description}</p>
        <button class="product-button">BUY NOW</button>
      </div>
    `;const o=c.querySelector(".product-button");o.addEventListener("click",()=>{o.classList.toggle("in-cart")?(o.textContent="REMOVE",p(t)):(o.textContent="BUY NOW",m(t))}),r.appendChild(c)})},p=e=>{const t=document.createElement("li");t.classList.add("cart-item"),t.dataset.id=e.id,t.innerHTML=`
    <div class="cart-card">
      <img src="${e.image}" alt="${e.title}" class="cart-image"/>
          <div class="cart-info">
            <p class="cart-name">${e.title}</p>
            <p class="cart-price">€${e.price.toFixed(2)}</p>
          </div>
        <button class="delete-cart-button">REMOVE</button>
    </div>
  `,t.querySelector(".delete-cart-button").addEventListener("click",()=>{t.remove();const o=r.querySelector(`.product-item[data-id="${e.id}"]`);if(o){const s=o.querySelector(".product-button");s.classList.remove("in-cart"),s.textContent="BUY NOW"}}),i.appendChild(t)},m=e=>{const t=i.querySelector(`.cart-item[data-id="${e.id}"]`);t&&t.remove();const c=r.querySelector(`.product-item[data-id="${e.id}"]`);if(c){const o=c.querySelector(".product-button");o.classList.remove("in-cart"),o.textContent="BUY NOW"}},h=document.querySelector(".delete-button");h.addEventListener("click",()=>{i.innerHTML="",r.querySelectorAll(".product-button").forEach(t=>{t.classList.remove("in-cart"),t.textContent="BUY NOW"})});const C=()=>{const e=d.value.toLowerCase();if(e===""){a(n);return}const t=n.filter(c=>c.title.toLowerCase().includes(e));a(t)};l.addEventListener("click",C);
//# sourceMappingURL=main.js.map
