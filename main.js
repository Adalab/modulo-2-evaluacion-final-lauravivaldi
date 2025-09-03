"use strict";
console.log("ready");

const productsList = document.querySelector(".products-list"); // ul
const searchInput = document.querySelector(".header-input"); // input
const searchButton = document.querySelector(".header-button"); // botón del input

let products = [];

// Obtener los datos de la API
const getApiData = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      products = data; // guardamos los productos en el array
      renderProducts(products); // los pintamos en pantalla
    })
    .catch((error) => console.error("Error cargando API:", error)); //sale en la consola si hay error con la Api. 
};
// Start app// ejecuta la función
 getApiData(); 

// Renderizar productos //pintarlos en el Dom. Bucle para iterar el array de productos.crear los <li> y pintarlos 
//con createElement que es un metodo del array. con interpolacion en los li.(datos dinamicos).

const renderProducts = ((list) => {
  productsList.innerHTML = ""; // Limpiar la lista antes de renderizar, es el elemento <ul>

  list.forEach((item) => { //parámetro (list, la lista completa. product es cada uno.
    const li = document.createElement("li"); //la clase va sin punto desde este método.
    li.classList.add("product-item");//

    li.innerHTML = ` 
      <div class="product-card">
      <img class="product-image" src="${item.image || "https://placehold.co/600x400"}" alt="${item.title}">
      <p class="product-name">${item.title}</p>
      <p class="product-price">€${item.price.toFixed(2)}</p>
      <p class="product-description">${item.description}</p>
      <button class="product-button">COMPRAR</button> 
      <div>
    `;

    const buttonCardProduct = li.querySelector(".product-button");
    buttonCardProduct.addEventListener("click", () => addToCart(item));

    productsList.appendChild(li);
  });
});

const cartShopCart = document.querySelector(".shop-cart-list");

const addToCart = ((product) => {
  const li = document.createElement("li"); //son clases dentro de la funcion.
  li.classList.add("cart-item");

  li.innerHTML = `
    <div class="cart-card">
      <img src="${product.image}" alt="${product.title}" class="cart-image"/>
      <div>
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
  }); 

  cartShopCart.appendChild(li);
});

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












