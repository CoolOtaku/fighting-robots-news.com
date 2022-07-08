<?php
    global $db;
    $Ip = "localhost";
    $UserName = "root";
    $Password = "";
    $DbName = "figh_fighting_robots_news";
    
    $db = mysqli_connect($Ip, $UserName, $Password, $DbName);
    mysqli_set_charset($db, "utf8mb4");
    
    if(!$db){
        die ("ПОМИЛКА підключення до БД!");
    }

    date_default_timezone_set('Europe/Kiev');

?>