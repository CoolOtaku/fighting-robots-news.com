<?php 
$api = new Api(null);
if(isset($_POST)){
    $news = json_decode($_POST['news']);

    $res = mysqli_query($_SESSION['db'],"UPDATE `".$news->gameName."` SET `title` = '".$news->title."', `img` = '".$news->img."', `description` = '".$news->description."', `date` = '".$news->date."', `text` = '".$news->text."' WHERE `id` = $news->id");
    if($res){
        $api->add('res', true);
    }else{
        $api->add('res', false);
    }
    $api->returnRes();
}
?>