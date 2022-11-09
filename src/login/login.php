<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="index.js" type="text/javascript" defer></script>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/x-icon" href="./assets/favicon.ico">
    <title>Setsuko</title>
</head>
<body>
    <div class="container">
        <div class="wrapper banner"></div>
        <div class="wrapper login" id="loginBox">
            <h1>Login</h1>
            <form>
                <input type="text" name="username" id="username" placeholder="Username">
                <input type="password" name="password" id="password" placeholder="Password">
                <input type="button" value="Login" id="submit">
            </form>
            <span>Don&#039t have account yet? <a href="javascript:toggleBox();">Sign up</a></span>
        </div>
        <div class="wrapper register hide" id="registerBox">
            <h1>Register</h1>
            <form>
                <input type="text" name="username" id="r_username" placeholder="Username">
                <input type="password" name="password" id="r_password" placeholder="Password">
                <input type="button" value="Register" id="r_submit">
            </form>
            <span>Already have an account? <a href="javascript:toggleBox();">Sign in</a></span>
        </div>   
    </div>
    <div id="blocker" class="hide">
        <div class="popup">
            <span id="pop_message"></span>
        </div>
    </div>
</body>
</html>