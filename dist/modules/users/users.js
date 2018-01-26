


function add_user_db (username,type,session_id) {

     $.post("http://localhost/recording/dist/modules/users/add_user_db.php", {username: username,type:type,session_id:session_id}, function(result){
       //alert(result);
    });
}

function add_room_db (username,session_id) {
	 $.post("http://localhost/recording/dist/modules/users/add_room.php", {username: username,session_id:session_id}, function(result){
      // alert(result);
    });
}
function log_out (username,session_id) {
	$.post("http://localhost/recording/dist/modules/users/log_out.php", {username: username,session_id:session_id}, function(result){
      // alert(result);
    });
}

function close_room(username,session_id) {
	$.post("http://localhost/recording/dist/modules/users/delete_room_db.php", {session_id:session_id}, function(result){
      // alert(result);
    });

    log_out (username,session_id);
}

function delete_empty_room (session_id) {
  $.post("http://localhost/recording/dist/modules/users/delete_empty_room.php",{session_id:session_id},function(result){
     // alert(result);
    });
}

