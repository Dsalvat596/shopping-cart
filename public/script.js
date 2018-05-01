var ShoppingCart = function () {

  // an array with all of our cart items
  var cart = [];

  var STORAGE_ID = 'shopping-cart';
  var saveToLocalStorage = function () {
    localStorage.setItem(STORAGE_ID, JSON.stringify(cart));
  }

  var getFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
  };

  var updateCart = function () {
    total = 0;
    $('.cart-list').empty();
    cart = getFromLocalStorage();
    for (let i = 0; i < cart.length; i++) {
      var itemHTML = "<p>" + cart[i].name + "  $" + "<span class='item-price'>" + cart[i].price + "</span></p>"
      total += cart[i].price;
      $('.cart-list').append(itemHTML);
    }
    saveToLocalStorage();
    $('.total').empty();
    $('.total').append(total);
  }



  var addItem = function (item) {
    cart.push(item);
    saveToLocalStorage();
    console.log(cart);
  }

  var clearCart = function () {
    // TODO: Write a function that clears the cart ;-)
    //$('.cart-list').remove();
    //total = 0;
    $('.total').empty();
    $('.total').text(0);
    cart = [];
    saveToLocalStorage();
    updateCart();


  }



  return {
    updateCart: updateCart,
    addItem: addItem,
    clearCart: clearCart,

  };
};
// update the cart as soon as the page loads!
var app = ShoppingCart();


app.updateCart();


//--------EVENTS---------

$('.view-cart').on('click', function () {

  $('.shopping-cart').toggleClass('show');

});

$('.add-to-cart').on('click', function () {
  var item = {}
  item.name = $(this).closest('.item').data().name;
  item.price = $(this).closest('.item').data().price;

  app.addItem(item);
  app.updateCart();
});

$('.clear-cart').on('click', function () {
  app.clearCart();
});