<?php
    require 'auth.php';

    $conn = new Connection();
    $user = new User();

    $username = $_POST['username'];
    $password = $_POST['password'];
    $username = $conn->link->escape_string($username);
    $password = $conn->link->escape_string($password);

    $response = array(
        'success'=>FALSE
    );

    if($username != '' && is_string($username)) {
        if($username != '' && is_string($username)) {
            if($token = $user->signIn($username, $password)) {
                if($token) {
                    $response = array(
                        'success'=>TRUE,
                        'token'=>$token
                    );
                }
            }
        }
    }
    
    $conn->close();
    echo json_encode($response);
?>