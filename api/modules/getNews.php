<?php 
if(isset($_POST)){
	switch ($_POST['type']) {
		case 'byGame':
			ReturnByGame($_POST['gameName']);
			break;
		case 'byIdAndGame':
			ReturnByIdAndGame($_POST['id'], $_POST['gameName']);
			break;	
		case 'all':
			ReturnAll();
			break;
	}
}
function ReturnByGame($gameName){
	$news = mysqli_query($_SESSION['db'],"SELECT * FROM `$gameName` ORDER BY `id` DESC");
    $emparray = array();
    while($row = mysqli_fetch_assoc($news)){
        $emparray[] = $row;
    }
    $res = json_encode($emparray);
	exit($res);
}
function ReturnByIdAndGame($id, $gameName){
	$news = mysqli_query($_SESSION['db'],"SELECT * FROM `$gameName` WHERE `id` = $id");
	$row = mysqli_fetch_assoc($news);
    $res = json_encode($row);
	exit($res);
}
function ReturnAll(){
	$emparray = array();
	$news1 = mysqli_query($_SESSION['db'],"SELECT * FROM `cs-go` ORDER BY `id` DESC");
    $emparray = buildArr($news1, $emparray, 'cs-go');
	$news2 = mysqli_query($_SESSION['db'],"SELECT * FROM `dota-2` ORDER BY `id` DESC");
    $emparray = buildArr($news2, $emparray, 'dota-2');
	$news3 = mysqli_query($_SESSION['db'],"SELECT * FROM `lol` ORDER BY `id` DESC");
    $emparray = buildArr($news3, $emparray, 'lol');
	$news4 = mysqli_query($_SESSION['db'],"SELECT * FROM `valorant` ORDER BY `id` DESC");
    $emparray = buildArr($news4, $emparray, 'valorant');

	$res = json_encode($emparray);
	exit($res);
}
function buildArr($news, $emparray, $gameName){
    while($row = mysqli_fetch_assoc($news)){
		$row['gameName'] = $gameName;
        $emparray[] = $row;
    }
    return $emparray;
}
?>