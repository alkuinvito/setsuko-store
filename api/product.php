<?php
    require 'auth.php';

    class Product {
        public static function category($conn, ?string $categories) {
            if(is_string($categories)) {
                $product = array();
                foreach(explode(",", $categories) as $category) {
                    $sql = "SELECT productId, productName, productDesc, productPrice, productImg FROM products WHERE productCat='$category'";
                    if($query = $conn->query($sql)) {

                        while($result = $query->fetch_assoc()) {
                            $product[] = $result;
                        }
                    }
                }

                try {
                    return json_encode($product);
                } finally {
                    $query->free_result();
                }
            }
        }

        public static function peek($conn, ?string $productId) {
            if(is_string($productId)) {
                $sql = "SELECT productName, productDesc, productPrice, productImg FROM products WHERE productId='$productId'";
                if($query = $conn->query($sql)) {
                    try {
                        return json_encode($result = $query->fetch_assoc());
                    } finally {
                        $query->free_result();
                    }
                }
            }
        }

        public static function search($conn, ?string $search) {
            if(is_string($search)) {
                $sql = "SELECT productId, productName, productDesc, productPrice, productImg FROM products WHERE productName LIKE '%$search%'";
                if($query = $conn->query($sql)) {
                    $product = array();
                    while($result = $query->fetch_assoc()) {
                        $product[] = $result;
                    }

                    try {
                        return json_encode($product);
                    } finally {
                        $query->free_result();
                    }
                }
            }
        }
    }

    $conn = new Connection();

    if(!empty($_GET['category'])) {
        $categories = $_GET['category'];
        echo Product::category($conn, $categories);
    }

    if(!empty($_GET['peek'])) {
        $id = $_GET['peek'];
        echo Product::peek($conn, $id);
    }

    if(!empty($_GET['search'])) {
        $search = $_GET['search'];
        echo Product::search($conn, $search);
    }
?>