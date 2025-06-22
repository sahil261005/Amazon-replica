import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import "../data/backend-practice.js";

// Helper to store cart in localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update payment summary based on cart and delivery
function updatePaymentSummary() {
  let itemsTotal = 0;
  let shippingTotal = 0;
  let totalItems = 0;

  cart.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    if (!product) return;

    const productId = cartItem.productId;
    const quantity = cartItem.quantity;

    // Check which delivery option is selected
    const selectedOption = document.querySelector(
      `input[name="delivery-option-${productId}"]:checked`
    );

    let deliveryCost = 0;
    if (selectedOption) {
      const priceText = selectedOption
        .closest(".delivery-option")
        .querySelector(".delivery-option-price").textContent;
      const priceMatch = priceText.match(/\$([\d.]+)/);
      deliveryCost = priceMatch ? parseFloat(priceMatch[1]) : 0;
    }

    itemsTotal += (product.priceCents / 100) * quantity;
    shippingTotal += deliveryCost * quantity;
    totalItems += quantity;
  });

  const beforeTax = itemsTotal + shippingTotal;
  const tax = beforeTax * 0.1;
  const total = beforeTax + tax;

  // Update DOM
  document
    .querySelectorAll(".js-items-count")
    .forEach((el) => (el.innerText = totalItems));
  document.querySelector(".js-items-total").innerText = `$${itemsTotal.toFixed(
    2
  )}`;
  document.querySelector(".js-shipping").innerText = `$${shippingTotal.toFixed(
    2
  )}`;
  document.querySelector(".js-before-tax").innerText = `$${beforeTax.toFixed(
    2
  )}`;
  document.querySelector(".js-tax").innerText = `$${tax.toFixed(2)}`;
  document.querySelector(".js-total").innerText = `$${total.toFixed(2)}`;
}

// Render cart
function renderCart() {
  const container = document.querySelector(".js-cart-summary-container");
  if (!cart.length) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    updatePaymentSummary();
    return;
  }

  let html = "";
  cart.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    if (!product) return;

    html += `
      <div class="cart-item-container" data-product-id="${product.id}">
        <div class="delivery-date">Delivery date: Tuesday, June 21</div>
        <div class="cart-item-details-grid">
          <img class="product-image" src="${product.image}" />

          <div class="cart-item-details">
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${(product.priceCents / 100).toFixed(
              2
            )}</div>
            <div class="product-quantity">
              <span> Quantity: <span class="quantity-label">${
                cartItem.quantity
              }</span> </span>
              <span class="update-quantity-link link-primary">Update</span>
              <span class="delete-quantity-link link-primary js-delete-button">Delete</span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>

            <div class="delivery-option">
              <input type="radio" checked class="delivery-option-input" name="delivery-option-${
                product.id
              }" />
              <div>
                <div class="delivery-option-date">Tuesday, June 21</div>
                <div class="delivery-option-price">$0.00 - FREE Shipping</div>
              </div>
            </div>

            <div class="delivery-option">
              <input type="radio" class="delivery-option-input" name="delivery-option-${
                product.id
              }" />
              <div>
                <div class="delivery-option-date">Wednesday, June 15</div>
                <div class="delivery-option-price">$4.99 - Shipping</div>
              </div>
            </div>

            <div class="delivery-option">
              <input type="radio" class="delivery-option-input" name="delivery-option-${
                product.id
              }" />
              <div>
                <div class="delivery-option-date">Monday, June 13</div>
                <div class="delivery-option-price">$9.99 - Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Add listeners for delete buttons
  document.querySelectorAll(".js-delete-button").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.closest(".cart-item-container").dataset
        .productId;
      const index = cart.findIndex((item) => item.productId === productId);
      if (index !== -1) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
      }
    });
  });

  // Listen to delivery option changes
  document.querySelectorAll(".delivery-option-input").forEach((input) => {
    input.addEventListener("change", updatePaymentSummary);
  });

  updatePaymentSummary();
}

// Initial load
renderCart();
