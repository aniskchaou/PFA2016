<?php

  $a=read_from_text($_POST['session_id']);
  print_r($a);
  $doc = new DOMDocument(); 
  $doc->formatOutput = true; 
   
  $r = $doc->createElement( "logs" ); 
  $doc->appendChild( $r ); 
   
   
  for ($i = 0; $i < sizeof($a); $i++) {
   $name = $doc->createElement( "log" ); 
  $name->appendChild( 
  $doc->createTextNode($a[$i] ) ); 
  $r->appendChild( $name ); 
  }
  
   
  
   
  echo $doc->saveXML(); 
  $doc->save($_POST['session_id'].".xml") ;




 function read_from_text($file)
{
  $a=array();
  $myfile = fopen($file.".txt", "r") or die("Unable to open file!");
while(!feof($myfile)) {
  array_push($a,fgets($myfile));  
}
fclose($myfile);

return $a;
}
  ?>