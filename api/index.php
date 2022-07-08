<?php 
require_once $_SERVER['DOCUMENT_ROOT']."/router/router.php";
require_once $_SERVER['DOCUMENT_ROOT']."/api/db.php";
require_once $_SERVER['DOCUMENT_ROOT']."/api/api.php";
$url = key($_GET);

$_SESSION['ApiKey'] = base64_encode($_SERVER['REMOTE_ADDR']);
$_SESSION['db'] = $db;
if($_POST['api_key'] != $_SESSION['ApiKey']){
    exit('{"error":"Invalid api_key!"}');
}

$r = new Router();
$r->addRoute("getNews", "modules/getNews.php");

$r->addRoute("verifyAdmin", "modules/verifyAdmin.php");
$r->addRoute("getAdministrators", "modules/getAdministrators.php");
$r->addRoute("addAdministrators", "modules/addAdministrators.php");
$r->addRoute("deleteAdministrators", "modules/deleteAdministrators.php");
$r->addRoute("addNews", "modules/addNews.php");
$r->addRoute("editNews", "modules/editNews.php");
$r->addRoute("deleteNews", "modules/deleteNews.php");

$r->route($url);
?>