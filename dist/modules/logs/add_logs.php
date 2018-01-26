
<?php

$myfile = fopen("newfile.txt", "a") or die("Unable to open file!");
fwrite($myfile, $_POST['log'].PHP_EOL);
fclose($myfile);








?>