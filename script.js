//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || 
window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || 
window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
window.msIDBKeyRange

if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}else{
  console.log('IndexedDb supporter')
}
var products = [
  {name: "Wonder Woman Figurine", price: "12", image: "https://s3.amazonaws.com/mernbook/marketplace/wonder-woman-2977918_960_720.jpg"},
  {name: "Darth Vader Figurine", price: "19", image: "https://s3.amazonaws.com/mernbook/marketplace/star-wars-2463926_960_720.png"},
  {name: "Joker Figurine", price: "51", image: "https://s3.amazonaws.com/mernbook/marketplace/joker-1225051_960_720.jpg"},
  {name: "Tardis Figurine", price: "14", image: "https://s3.amazonaws.com/mernbook/marketplace/tardis.png"},
  {name: "Old Ford Car Model", price: "46", image: "https://s3.amazonaws.com/mernbook/marketplace/Ford.jpg"},
  {name: "Storm Trooper Figurine", price: "23", image: "https://s3.amazonaws.com/mernbook/marketplace/stormtrooper-1995015_960_720.jpg"}
];
var cart = {
  items: [],
  total: 0
};

var cart_length=0
var db;
var request = window.indexedDB.open("Cart", 1);
 
request.onerror = function(event) {
  console.log("error: ");
};
 
request.onsuccess = function(event) {
  db = request.result;
  console.log("success: "+ db);
};
 
request.onupgradeneeded = function(event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("cart_product", {keyPath:"name"});
        for (var i in cart.items) {
                objectStore.add(cart.items[i]);      
        }
}

$(document).ready(function(){
  //console.log("Start here");
  // Basic tasks
  // 1. Show / hide cart section on button click (Cart button / close cutton)
  // 2. Dynamically load products to view
  loadProduct()
  // 3. Dynamically show total items in Cart
  // 4. Add to cart button functionality
  // 5. Dynamically load cart items
  // 6. Implement quantity update for each cart item and update total cost dynamically.
  // 7. Store and load cart from localStorage
});

function loadProduct(){
  products.forEach(function(item){
      //create column
  var col = document.createElement('div');
  col.setAttribute('class','col-md-4');
  //create card
  var card = document.createElement('div');
  card.setAttribute('class','card');
  //create image
  var img = document.createElement('img');
  img.setAttribute('class','card-img-top');
  img.src= item.image;
  img.alt = item.name
  //create card body
  var card_body = document.createElement('div')
  card_body.setAttribute('class','card-body')
  //create h5
  var card_title = document.createElement('h5')
  card_title.setAttribute('class','card-title')
  card_title.textContent = item.name
  //create paragraph
  var par = document.createElement('p')
  par.setAttribute('class','card-text')
  par.textContent = '$ '+item.price
  //create button
  var but = document.createElement('button')
  but.setAttribute('class','btn btn-primary')
  but.setAttribute('onclick','addToCart(event)')
  but.id = item.name
  but.name = item.name
  but.textContent = 'Add to Cart'
  card_body.append(card_title)
  card_body.append(par)
  card_body.append(but)

  card.append(img);
  card.append(card_body)
  col.append(card),
  $('#productRow').append(col);
  })
}
function showCart(){
  init()
}
function showProduct(){
  $('#products').css('display','block')
  $('#cart').css('display','none')
}
function addToCart(event){
  var element = event.target
   product_name = products.map(function(proName){
     return proName.name;
   })
  //find the product index 
  var productIndex = product_name.indexOf(element.name)
  //write to database
  add(products[productIndex])
}
function loadCart(items){
  items.forEach(function(item){
      //create column
  var col = document.createElement('div')
  col.setAttribute('class','col-md-4')
  //create card
  var card = document.createElement('div')
  card.setAttribute('class','card')
  //create img
  var img = document.createElement('img')
  img.setAttribute('class','card-img-top')
  img.src = item.image
  //create card-body
  var card_body = document.createElement('div')
  card_body.setAttribute('class','card-body')
    //create card-title
    var card_title = document.createElement('h5')
    card_title.setAttribute('class','card-title')
    card_title.textContent = item.name
    //create p
    var par = document.createElement('p')
    par.setAttribute('class','card-text')
    par.textContent = '$ '+item.price
      //create input
      var card_in = document.createElement('input')
      card_in.type = 'number'
      card_in.min = 0
    par.append(card_in)
  card_body.append(card_title)
  card_body.append(par)
  card.append(img)
  card.append(card_body)
  col.append(card)  
  $('#cartRow').append(col)
  })
}
function add(cart_item) {
  var request = db.transaction(["cart_product"], "readwrite")
          .objectStore("cart_product")
          .add(cart_item)
                           
  request.onsuccess = function(event) {
          alert("product has been added to your database.");
  };
   
  request.onerror = function(event) {
          alert("Unable to add data\r\nproduct is aready exist in your database! ");       
  }
   
}

function readAll() {
  var objectStore = db.transaction("cart_product").objectStore("cart_product");
  objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    var items = []
    if (cursor) {
          items.push({name:cursor.value.name,price:cursor.value.price,image:cursor.value.image})
          cursor.continue();
    }
    loadCart(items)
    
  };  
    
}


async function init(){
  await readAll()
  $('#cart').css('display','block')
  $('#products').css('display','none')
}
