<?php
include 'connect_db.php';
$delete=$db->prepare('delete from user where name=? and room_id=?');
$delete->execute(array($_POST['username'] ,$_POST['session_id'] ));






?>