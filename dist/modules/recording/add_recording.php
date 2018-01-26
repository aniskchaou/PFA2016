
<?php

$myfile = fopen("recordfiles/".$_POST['session_id']."/"."recording.xml", "a") or die("Unable to open file!");

fwrite($myfile, $_POST['log'].PHP_EOL);
fclose($myfile);








?>