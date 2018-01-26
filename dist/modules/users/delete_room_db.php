<?php
include 'connect_db.php';
$delete=$db->prepare('delete from room where name=?');
$delete->execute(array($_POST['session_id']));






?>