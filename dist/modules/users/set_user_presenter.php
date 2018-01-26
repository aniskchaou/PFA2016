<?php


include 'connect_db.php';
$delete=$db->prepare('update user set presenter=1  where id=?');
$delete->execute(array($_POST['id_user']));
$delete=$db->prepare('update user set presenter=0  where id<>?');
$delete->execute(array($_POST['id_user']));










?>