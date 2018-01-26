<?php
include 'read_write_xml.php';
include 'base64_to_image.php';

$img=$_POST["img"];
session_start();
$sess=$_SESSION["session_id"];
recording_images($img,$sess);




 function recording_images($img,$sess)
{
writeXML($img);
$xml_file=readXML();
base64ToImage($xml_file->item(0)->nodeValue,$sess);
writeXMLImages($sess);
}





	?>