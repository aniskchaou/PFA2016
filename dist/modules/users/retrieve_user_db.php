<?php
include 'connect_db.php';
include 'room_is_free.php';
$select=$db->prepare('select * from user where room_id=?');
$select->execute( array($_POST['session_id']));
$kickout="<img src='http://localhost/recording/img/kickout.png' height='30' width='30' />";
$presenter="<img src='http://localhost/recording/img/presenter.png' height='25' width='25' />";
$is_moderateur="(M)";
$users=$select->fetchAll() ;

//print_r($users);

//&& 
$users_exist=$select->rowCount();
if($users_exist==0)
{
echo "<b>il n'existe pas  d'utilisateur </b>";
}elseif (isset($_POST['username'])) {
	echo "<ul>";
	$presenter_name=ispresenter($db);
  	if($presenter_name==$_POST['username'])
	{   
       for ($i=0; $i <sizeof($users) ; $i++) { 
       	$presen="	<a href='#' onclick='setpresenter(".$users[$i]['id'].")'>".$presenter."</a>";
		if ($users[$i]['name']== $_POST['username']) {
		 echo "<li>".$users[$i]['name']." (you) (presenter)"."  </li>";
	   }else
	   {
          echo "<li>".$users[$i]['name']." ".$presen." </li>";
	   }
     }
	}else
	{
		for ($i=0; $i <sizeof($users) ; $i++) { 
       	if ($users[$i]['name']== $_POST['username']) {
		 echo "<li>".$users[$i]['name']." (you) "."  </li>";
	   }else
	   {
          echo "<li>".$users[$i]['name']."  </li>";
	   }
	}
	}


echo "<li>";


  }  
function ispresenter($dbb)
{
	$select=$dbb->prepare('select * from user where room_id=? and presenter=1');
$select->execute( array($_POST['session_id']));
$user=$select->fetchAll() ;
return $user[0]['name'];
}	

?>