<?php
include 'connect_db.php';
$select=$db->prepare('update  room set password=? where name=?');
$select->execute( array($_POST['password'],$_POST['session_id']));


?>