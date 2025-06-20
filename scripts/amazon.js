import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `<div class="product-container">
    <div class="product-image-container">
      <img class="product-image" src="${product.image}" />
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img
        class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png"
      />
      <div class="product-rating-count link-primary">${
        product.rating.count
      }</div>
    </div>

    <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector">
        ${[...Array(10)]
          .map(
            (_, i) =>
              `<option value="${i + 1}" ${i === 0 ? "selected" : ""}>${
                i + 1
              }</option>`
          )
          .join("")}
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png" />
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
      Add to Cart
    </button>
  </div>`;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

// ✅ Update the cart quantity number in the header
function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  const cartQuantityElement = document.querySelector(".js-cart-quantity");
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  }
}

// ✅ Add to Cart Button Logic
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const container = button.closest(".product-container");
    const quantity = Number(container.querySelector("select").value);

    addToCart(productId, quantity); // ✅ use only this

    updateCartQuantity();

    const addedMessage = container.querySelector(".added-to-cart");
    addedMessage.classList.add("visible");
    setTimeout(() => {
      addedMessage.classList.remove("visible");
    }, 1500);
  });
});

// ✅ Call on page load
updateCartQuantity();
