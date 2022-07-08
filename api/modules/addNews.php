<?php 
$api = new Api(null);
if(isset($_POST)){
    $news = json_decode($_POST['news']);

    $res = mysqli_query($_SESSION['db'],"INSERT INTO `".$news->gameName."` (`title`, `img`, `description`, `date`, `text`) VALUES ('".$news->title."', '".$news->img."', '".$news->description."', '".$news->date."', '".$news->text."')");
    if($res){
        $api->add('res', true);
    }else{
        $api->add('res', false);
    }
    $api->returnRes();
}
?>