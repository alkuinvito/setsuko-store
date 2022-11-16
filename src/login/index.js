const host = "http://setsuko.store/";

const form = document.getElementById("fm-auth");
const username = document.getElementById("username");
const password = document.getElementById("password");
const submitButton = document.getElementById("btnSubmit");
const submitLabel = document.getElementById("labelSubmit");
const accent = document.getElementById("fm-selector-accent");
const labels = document.getElementsByClassName("fm-label");
const message = document.getElementById("message");
const loader = document.querySelector(".fa-spinner");

let isSignIn = true;
let handler = "login.php";

function toggleForm() {
    message.classList.add("hide");
    if(isSignIn) {
        handler = "register.php";
        for(elem of labels) {
            elem.classList.toggle("active");
        }
        accent.style.transform = "translateX(100%)";
        submitLabel.innerHTML = "Signup";
        isSignIn = false;
    } else {
        handler = "login.php";
        for(elem of labels) {
            elem.classList.toggle("active");
        }
        accent.style.transform = "translateX(0)";
        submitLabel.innerHTML = "Login";
        isSignIn = true;
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    message.classList.add("hide");
    if(username.value != "" && password.value != "") {
        submitLabel.classList.add("hide");
        loader.classList.remove("hide");
        submitButton.disabled = true;
        fetch(host + "/api/" + handler, {method: "POST", headers: {}, body:
        new URLSearchParams({
            username: username.value,
            password: password.value
        })
        })
        .then(response => response.json())
        .then(response => {
            if(response.success === true) {
                if(isSignIn) {
                    localStorage.setItem("token", response.token);
                    window.location.href = "../";
                } else {
                    toggleForm();
                }
            } else {
                if(isSignIn) {
                    message.textContent = "Incorrect username or password";
                    message.classList.remove("hide");
                } else {
                    message.textContent = "Username is already exist";
                    message.classList.remove("hide");
                }
            }

            submitLabel.classList.remove("hide");
            loader.classList.add("hide");
            submitButton.disabled = false;
        })
    } else {
        message.textContent = "Username and password can not be empty";
        message.classList.remove("hide");
    }

})