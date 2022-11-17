import * as cart from '../../modules/cart';

const host = "http://setsuko.store/";
const cartList = document.getElementById("ca-list");
const addButton = document.getElementById("peek-buy");
let details;

function getProduct(key, value, callback) {
  fetch(host + "api/product.php?" + key + "=" + value, {method: 'GET', headers: {}})
    .then(response => response.json())
    .then((data) => callback(data))
    .catch(err => console.error(err));
}
  
function renderProduct(product) {
  document.getElementById("peek-img").src = host + "/static/assets/" + product.productImg;
  document.getElementById("peek-title").textContent = product.productName;
  document.getElementById("peek-price").textContent = product.productPrice;
  document.getElementById("peek-desc").textContent = product.productDesc;
}

const params = window.location.search;
const urlParams = new URLSearchParams(params);
getProduct("peek", urlParams.get('peek'), data => {
  cart.renderProduct(data);
  details = { image: data.productImg, name: data.productName, price: data.productPrice };
});
cart.showItem(host, cartList);

document.getElementById("btnCart").addEventListener("click", cart.toggleCart);
document.getElementById("btnClose").addEventListener("click", cart.toggleCart);