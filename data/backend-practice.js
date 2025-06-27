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



 export function loadProductsFetch(){
  const promise = fetch("https://supersimplebackend.dev/products").then((response) => {
    return response.json()

  }).then((productsData) => {
    products = productsData.map((productDetails) => {
      if (productDetails.type === "clothing") {
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });

  });
  return promise;
}

loadProductsFetch().then(() => {

});


promise.all([
  loadProducctsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
])



async function  loadPage() {
  try{
      throw  'error1';

    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      loadCart(() => {
        reject('error3')
        resolve('value3');

    });
  });
 } catch (error){
    console.log('unexpected error. Please try again later.')


 }
 
  
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage()
 




