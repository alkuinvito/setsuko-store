<?php
    // require_once 'config.php';
    require_once 'auth.php';

    class Test {
        public static function dumper($string) {
            echo "<br><b>".$string."</b><br>";
        }

        public static function mysqlConnect() {
            self::dumper(__METHOD__);
            $conn = new Connection();
            var_dump($conn);
            $conn->close();
        }

        public static function hashCreate() {
            self::dumper(__METHOD__);
            var_dump(Hash::create("test"));
        }

        public static function tokenGenerate() {
            self::dumper(__METHOD__);
            var_dump(Token::generate("test"));
        }

        public static function tokenVerify() {
            self::dumper(__METHOD__);
            var_dump(Token::verify("eyJ0b2tlbklkIjoiUFVHQy01NTM1LVZSTFgtMjMxNiIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTY2Nzk4MDk0OX0=.e2bf67da47631c4f6328659004a7595a4390fc3c9a973b12fadd921a9010c279"));
        }

        public static function tokenExtract() {
            self::dumper(__METHOD__);
            var_dump(Token::extract("eyJ0b2tlbklkIjoiUFVHQy01NTM1LVZSTFgtMjMxNiIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTY2Nzk4MDk0OX0=.e2bf67da47631c4f6328659004a7595a4390fc3c9a973b12fadd921a9010c279"));
        }

        public static function tokenRevoke() {
            self::dumper(__METHOD__);
            var_dump(Token::revoke("eyJ0b2tlbklkIjoiUFVHQy01NTM1LVZSTFgtMjMxNiIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTY2Nzk4MDk0OX0=.e2bf67da47631c4f6328659004a7595a4390fc3c9a973b12fadd921a9010c279"));
        }

        public static function userSignIn() {
            self::dumper(__METHOD__);
            $user = new User;
            var_dump($user->signIn("FMZMUE", "test"));
        }

        public static function userSignUp() {
            self::dumper(__METHOD__);
            $username = "";
            for($i=0; $i<6; $i++) {
                $username .= chr(rand(65,90));
            }

            $user = new User;
            var_dump($user->signUp($username, "test"));
        }

        public static function runTest() {
            $tests = array(
                Test::mysqlConnect(),
                Test::hashCreate(),
                Test::tokenGenerate(),
                Test::tokenVerify(),
                Test::tokenExtract(),
                Test::tokenRevoke(),
                Test::userSignIn(),
                Test::userSignUp()
            );

            foreach($tests as $test) {
                if(is_callable($test)) {
                    $test();
                }
            }
        }
    }

    Test::runTest();
?>