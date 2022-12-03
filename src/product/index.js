const host = "http://setsuko.store/";
const cartOverlay = document.getElementById("cart-overlay");
const cartList = document.getElementById("ca-list");
const addButton = document.getElementById("peek-buy");
const buttonLogin = document.querySelector(".login-button");
const profile = document.getElementById("profile");
let details;
  
function renderProduct(product) {
  document.getElementById("peek-img").src = host + "/static/assets/" + product.productImg;
  document.getElementById("peek-title").textContent = product.productName;
  document.getElementById("peek-price").textContent = product.productPrice;
  document.getElementById("peek-desc").textContent = product.productDesc;
}

const params = window.location.search;
const urlParams = new URLSearchParams(params);
fetch(host + "api/product.php?peek=" + urlParams.get("peek"), {method: 'GET', headers: {}})
  .then(response => response.json())
  .then(response => {
    renderProduct(response);
    window.details = { id: urlParams.get("peek"), image: response.productImg, name: response.productName, price: response.productPrice };
  })
  .catch(err => console.error(err));

addButton.addEventListener("click", () => {
  addItem(host+"static/assets/", cartList, window.details)
});

showItem(host+"static/assets/", cartList);

document.getElementById("btnCart").addEventListener("click", () => {
  cartList.innerHTML = "";
  showItem(host+"static/assets/", cartList);
  cartOverlay.classList.toggle("expand");
});
document.getElementById("btnClose").addEventListener("click", () => { cartOverlay.classList.toggle("expand") });

if(localStorage.getItem("token") != null) {
  buttonLogin.classList.add("hide");
  document.getElementById("profile-name").textContent = localStorage.getItem("name");
  document.getElementById("profile-img").src = host +"static/assets/"+localStorage.getItem("image");
  profile.classList.remove("hide");
}