<?php

include 'connect_db.php';
$select=$db->prepare('select * from room where name= ?');
$select->execute( array($_POST['room_name']));

$rooms=$select->fetchAll();

if (count($rooms)>0) {
	echo "true";
}else
{
	echo "false";
}


?>
