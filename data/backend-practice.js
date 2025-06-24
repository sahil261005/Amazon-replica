const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
  console.log(xhr.response);
});

xhr.open("GET", "https://supersimplebackend.dev");
xhr.send();

class Product {}

export let products = [];
function loadProducts(renderProductsGrid) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === "clothing") {
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });

    renderProductsGrid();
  });
  xhr.open("GET", "https://supersimplebackend.dev/products");
  xhr.send();
}

loadProducts();

loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary(); //this is a annonymous function that will save these 2 functions inside parameter
  // renderProductsGrid and call it when we have loaded all the products
});
