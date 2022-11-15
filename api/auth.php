<?php
    header("Access-Control-Allow-Origin: *");
    require 'config.php';

    class Token {
        private static $revokedTokens = [];

        public static function generate(string $username): string {
            if(!empty($username)) {
                $tokenId = "";
                for($i=0; $i<4; $i++) $tokenId .= chr(rand(65,90));
                $tokenId .= "-";
                for($i=0; $i<4; $i++) $tokenId .= rand(0,9);
                $tokenId .= "-";
                for($i=0; $i<4; $i++) $tokenId .= chr(rand(65,90));
                $tokenId .= "-";
                for($i=0; $i<4; $i++) $tokenId .= rand(0,9);

                $iat = time();
                
                $content = array('tokenId'=>$tokenId, 'username'=>$username, 'iat'=>$iat);
                $payload = json_encode($content);
                $enc_payload = base64_encode($payload);
                
                $signature = Hash::create($enc_payload);
                return $enc_payload.".".$signature;
            }
        }

        public static function verify(?string $token) {
            if(array_search($token, self::$revokedTokens, true) >= 0) return "token expired";
            $sep = strpos($token, ".");
            $payload = substr($token, 0, $sep);
            $dec_payload = base64_decode($payload);
            $dec_payload = json_decode($dec_payload);
            $signature = substr($token, $sep+1, strlen($token));

            if(Hash::create($payload) == $signature && time() - $dec_payload->iat < 600) {
                return TRUE;
            }

            return FALSE;
        }

        public static function extract(string $token) {
            $sep = strpos($token, ".");
            $payload = substr($token, 0, $sep);
            $dec_payload = base64_decode($payload);
            $dec_payload = json_decode($dec_payload);

            return array('tokenId'=>$dec_payload->tokenId, 'username'=>$dec_payload->username, 'iat'=>$dec_payload->iat);
        }

        public static function revoke(string $token) {
            $tokenId = self::extract($token)['tokenId'];

            array_push(self::$revokedTokens, $tokenId);
            return self::$revokedTokens;
        }
    }

    class User {
        public function signIn(string $username, string $password) {
            $password = hash(Hash::getHashAlgo(), $password);
            
            $conn = new Connection();

            if($result = $conn->query("SELECT * FROM users WHERE userName='$username' AND userPassword='$password'")) {
                $count = $result->num_rows;

                if($count==1){
                    $token = Token::generate($username);
                    $data = $result->fetch_assoc();

                    $token = generateToken($userId);
                    $profile = array(
                        'id'=>$data['userId'],
                        'name'=>$data['userName'],
                        'image'=>$data['userImg']
                    );

                    $response = array(
                        'status'=>TRUE,
                        'profile'=>$profile,
                        'token'=>$token
                    );
                    $result->free_result();
                    return $response;
                }
            }
            return FALSE;
        }

        public function signUp(string $username, string $password) {
            if(is_string($username) && is_string($password)) {
                $userId = sha1($username.time());
                $password = hash(Hash::getHashAlgo(), $password);

                $conn = new Connection();

                if($result = $conn->query("SELECT userName FROM users WHERE userName='$username'")) {
                    $count = $result->num_rows;
                    if($count==1) {
                        $result->free_result();
                        return FALSE;
                    }
                }

                if($conn->query("INSERT INTO users (userId, userName, userPassword) VALUES ('$userId', '$username', '$password')")) {
                    return TRUE;
                }
                return FALSE;
            }
        }
    }
?>