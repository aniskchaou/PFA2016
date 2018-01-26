
<?php

include 'connect_db.php';
$select=$db->prepare('select * from room ');
$select->execute();
$rooms=$select->fetchAll();




for ($i=0; $i <sizeof($rooms) ; $i++) { 
	$select_users=$db->prepare('select * from user where room_id=?');
   $select_users->execute( array($rooms[$i]['name']));
   $users=$select_users->fetchAll();
   if (count($users)==0) {
   	$delete_room=$db->prepare('delete from room where name=?');
   $delete_room->execute( array($rooms[$i]['name']));
   $selec=$db->prepare('delete from user where room_id=? ');
   $selec->execute(array($rooms[$i]['name']));
    $del_usr=$selec->fetchAll();
   }
}


$select=$db->prepare('select * from user');
$select->execute();
$users_no_room=$select->fetchAll();

for ($i=0; $i <sizeof($users_no_room) ; $i++) { 
 $select_rooms=$db->prepare('select * from room where name=?');
 $select_rooms->execute(array($users_no_room[$i]['room_id']));
$rooms_check=$select_rooms->fetchAll();

if (count($rooms_check)==0) {
   $selec=$db->prepare('delete from user where room_id=? ');
   $selec->execute(array($users_no_room[$i]['room_id']));
}
}
?>