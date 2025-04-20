let cart = [];

function handleBuyNow(event) {
  const card = event.target.closest('.card');
  const productName = card.querySelector('h1').innerText;
  const price = card.querySelector('p').innerText;
  const imageSrc = card.querySelector('img').src;

  const product = { name: productName, price: price, image: imageSrc };
  cart.push(product);

  updateCartCount();
  alert(`${productName} has been added to your cart.`);
  console.log("Cart:", cart);
}

function updateCartCount() {
  document.getElementById('cart-count').innerText = cart.length;
}

function showCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<li>Your cart is empty.</li>";
  } else {
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ${item.price}`;
      cartItems.appendChild(li);
    });
  }

  document.getElementById('cart-modal').style.display = 'block';
}

function closeCart() {
  document.getElementById('cart-modal').style.display = 'none';
}

// Add click listeners to Buy Now buttons
const buyButtons = document.querySelectorAll('button');
buyButtons.forEach(button => {
  if (button.innerText.toLowerCase() === 'buy now') {
    button.addEventListener('click', handleBuyNow);
  }
});

// Add click listener to cart icon
document.querySelector('.cart-icon').addEventListener('click', showCart);
