<?php
//gets information from other page
require_once (__DIR__ . "/Database.php");
session_start();
session_regenerate_id(true);
//sets neccesary variables
$path = "/JacksonMAwesomenauts/php/";

$host = "localhost";
$username = "root";
$password = "root";
$database = "awesomenauts_db";


//sets a connection to the Database
if (!isset($_SESSION["connection"])) {
    $connection = new Database($host, $username, $password, $database);
    $_SESSION["connection"] = $connection;
}
