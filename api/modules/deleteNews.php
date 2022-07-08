<?php 
$api = new Api(null);
if(isset($_POST)){
    $id = $_POST['id'];
    $gameName = $_POST['gameName'];

    $res = mysqli_query($_SESSION['db'],"DELETE FROM `".$gameName."` WHERE `id` = $id");
    if($res){
        $api->add('res', true);
    }else{
        $api->add('res', false);
    }
    $api->returnRes();
}
?>