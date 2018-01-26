document.getElementById('recording').onclick = function() {
add_record("<recording>");
$.post("http://localhost/recording/dist/modules/recording/create_file.php",{session_id:connection.sessionid} ,function(result){
       document.getElementById('rooms').innerHTML=result;
    });


}

document.getElementById('stoprecording').onclick = function() {
	 add_record("</recording>");
//alert('qd');
$.post("http://localhost/recording/dist/modules/recording/add_recorded_files.php",{session_id:connection.sessionid} ,function(result){
       
       
       
       document.getElementById('downloadlink').innerHTML="<a download href='/recording/dist/modules/recording/recordfiles/"+connection.sessionid+"/recording.zip'>download zip</a>";
       
    });


}

function add_record (log) {
	$.post("http://localhost/recording/dist/modules/recording/add_recording.php",{session_id:connection.sessionid,log:log} ,function(result){
       //document.getElementById('rooms').innerHTML=result;
    });
}

