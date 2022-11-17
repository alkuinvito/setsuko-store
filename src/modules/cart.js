function qtyAdd(id) {
    let pos = -1;
    let products = localStorage.getItem("products");
    products = JSON.parse(products);

    for(let i=0; i<products.length; i++) {
        if(products[i].id == id) {
            pos = i;
            break;
        }
    }
    
    if(pos != -1) {
        products[pos].qty += 1;
        document.querySelector("li[data-id='"+id+ "'] .ca-qty").textContent = products[pos].qty;
        localStorage.setItem("products", JSON.stringify(products));
    }
}

function qtyDel(id) {
    let pos = -1;
    let products = localStorage.getItem("products");
    products = JSON.parse(products);
    
    for(let i=0; i<products.length; i++) {
        if(products[i].id == id) {
            pos = i;
            break;
        }
    }

    if(pos != -1) {
        if(products[pos].qty > 1) {
            products[pos].qty -= 1;
            document.querySelector("li[data-id='"+id+ "'] .ca-qty").textContent = products[pos].qty;
        } else {
            products.splice(pos, 1);
            document.querySelector("li[data-id='"+id+ "']").remove();
        }
    }
    localStorage.setItem("products", JSON.stringify(products));
}

function renderCart(host, list, products) {
    for(data of products) {
        const pdItem = document.createElement("li");
        const pdImg = document.createElement("img");
        const pdInfo = document.createElement("div");
        const pdName = document.createElement("h3");
        const pdPrice = document.createElement("span");
        const pdQty = document.createElement("span");
        const qtyPlus = document.createElement("button");
        const qtyMinus = document.createElement("button");
        const qtyWrapper = document.createElement("div");

        pdImg.src = host + data.image;
        pdName.textContent = data.name;
        pdPrice.textContent = data.price;
        pdQty.className = "ca-qty";
        pdQty.textContent = data.qty;
        pdItem.setAttribute("data-id", data.id);
        pdItem.className = "ca-item";
        pdInfo.className = "ca-info";
        qtyPlus.className = "qty-plus";
        qtyPlus.innerHTML = "<i class='fa-solid fa-plus'></i>";
        qtyWrapper.setAttribute("data-id", data.id);
        qtyPlus.addEventListener("click", function() {
            qtyAdd(this.parentElement.dataset.id);
        })
        qtyMinus.className = "qty-minus";
        qtyMinus.innerHTML = "<i class='fa-solid fa-minus'></i>"; 
        qtyMinus.addEventListener("click", function() {
            qtyDel(this.parentElement.dataset.id);
        })

        pdItem.append(pdImg);
        pdInfo.append(pdName);
        pdInfo.append(pdPrice);
        qtyWrapper.append(qtyPlus);
        qtyWrapper.append(pdQty);
        qtyWrapper.append(qtyMinus);
        pdInfo.append(qtyWrapper);
        pdItem.append(pdInfo);
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