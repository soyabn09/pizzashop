"use strict";

function Reload() {
  location.reload();
}

document.getElementById("Refresh").addEventListener("click", Reload);

var products;
var quantities;
var price;

products = [];
quantities = [];
price = [];

function addCheese() {
  var num1 = document.getElementById("item1quantity").value;
  num1 = parseInt(num1);
  if (num1 <= 0 || num1 >= 101) {
    return;
  } else if (isNaN(num1)) {
    return;
  }
  products.push("Four Cheese");
  quantities.push(parseInt(num1));
  price.push("9.50");
  displayCart();
}
function addPepperoni() {
  var num2 = document.getElementById("item2quantity").value;
  num2 = parseInt(num2);
  if (num2 <= 0 || num2 >= 101) {
    return;
  } else if (isNaN(num2)) {
    return;
  }
  products.push("Pepperoni");
  quantities.push(parseInt(num2));
  price.push("13.00");
  displayCart();
}

function addFishcatch() {
  var num3 = document.getElementById("item3quantity").value;
  num3 = parseInt(num3);
  if (num3 <= 0 || num3 >= 101) {
    return;
  } else if (isNaN(num3)) {
    return;
  }
  products.push("Fish Catch");
  quantities.push(parseInt(num3));
  price.push("12.50");
  displayCart();
}

function addVegeterian() {
  var num4 = document.getElementById("item4quantity").value;
  num4 = parseInt(num4);
  if (num4 <= 0 || num4 >= 101) {
    return;
  } else if (isNaN(num4)) {
    return;
  }
  products.push("Vegeterian");
  quantities.push(parseInt(num4));
  price.push("11.50");
  displayCart();
}

function addCaesarSalad() {
  var num5 = document.getElementById("item5quantity").value;
  num5 = parseInt(num5);
  if (num5 <= 0 || num5 >= 101) {
    return;
  } else if (isNaN(num5)) {
    return;
  }
  products.push("Caesar Salad");
  quantities.push(parseInt(num5));
  price.push("4.95");
  displayCart();
}

function addRusticChips() {
  var num6 = document.getElementById("item6quantity").value;
  num6 = parseInt(num6);
  if (num6 <= 0 || num6 >= 101) {
    return;
  } else if (isNaN(num6)) {
    return;
  }
  products.push("Rustic Chips");
  quantities.push(parseInt(num6));
  price.push("3.95");
  displayCart();
}

function addWildgarlicbread() {
  var num7 = document.getElementById("item7quantity").value;
  num7 = parseInt(num7);
  if (num7 <= 0 || num7 >= 101) {
    return;
  } else if (isNaN(num7)) {
    return;
  }
  products.push("Wild Garlic Bread");
  quantities.push(parseInt(num7));
  price.push("3.75");
  displayCart();
}

function displayCart() {
  var element = document.getElementById("cart");
  element.classList.add("card");
  let cartdata =
    "<table id='cartdata'><tr><th>Product Name</th><th>Quantity</th><th>Price</th><th>Total</th></tr>";
  let total = 0;
  let number = 0;
  for (let i = 0; i < products.length; i++) {
    total += quantities[i] * price[i];
    cartdata +=
      "<tr><td>" +
      products[i] +
      "</td><td>" +
      quantities[i] +
      "</td><td>" +
      price[i] +
      "</td><td>" +
      quantities[i] * price[i] +
      "</td><td><button onclick='delElement(" +
      i +
      ")'>Delete</button></td></tr>";
  }
  cartdata +=
    "<tr><td><b>Total</b></td><td></td><td></td><td>" +
    total.toFixed(2) +
    "</td></tr></table>";
  document.getElementById("cart").innerHTML = cartdata;
}

function delElement(a) {
  if (products.length == 1) {
    var element = document.getElementById("cart");
    var cart = document.getElementById("cartdata");
    cart.remove();
    products = [];
    price = [];
    quantities = [];
    element.classList.remove("card");
    return;
  }
  products.splice(a, 1);
  quantities.splice(a, 1);
  price.splice(a, 1);
  displayCart();
}
