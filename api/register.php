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
        if($password != '' && is_string($password)) {
            if($status = $user->signUp($username, $password)) {
                if($status) {
                    $response = array(
                        'success'=>TRUE
                    );
                }
            }
        }
    }

    $conn->close();
    echo json_encode($response);
?>