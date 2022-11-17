function renderCart(host, list, products) {
    for(data of products) {
        const pdItem = document.createElement("li");
        const pdImg = document.createElement("img");
        const pdInfo = document.createElement("div");
        const pdName = document.createElement("h3");
        const pdPrice = document.createElement("span");
        const pdQty = document.createElement("span");

        pdImg.src = host + data.image;
        pdName.textContent = data.name;
        pdPrice.textContent = data.price;
        pdQty.className = "ca-qty";
        pdQty.textContent = data.qty;
        pdItem.setAttribute("data-id", data.id);
        pdItem.className = "ca-item";
        pdInfo.className = "ca-info";

        pdItem.append(pdImg);
        pdInfo.append(pdName);
        pdInfo.append(pdPrice);
        pdItem.append(pdInfo);
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

async function addItem(host, list, data) {
    let products = localStorage.getItem("products");
    
    if(products == null) {
        data.qty = 1;
        data = [data];
        localStorage.setItem("products", JSON.stringify(data));
    } else {
        products = JSON.parse(products);
        let i = 0;
        let pos = -1;
        while(i < products.length) {
            if(products[i].id == data.id) {
                pos = i;
                break;
            }
            i++;
        }

        if(pos == -1) {
            data.qty = 1;
            products.push(data);
        } else {
            products[pos].qty += 1;
            document.querySelector("li[data-id='"+data.id+ "'] .ca-qty").textContent = products[pos].qty;
            localStorage.setItem("products", JSON.stringify(products));
            return;
        }
        localStorage.setItem("products", JSON.stringify(products));
    }
    
    renderCart(host, list, [data]);
}