const host = "http://setsuko.store/";

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
window.onload = () => {
  const params = window.location.search;
  const urlParams = new URLSearchParams(params);
  getProduct("peek", urlParams.get('peek'), renderProduct);
}