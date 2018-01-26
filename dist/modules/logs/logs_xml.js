  $a=array();
  array_push($a,"blue");
  $doc = new DOMDocument(); 
  $doc->formatOutput = true; 
   
  $r = $doc->createElement( "logs" ); 
  $doc->appendChild( $r ); 
   
  for (var $i = 0; $i < a.length; $i++) {
   $name = $doc->createElement( "log" ); 
  $name->appendChild( 
  $doc->createTextNode($a[$i] ) ); 
  $r->appendChild( $name ); 
  }
  
   
  
  
  
   
  echo $doc->saveXML(); 
  $doc->save("write.xml") 