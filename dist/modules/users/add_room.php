<?php
include 'connect_db.php';
$insert=$db->prepare('insert into room (name,user,active,password) values(?,?,?,?)');
$insert->execute(array($_POST['session_id'] ,$_POST['username'] ,'1',''));
//echo "username  ".$_POST['username']."session_id  ".$_POST['session_id']."";
?>