<?php


 function base64ToImage($file,$session_id)
{
	$path='../recording/recordfiles/'.$session_id.'/';
	$data = str_replace('data:image/jpeg;base64,', '', $file);
$data = str_replace(' ', '+', $data);
$data = base64_decode($data);
$file =  $path.uniqid().'.png';
$success = file_put_contents($file, $data);
return $file;
}









?>