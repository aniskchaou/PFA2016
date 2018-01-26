<?php
include 'connect_db.php';
$insert=$db->prepare('insert into user (name,type,room_id,presenter) values(?,?,?,?)');
if($_POST['type']=='moderateur')
{
$insert->execute(array($_POST['username'] ,$_POST['type'],$_POST['session_id'],1 ));
}else
{
$insert->execute(array($_POST['username'] ,$_POST['type'],$_POST['session_id'],0));	
}



//echo "username  ".$_POST['username']."type  ".$_POST['type']."session_id  ".$_POST['session_id']."";
?>