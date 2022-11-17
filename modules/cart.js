function renderCart(host, list, products) {
    for(data of products) {
        const pdItem = document.createElement("li");
        const pdImg = document.createElement("img");
        const pdName = document.createElement("h3");
        const pdPrice = document.createElement("span");
        const pdQty = document.createElement("span");

        pdImg.src = host + data.image;
        pdName.textContent = data.name;
        pdPrice.textContent = data.price;
        pdQty.textContent = data.qty;

        pdItem.append(pdImg);
        pdItem.append(pdName);
        pdItem.append(pdPrice);
        pdItem.append(pdQty);
        list.appendChild(pdItem);
    }
}

function showItem(host, list) {
    let products = localStorage.getItem("products");

    if(products != null) {;
        products = JSON.parse(products);
        renderCart(host, list, products);
    }
}

function addItem(host, list, data) {
    let products = localStorage.getItem("products");
    
    if(products == null) {
        data = [data];
        localStorage.setItem("products", JSON.stringify(data));
    } else {
        products = JSON.parse(products);
        products.push(data);
        localStorage.setItem("products", JSON.stringify(products));
    }

    renderCart(host, list, data);
}