<?php
include 'connect_db.php';
$select=$db->prepare('select * from room where name=?');
$select->execute($arrayName = array($_POST['session_id']));
$rooms=$select->fetchAll();
echo $rooms[0]['password'];





?>