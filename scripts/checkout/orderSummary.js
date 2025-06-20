import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryoption.js";

// ✅ Render delivery options for each product
function deliveryOptionsHTML(productId, selectedDeliveryOptionId) {
  let html = "";

  deliveryOptions.forEach((option) => {
    const deliveryDate = dayjs()
      .add(option.deliveryDays, "days")
      .format("dddd, MMMM D");
    const priceString =
      option.priceCents === 0
        ? "Free"
        : `$${formatCurrency(option.priceCents)}`;
    const isChecked = option.id === selectedDeliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${productId}"
        data-delivery-option-id="${option.id}">
        <input
          type="radio"
          ${isChecked ? "checked" : ""}
          class="delivery-option-input"
          name="delivery-option-${productId}"
        />
        <div>
          <div class="delivery-option-date">${deliveryDate}</div>
          <div class="delivery-option-price">${priceString}</div>
        </div>
      </div>
    `;
  });

  return html;
}

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    if (!product) return;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    const deliveryDate = dayjs()
      .add(deliveryOption.deliveryDays, "days")
      .format("dddd, MMMM D");

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${product.id}">
        <div class="delivery-date">Delivery date: ${deliveryDate}</div>
        <div class="cart-item-details-grid">
          <img class="product-image" src="${product.image}" />

          <div class="cart-item-details">
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${formatCurrency(
              product.priceCents
            )}</div>
            <div class="product-quantity">
              <span> Quantity: <span class="quantity-label">${
                cartItem.quantity
              }</span> </span>
              <span class="update-quantity-link link-primary">Update</span>
              <span class="delete-quantity-link link-primary js-delete-link"
                    data-product-id="${product.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${deliveryOptionsHTML(product.id, cartItem.deliveryOptionId)}
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector(".js-cart-summary-container").innerHTML =
    cartSummaryHTML;

  // ✅ Attach delete button listeners
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
      renderPaymentSummary();
    });
  });

  // ✅ Attach delivery option change listeners
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, parseInt(deliveryOptionId));
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
