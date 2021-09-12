const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

// show all product in UI 
const showProducts = (products) => {
  // console.log(products);
  const allProducts = products.map((pd) => pd);
  // console.log(allProducts);
  for (const product of allProducts) {
    console.log(product);
    const images = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${images}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h5>Rating:${product.rating.rate}<h5>
      <h5>Average Rating:${product.rating.count}<h5>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="loadSingleProduct(${product.id})" id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};


// loadSingleProduct()
const loadSingleProduct = (productId) => {
  // console.log(productId)
  const url = `https://fakestoreapi.com/products/${productId}`;
  // console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(data => displaySinglePrduct(data))
}

const displaySinglePrduct = (data) => {
  const singleResult = document.getElementById("single-result");
  singleResult.innerHTML = '';
  singleResult.innerHTML = `
  <img src="${data.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        <h5>Rating:${data.rating.rate}<h5>
        <h5>Average Rating:${data.rating.count}<h5>
        <h3>Price:$ ${data.price}</h3>
        <p class="card-text">${data.description.slice(0, 50)}</p>
      </div>
  `
}

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};


// fixs place
// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// fix place
// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  console.log(grandTotal);
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

