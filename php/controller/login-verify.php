<?php
//getting information from other page
require_once (__DIR__ . "/../model/config.php");

//authenticates that the user is actually logged in
function authenticateUser() {
    if (!isset($_SESSION["authenticated"])) {
        return false;
    } else {
        if ($_SESSION["authenticated"] != true) {
            return false;
        } else {
            return true;
        }
    }
}
//abcdefghij k l m n o p q r s t u v w x y z
//1234567891011121314151617181920212223242526