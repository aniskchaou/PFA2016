<?php

include 'connect_db.php';
include '../users/room_is_free.php';
$select=$db->prepare('select * from room where active= ?');
$select->execute( array(1));
$lock="<img src='http://localhost/recording/img/lock.png' height='25' width='25' />";
$users=$select->fetchAll() ;
//print_r($users);
echo "<ul>";
for ($i=0; $i <sizeof($users) ; $i++) { 
	if ($users[$i]['name']!=$_POST['session_id']) {
		if($users[$i]['password']!='')
		{
		  echo "<li>".$users[$i]['name']."<button  onclick='join_list_room(".$users[$i]['name'].")' href='#'>join</button>".$lock."</li>";
		}else
		{
		  echo "<li>".$users[$i]['name']."<button  onclick='join_list_room(".$users[$i]['name'].")' href='#'>join</button></li>";
		}
		
	}
	
}
echo "<li>"

















?>