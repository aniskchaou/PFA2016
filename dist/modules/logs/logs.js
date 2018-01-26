function add_log (log) {
	  $.post("http://localhost/recording/dist/modules/logs/add_logs.php",{log:log} ,function(result){
       //document.getElementById('users').innerHTML=result;
      export_as_text(connection.sessionid,log);
      export_as_xml(connection.sessionid);
      

    });

}

document.getElementById("getlogs").onclick = function() {

var a = document.getElementById('export_xml'); //or grab it by tagname etc
   var href = "http://localhost/recording/dist/modules/logs/"+connection.sessionid+".xml";
     a.setAttribute("href", href);
   	var a2 = document.getElementById('export_text'); //or grab it by tagname etc
   href2 = "http://localhost/recording/dist/modules/logs/"+connection.sessionid+".txt";
     a2.setAttribute("href", href2);

$.post("http://localhost/recording/dist/modules/logs/read_logs.php",function(result){

       document.getElementById("logs").innerHTML=result;
    });


};


function export_as_xml(session_id)
{
	
 $.post("http://localhost/recording/dist/modules/logs/logs_xml.php",{session_id:session_id} ,function(result){
  
 });
}


function export_as_text(session_id,log) {

 $.post("http://localhost/recording/dist/modules/logs/logs_txt.php",{log:log,session_id:session_id} ,function(result){
   
 });	
}