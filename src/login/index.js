var submit = document.getElementById("submit");
var r_submit = document.getElementById("r_submit");
var username = document.getElementById("username");
var password = document.getElementById("password");
var r_username = document.getElementById("r_username");
var r_password = document.getElementById("r_password");
var blocker = document.getElementById("blocker");
var pop_message = document.getElementById("pop_message");


function httpGetAsync(theUrl, callback, str1, str2) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', theUrl, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        callback(this.responseText);
    };
    xhr.send('username=' + str1 + '&password=' + str2);
};

function popup(message) {
    blocker.classList.remove("hide");
    pop_message.innerHTML=message;
    blocker.addEventListener("click", function() {
        blocker.classList.add("hide");
    });
}

submit.addEventListener("click", function() {
    httpGetAsync("./login.php", function(evt) {
        if(evt=="FALSE") {
            console.log("Username and/or password incorrect.");
        } else if(evt=="TRUE") {
            console.log("200");
            window.location.replace("./member/");
        }
    }, username.value, password.value);
});
r_submit.addEventListener("click", function() {
    httpGetAsync("./register.php", console.log, r_username.value, r_password.value);
});

function toggleBox() {
    document.getElementById("loginBox").classList.toggle("hide");
    document.getElementById("registerBox").classList.toggle("hide");
}