const form = document.getElementById("fm-auth");
const label = document.getElementById("fm-label");
const username = document.getElementById("username");
const password = document.getElementById("password");
const submitButton = document.getElementById("btnSubmit");
const submitLabel = document.getElementById("labelSubmit");

let isSignIn = true;
let handler = "login.php";

function toggleForm() {
    if(isSignIn) {
        isSignIn = false;
        label.innerHTML = "Sign up";
        labelSubmit.innerHTML = "Signup";
        handler = "register.php";
    } else {
        isSignIn = true;
        label.innerHTML = "Log In";
        labelSubmit.innerHTML = "Login";
        handler = "login.php";
    }
}