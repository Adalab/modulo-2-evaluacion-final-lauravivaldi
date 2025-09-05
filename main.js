 
"use strict";
console.log("ready");

const productsList = document.querySelector(".products-list"); // ul
const searchInput = document.querySelector(".header-input"); // input
const searchButton = document.querySelector(".header-button"); // botón del input
const cartShopCart = document.querySelector(".shop-cart-list");//ul del carrito shop

let products = [];

// Obtener los datos de la API
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

// Función para pintar los productos en el DOM
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
        <button class="product-button">COMPRAR</button>
      </div>
    `;

    const buttonCartProduct = li.querySelector(".product-button");

    buttonCartProduct.addEventListener("click", () => {
      const inCartNow = buttonCartProduct.classList.toggle("in-cart");

      if (inCartNow) {
        buttonCartProduct.textContent = "ELIMINAR";
        addToCart(item);
      } else {
        buttonCartProduct.textContent = "COMPRAR";
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
        <button class="delete-cart-button">ELIMINAR</button>
    </div>
  `;

  const deleteCartButton = li.querySelector(".delete-cart-button");
  deleteCartButton.addEventListener("click", () => {
    li.remove();

    // Resetear el botón en la lista principal
    const liProduct = productsList.querySelector(`.product-item[data-id="${product.id}"]`);
    if (liProduct) {
      const btn = liProduct.querySelector(".product-button");
      btn.classList.remove("in-cart");
      btn.textContent = "COMPRAR";
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
    btn.textContent = "COMPRAR";
  }
}; 


//////////////////////////////////////////////////////////////////////////////////////////////////////

//este es el boton general que elimina todo los productos del carrito
const deleteButton = document.querySelector(".delete-button");

deleteButton.addEventListener("click", () => {
  cartShopCart.innerHTML = ""; //ul
});


// Filtrar productos por búsqueda
function searchProducts() {
  const inputValue = searchInput.value.toLowerCase();
  const filtered = products.filter((item) =>
    item.title.toLowerCase().includes(inputValue)
  );
  renderProducts(filtered);
}

// Eventos
searchButton.addEventListener("click", searchProducts); 












