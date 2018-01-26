<?php


 function writeXMLImages($session_id)
{
	$path='../recording/recordfiles/'.$session_id.'/';
$xml = new DOMDocument();
$xml_album = $xml->createElement("images");
$files1 = scandir($path);
for ($i=0; $i < sizeof($files1); $i++) { 
	if (!in_array($files1[$i],array(".","..","","images.xml","record_player.html","recording.xml","recording.zip"))) 
	{          if (strpos($files1[$i], 'webm') == false and strpos($files1[$i], 'xml') == false) {
				$xml_track = $xml->createElement("img");
                $xml_track->nodeValue =$files1[$i] ;
                $xml_album->appendChild( $xml_track );
                $xml->appendChild( $xml_album );
            }
           }
	}
$xml->save($path."images.xml");
}


 function writeXML($img)
{
$xml = new DOMDocument();
$xml_album = $xml->createElement("Album");
$xml_track = $xml->createElement("Track");
$xml_track->nodeValue =$img ;
$xml_album->appendChild( $xml_track );
$xml->appendChild( $xml_album );

$xml->save("image_to_64.xml");
}

 function readXML()
{
	$doc = new DOMDocument();
$doc->load( 'image_to_64.xml' );
 
$books = $doc->getElementsByTagName( "Track"); 

return $books;
}


?>