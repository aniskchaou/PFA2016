<?php
include 'connect_db.php';
$select=$db->prepare('select * from user where presenter=1 ');
$select->execute();
$rooms=$select->fetchAll();
echo $rooms[0]['name'];


?>