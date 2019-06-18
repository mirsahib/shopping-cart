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


$(document).ready(function(){
  //console.log("Start here");
  // Basic tasks
  // 1. Show / hide cart section on button click (Cart button / close cutton)
    $('#showCartBtn').click(function(){
      $('#cart').show()
      loadCart()
    })
    $('#close').click(function(){
      $('#cart').hide()
    })
  // 2. Dynamically load products to view
    for(var i=0;i<products.length;i++){
      var divCol = $('<div class="col-md-4">')
      var divCard = $('<div class="card">')
      var img = $('<img  class="card-img-top" src="'+products[i].image+'" />')
      var cardBody = $('<div class="card-body">')
      var cardTitle = $('<h5 class="card-title">'+products[i].name+'</h5>')
      var cardPrice = $('<p class="card-text">$'+ products[i].price+'</p>')
      var cardBtn = $('<button id="'+i+'" onclick=addToCart(event) class="btn btn-primary">Add to Cart</button>')
      cardBody.append(cardTitle)
      cardBody.append(cardPrice)
      cardBody.append(cardBtn)
      divCard.append(img)
      divCard.append(cardBody)
      divCol.append(divCard)
      $('#productRow').append(divCol)
    }

  // 3. Dynamically show total items in Cart
  $('#itemNo').text(localStorage.length)
  // 4. Add to cart button functionality
  // 5. Dynamically load cart items
  // 6. Implement quantity update for each cart item and update total cost dynamically.
  // 7. Store and load cart from localStorage
});



function addToCart(event){
  var element = event.target
  localStorage.setItem("item_"+element.id,JSON.stringify(products[element.id]))
  $('#itemNo').text(localStorage.length)
}
function loadCart(){
  local = localStorage
  items = []
  for(var i =0;i<local.length;i++){
    items.push(local.getItem("item_"+i))
  }
  if($('#cartRow').html()!=""){
    $('#cartRow').empty()
  }
  for(var i=0;i<items.length;i++){
    var itemVar = JSON.parse(items[i])
      //create column
  var col = document.createElement('div')
  col.setAttribute('class','col-md-4')
  //create card
  var card = document.createElement('div')
  card.setAttribute('class','card')
  //create img
  var img = document.createElement('img')
  img.setAttribute('class','card-img-top')
  img.src = itemVar.image
  //create card-body
  var card_body = document.createElement('div')
  card_body.setAttribute('class','card-body')
    //create card-title
    var card_title = document.createElement('h5')
    card_title.setAttribute('class','card-title')
    card_title.textContent = itemVar.name
    //create p
    var par = document.createElement('p')
    par.setAttribute('class','card-text')
    par.textContent = '$ '+itemVar.price
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
  }
}

//