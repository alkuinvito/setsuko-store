let i=0, j=0, k=-1;
const card_title = ["Excel Tuna 500gr", "Dog Chews Bone"];
const host = "http://setsuko.store/"

const fadeIn = [
  { opacity: '0' },
  { opacity: '1' }
];
const fadeOut = [
  { opacity: '1' },
  { opacity: '0' }
];
const timing = {
  duration: 1500,
  iterations: 1,
};

function typing(text_dom, card_dom) {
  setTimeout(function ()
  {
    text_dom.innerText += card_title[j].charAt(i);
    if(i>card_title[0].length) {
      setTimeout(function () {
        card_dom[j].animate(fadeOut, timing);
        card_dom[j].classList.add("hide");
        k=k*-1;
        j+=k;
        card_dom[j].animate(fadeIn, timing);
        card_dom[j].classList.remove("hide");
        i=0;
        text_dom.innerHTML = "";
        typing(text_dom, card_dom);
      }, 3000);
      return;
    } else {
      i++;
    }
    typing(text_dom, card_dom);
  }, 150);
}

function getProduct(key, value, callback) {
  fetch("http://setsuko.store/api/product.php?"+key+"="+value, {method: 'GET', headers: {}})
    .then(response => response.json())
    .then((data) => callback(data))
    .catch(err => console.error(err));
}

function renderProduct(data) {
  const productCt = document.querySelector(".products");
  productCt.innerHTML="";

  for(const product of data) {
    const productLink = document.createElement("a");
    const productCard = document.createElement("li");
    productCard.className = "pd-card";
    productLink.setAttribute("href", "./product/?peek=" + product.productId);
    let pd_image = document.createElement("div");
    pd_image.className = "pd-img";
    pd_image.style.backgroundImage = "url('" + host + "static/assets/" + product.productImg + "')";
    let pd_info = document.createElement("div");
    pd_info.className = "pd-info";
    let pd_name = document.createElement("h3");
    pd_name.textContent = product.productName;
    let pd_price = document.createElement("span");
    pd_price.textContent = product.productPrice;
    productCard.appendChild(pd_image);
    pd_info.appendChild(pd_name);
    pd_info.appendChild(pd_price);
    productCard.appendChild(pd_info);
    productLink.appendChild(productCard);
    productCt.appendChild(productLink);
  }
  document.getElementById("pd-number").innerText = data.length;
}

function changeCategory(category) {
  const category_name = document.getElementById("hd-category-name");
  let animal = category.charAt(0).toUpperCase() + category.slice(1);
  category_name.innerText = animal;
  getProduct("category", category, (data) => renderProduct(data));
}

function searchProduct(query) {
  if(query.length >= 2) {
    getProduct("search", query, (data) => {
      if(data.length > 0) {
        renderProduct(data);
      } else {
        console.log("not found");
      }
    });
  }
}

window.onload = () => {
  const hd_query = document.getElementById("hd-query");
  const bn_query = document.getElementById("bn-query");
  const header = document.querySelector(".header");
  const bn_search = document.querySelector(".bn-search");
  const ds_cards = document.getElementsByClassName("ds-card");
  const category_selector = document.getElementById("hd-category-selector");
  const category_wrapper = document.getElementById("category-wrapper");
  const ct_cat = document.getElementById("ct-cat");
  const ct_dog = document.getElementById("ct-dog");
  const ct_fish = document.getElementById("ct-fish");
  const buttonLogin = document.querySelector(".login-button");
  const profile = document.getElementById("profile");
  const cartOverlay = document.getElementById("cart-overlay");
  const cartList = document.getElementById("ca-list");
  bn_query.innerHTML = "";

  typing(bn_query, ds_cards);

  window.addEventListener("scroll", function () {
    if(document.documentElement.scrollTop > (bn_search.offsetTop-header.clientHeight)) {
      document.getElementById("hd-title").style.transform="translateY(-100%)";
      document.getElementById("hd-finder").style.transform="translateY(-100%)";
    } else {
      document.getElementById("hd-title").style.transform="translateY(0%)";
      document.getElementById("hd-finder").style.transform="translateY(0%)";
    }
  });

  bn_search.addEventListener("click", () => {
    document.getElementById("pd-total").scrollIntoView({behavior: "smooth"});
  });

  category_selector.addEventListener("click", function() {
    category_wrapper.style.height="240px";
  });
  category_selector.addEventListener("mouseenter", function() {
    category_wrapper.style.height="240px";
  });
  category_wrapper.addEventListener("mouseleave", function() {
    category_wrapper.style.height="0";
  });

  ct_cat.onclick = function() {
    changeCategory("cat");
  }
  ct_dog.onclick = function() {
    changeCategory("dog");
  }
  ct_fish.onclick = function() {
    changeCategory("fish");
  }

  getProduct("category", "cat,dog,fish", (data) => renderProduct(data));

  document.getElementById("hd-submit").addEventListener("click", function() {
    console.log(hd_query.value);
    searchProduct(hd_query.value);
  });
  if(localStorage.getItem("token") != null) {
    let token = localStorage.getItem("token");
    buttonLogin.classList.add("hide");
    document.getElementById("profile-name").textContent = localStorage.getItem("name");
    document.getElementById("profile-img").src = host +"static/assets/"+localStorage.getItem("image");
    profile.classList.remove("hide");
  }

  document.getElementById("btnCart").addEventListener("click", () => { cartOverlay.classList.toggle("expand") });  
  document.getElementById("btnClose").addEventListener("click", () => { cartOverlay.classList.toggle("expand") });

  showItem(host+"static/assets/", cartList);
}