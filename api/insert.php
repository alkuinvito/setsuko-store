<?php
    require 'config.php';

    $response = array(
        'success'=>FALSE
    );

    $filepath = $_FILES['productImg']['tmp_name'];
    $fileSize = filesize($filepath);
    $fileinfo = finfo_open(FILEINFO_MIME_TYPE);
    $filetype = finfo_file($fileinfo, $filepath);

    if($fileSize === 0) {
        die(json_encode($response));
    }

    if($fileSize > 3145728) {
        die(json_encode($response));
    }

    $allowedTypes = [
        'image/png' => 'png',
        'image/jpeg' => 'jpg'
    ];

    if(!in_array($filetype, array_keys($allowedTypes))) {
        die(json_encode($response));
    }

    $filename = basename($filepath);
    $extension = $allowedTypes[$filetype];
    $targetDirectory = "../static/assets/";

    $newFilepath = $targetDirectory . "/" . $filename . "." . $extension;

    if(!copy($filepath, $newFilepath)) {
        die(json_encode($response));
    }

    unlink($filepath);

    $productId = sha1($productName.rand(99,999));
    $productCat = $_POST['productCat'];
    $productName = $_POST['productName'];
    $productDesc = $_POST['productDesc'];
    $productPrice = $_POST['productPrice'];
    $productImg = $filename.'.'.$extension;

    $conn = new Connection();
    $sql = "INSERT INTO products (productId, productCat, productName, productDesc, productPrice, productImg) VALUES ('$productId', '$productCat', '$productName', '$productDesc', '$productPrice', '$productImg');";
    if($result = $conn->query($sql)) {
        $response = array(
            'success'=>TRUE,
            'productId'=>$productId
        );
    }
    echo json_encode($response);
?>