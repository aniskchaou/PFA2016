<?php

session_start();
//echo $_POST['session_id'];
$session_id=$_POST['session_id'];
$_SESSION["session_id"]=$session_id;
echo $_SESSION["session_id"];

?>