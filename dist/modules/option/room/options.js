var content="<h2> Room Option</h2><br> Max users <br>" +
"<input id='max-users'/> Password <input id='password'/>"+
 "<button id='save-room'>enregitrer</button>";

 document.getElementById("getoptions").onclick = function() {
 	document.getElementById("option-rooms").innerHTML=content;



 	document.getElementById("save-room").onclick = function() {

    var password=document.getElementById("password").value;
    //alert("session "+session_id);
    //alert("password "+password);
   $.post("http://localhost/recording/dist/modules/option/room/crypt_room.php",{session_id:session_id,password:password},function(result){

       
    });
};

}


function password_exist (session_id) {
	$.post("http://localhost/recording/dist/modules/option/room/get_password.php",{session_id:session_id},function(result){
     
    //var input="<input id='pass' type='hidden' value='"+result+"'/>"
      alert(result);
     // document.getElementById("pwd").innerHTML=input;

      join_room (result);
    });
}


function join_room (pwd) {
  
	if(pwd!="")
                {  
                       
                    var input_password = prompt("Please enter the password", "******");
                       alert("input "+input_password+"password "+pwd);
                       if(input_password==pwd)
                         {
                              connection.join(document.getElementById('room-id').value);
                              session_id=document.getElementById('room-id').value;
                              var nom_user = prompt("Please enter your name", "username");
                              if (nom_user!=null) {connected_user=nom_user};
                              // adduser (nom,'utilisateur');
                              // alert(document.getElementById('room-id').value);
                              add_user_db (connected_user,'utilisateur',connection.sessionid);
                              add_log(d+" "+nom_user+" join room "+connection.sessionid+" \n ");
                              document.getElementById('name').innerHTML=connected_user;
                             // window.location="index.html?roomid="+connection.sessionid;
                             add_record("<open-room>"+d+" "+nom_user+" join room "+connection.sessionid+"</open-room> \n ");
                         }else
                         {
                            alert("mot de passe incorrect");
                         }

                     
                }else
                {
                    connection.join(document.getElementById('room-id').value);
                var nom_user = prompt("Please enter your name", "username");
                session_id=document.getElementById('room-id').value;
                if (nom_user!=null) {connected_user=nom_user};
                 // adduser (nom,'utilisateur');
                // alert(document.getElementById('room-id').value);
                add_user_db (connected_user,'utilisateur',connection.sessionid);
                add_log(d+" "+nom_user+" join room "+connection.sessionid+" \n ");
               // window.location="index.html?roomid="+connection.sessionid;
                document.getElementById('name').innerHTML=connected_user;
                add_record("<open-room>"+d+" "+nom_user+" join room "+connection.sessionid+"</open-room> \n ");
                }
}


