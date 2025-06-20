// ✅ Load cart from localStorage (if exists), or use empty array
export let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ✅ Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ✅ Add item to cart with quantity and default delivery option
export function addToCart(productId, quantity = 1) {
  let matchingItem = cart.find((item) => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: 1, // default to 7-day delivery (free)
    });
  }

  saveCart();
}

// ✅ Remove an item from cart
export function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.productId === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    saveCart();
  }
}

// ✅ Update delivery option for a product in cart
export function updateDeliveryOption(productId, newOptionId) {
  const matchingItem = cart.find((item) => item.productId === productId);
  if (matchingItem) {
    matchingItem.deliveryOptionId = parseInt(newOptionId);
    saveCart();
  }
}

// ✅ Get total quantity (useful for header badge updates)
export function getCartQuantity() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// ✅ Auto update cart quantity in header on load
const cartQuantityElement = document.querySelector(".js-cart-quantity");
if (cartQuantityElement) {
  cartQuantityElement.innerText = getCartQuantity();
}
