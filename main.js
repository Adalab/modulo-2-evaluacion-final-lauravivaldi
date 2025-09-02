"use strict";
console.log("ready");



const productsList = document.querySelector(".products-list");//ul

//crear el array

let products =[];

//obtener los datos de la api

const getApiData = ()=>{
  fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => console.log(data));

};

//start app

getApiData();

  



