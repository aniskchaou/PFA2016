<?php
include 'connect_db.php';
$select=$db->prepare('select * from user where room_id=?');
$select->execute( array($_POST['session_id']));
$rooms=$select->fetchAll();
echo count($rooms)."";
if (count($rooms)==0) {
 $del=$db->prepare('delete from room where name=? ');
   $del->execute(array($_POST['session_id']));
    $del_usr=$del->fetchAll();

}	






?>