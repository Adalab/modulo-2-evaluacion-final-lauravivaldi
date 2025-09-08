"use strict";
console.log("ready");

const productsList = document.querySelector(".products-list"); // ul
const searchInput = document.querySelector(".header-input"); // input
const searchButton = document.querySelector(".header-button"); // botón del input
const cartShopCart = document.querySelector(".shop-cart-list");//ul del carrito shop

let products = [];

const getApiData = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      products = data;
      renderProducts(products);
    })
    .catch((error) => console.error("Error cargando API:", error));
};
getApiData();


const renderProducts = (list) => {
  productsList.innerHTML = "";

  list.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("product-item");
    li.dataset.id = item.id;

    li.innerHTML = `
      <div class="product-cart">
        <img class="product-image" src="${item.image || "https://placehold.co/600x400"}" alt="${item.title}">
        <p class="product-name">${item.title}</p>
        <p class="product-price">€${item.price.toFixed(2)}</p>
        <p class="product-description">${item.description}</p>
        <button class="product-button">BUY NOW</button>
      </div>
    `;

    const buttonCartProduct = li.querySelector(".product-button");

    buttonCartProduct.addEventListener("click", () => {
      const inCartNow = buttonCartProduct.classList.toggle("in-cart");

      if (inCartNow) {
        buttonCartProduct.textContent = "REMOVE";
        addToCart(item);
      } else {
        buttonCartProduct.textContent = "BUY NOW";
        removeFromCart(item);
      }
    });

    productsList.appendChild(li);
  });
};


const addToCart = (product) => {
  const li = document.createElement("li");
  li.classList.add("cart-item");
  li.dataset.id = product.id;

  li.innerHTML = `
    <div class="cart-card">
      <img src="${product.image}" alt="${product.title}" class="cart-image"/>
          <div class="cart-info">
            <p class="cart-name">${product.title}</p>
            <p class="cart-price">€${product.price.toFixed(2)}</p>
          </div>
        <button class="delete-cart-button">REMOVE</button>
    </div>
  `;

  const deleteCartButton = li.querySelector(".delete-cart-button");
  deleteCartButton.addEventListener("click", () => {
    li.remove();


    const liProduct = productsList.querySelector(`.product-item[data-id="${product.id}"]`);
    if (liProduct) {
      const btn = liProduct.querySelector(".product-button");
      btn.classList.remove("in-cart");
      btn.textContent = "BUY NOW";
    }
  });

  cartShopCart.appendChild(li);
};

const removeFromCart = (product) => {
  const liCart = cartShopCart.querySelector(`.cart-item[data-id="${product.id}"]`);
  if (liCart) liCart.remove();

  const liProduct = productsList.querySelector(`.product-item[data-id="${product.id}"]`);
  if (liProduct) {
    const btn = liProduct.querySelector(".product-button");
    btn.classList.remove("in-cart");
    btn.textContent = "BUY NOW";
  }
}; 


const deleteButton = document.querySelector(".delete-button");

deleteButton.addEventListener("click", () => {
  cartShopCart.innerHTML = "";   //ul
  const allButtons = productsList.querySelectorAll(".product-button");
  allButtons.forEach((btn) => {
    btn.classList.remove("in-cart");
    btn.textContent = "BUY NOW";
  });
});


const searchProducts = () => {
  const inputValue = searchInput.value.toLowerCase();
  if (inputValue === "") {
    renderProducts(products);
    return;
  }
  const filtered = products.filter((item) =>
    item.title.toLowerCase().includes(inputValue)
  );
  renderProducts(filtered);
}

searchButton.addEventListener("click", searchProducts);  














