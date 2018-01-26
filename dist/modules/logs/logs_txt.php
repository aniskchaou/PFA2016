<?php
if (file_exists($_POST['session_id'].".txt")) {
$myfile = fopen($_POST['session_id'].".txt", "a") or die("Unable to open file!");
	# code...
}else
{
$myfile = fopen($_POST['session_id'].".txt", "w") or die("Unable to open file!");

}
fwrite($myfile, $_POST['log'].PHP_EOL);
fclose($myfile);

?>