<?php


include 'zip_files.php';

//$files = array('recording/recording.xml','recording/record_player.html','recording/images.xml');

$my_files=add_files($_POST['session_id']);
 function add_files($session_id)
{ 
	copy("record_player.html","recordfiles/".$session_id."/record_player.html");
	$files = array();
	if ($handle = opendir("recordfiles/".$session_id)) {

    while (false !== ($entry = readdir($handle))) {

        if ($entry != "." && $entry != "..") {
            if (strpos($entry, 'png') !== false) {
            	$input="recordfiles/".$session_id."/".$entry;
            	array_push($files, $input);
            }elseif (strpos($entry, 'webm') !== false) {
                $input="recordfiles/".$session_id."/".$entry;
                array_push($files, $input);
            }
           
            
        }
    }
    array_push($files,"recordfiles/".$session_id."/recording.xml");
    array_push($files,"recordfiles/".$session_id."/record_player.html");
    array_push($files,"recordfiles/".$session_id."/images.xml");
    array_push($files,"recordfiles/".$session_id."/videos.xml");
    print_r($files);
    closedir($handle);
    return $files;
  }
}
videos_to_xml($_POST['session_id']);
 

 function videos_to_xml($session_id)
{
    $path='../recording/recordfiles/'.$session_id.'/';
$xml = new DOMDocument();
$xml_album = $xml->createElement("videos");
$files1 = scandir($path);
for ($i=0; $i < sizeof($files1); $i++) { 
    if (!in_array($files1[$i],array(".","..","","images.xml","record_player.html","recording.xml","recording.zip"))) 
    {          if(strpos($files1[$i], '.png') == false)
               { $xml_track = $xml->createElement("video");
                $xml_track->nodeValue =$files1[$i] ;
                $xml_album->appendChild( $xml_track );
                $xml->appendChild( $xml_album );
               }
           }
    }
$xml->save($path."videos.xml");
}



create_zip($my_files,"recordfiles/".$_POST['session_id'].'/recording.zip');









?>