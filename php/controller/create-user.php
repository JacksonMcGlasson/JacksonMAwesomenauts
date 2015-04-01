<?php

//getting information from other pages
require_once (__DIR__ . "/../model/config.php");

//filters login data
$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

//makes the cyrpt for the password
$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";

$hashedPassword = crypt($password, $salt);
//checks for users that already exist
//$use = $_SESSION["connection"]->query("SELECT username FROM users WHERE username='" . $username . "'");
//sends register info to user table if the username and email are not already being used
//if (!$use->num_rows > 0) {
$query = $_SESSION["connection"]->query("INSERT INTO users SET "
        . "username = '$username',"
        . "password = '$hashedPassword',"
        . "salt = '$salt',"
        . "exp = 0,"
        . "exp1 = 0,"
        . "exp2 = 0,"
        . "exp3 = 0,"
        . "exp4 = 0"
        
        );

$_SESSION["name"] = $username;
//checks if user was created successfully
if ($query) {
    //needed for ajax
    echo "true";
} else {
    echo $_SESSION["connection"]->error;
}
//} else {
//    echo "Username and/or email is already registered to an account";
//}
