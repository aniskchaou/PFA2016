    var session_id;
    var connected_user;
    var d = new Date();
    var pwd;  
    var type=0;
            document.getElementById('open-room').onclick = function() {
                
                disableInputButtons();
                
                 type=1;
                
                connection.open(document.getElementById('room-id').value, function() {
                    showRoomURL(connection.sessionid);
                    session_id=connection.sessionid;
                    //document.getElementById('room_id').value=session_id;
                    var frame = window.frames[0];
                    frame.init_room(connection.sessionid);
                });

                
                var nom_moderator = prompt("Please enter your name", "username");
               // document.getElementById('liste').innerHTML=nom+"(moderateur)";
                  //adduser (nom,'moderateur');

                  if (nom_moderator!=null) {connected_user=nom_moderator};
                     document.getElementById('name').innerHTML=connected_user;
                 
                     add_user_db (nom_moderator,'moderateur',connection.sessionid);
                  add_room_db(nom_moderator,connection.sessionid);
                   
                 add_log(d+" "+nom_moderator+" open room "+connection.sessionid+" \n ");
                 
                 add_record("<open-room>"+d+" "+nom_moderator+" open room "+connection.sessionid+"</open-room> \n ");
                  
            };

            document.getElementById('join-room').onclick = function() {
                disableInputButtons();
                
                password_exist (document.getElementById('room-id').value);
                type=0;
                
                  
                
            };

            document.getElementById('open-or-join-room').onclick = function() {
                disableInputButtons();
                connection.openOrJoin(document.getElementById('room-id').value, function(isRoomExists, roomid) {
                    if(!isRoomExists) {
                        showRoomURL(roomid);
                    }
                });
            };

            document.getElementById('btn-leave-room').onclick = function() {
                this.disabled = true;
               console.log('quit');
                if(connection.isInitiator) {
                    close_room(connected_user,session_id);
                    // use this method if you did NOT set "autoCloseEntireSession===true"
                    // for more info: https://github.com/muaz-khan/RTCMultiConnection#closeentiresession
                    connection.closeEntireSession(function() {
                       // document.querySelector('h1').innerHTML = 'Entire session has been closed.';
                    });
                     
                }
                else {
                    log_out(connected_user,connection.sessionid);
                    connection.leave();
                    
                }

            };


            document.getElementById('share-file').onclick = function() {
                var fileSelector = new FileSelector();
                fileSelector.selectSingleFile(function(file) {
                    connection.send(file);
                    add_record("<share-files>"+d+" sharing file"+file+"</share-files> \n ");
                });

            };

            document.getElementById('input-text-chat').onkeyup = function(e) {
                if (e.keyCode != 13) return;

                // removing trailing/leading whitespace
                this.value = this.value.replace(/^\s+|\s+$/g, '');
                if (!this.value.length) return;

                connection.send(this.value);
                appendDIV(this.value);
                this.value = '';
            };

            var chatContainer = document.querySelector('.chat-output');

            function appendDIV(event) {
                var div = document.createElement('div');
                div.innerHTML = event.data || event;
                chatContainer.insertBefore(div, chatContainer.firstChild);
                div.tabIndex = 0;
                div.focus();

                document.getElementById('input-text-chat').focus();
            }


            //gestion utilisateur
document.getElementById('getusers').onclick=function () {
  $.post("http://localhost/recording/dist/modules/users/retrieve_user_db.php",{session_id:connection.sessionid,username:connected_user} ,function(result){
       document.getElementById('users').innerHTML=result;
    });  
}


document.getElementById('getrooms').onclick=function () {
  $.post("http://localhost/recording/dist/modules/rooms/retrieve_rooms_db.php",{session_id:connection.sessionid} ,function(result){
       document.getElementById('rooms').innerHTML=result;
    });  
}

function join_list_room (id) {
     //connection.join(id);
     //window.location="index.html?roomid="+id;
     //clear_user();
     if(type==1)
     {
       connection.closeEntireSession(function() {
                       // document.querySelector('h1').innerHTML = 'Entire session has been closed.';
                       console.log('Entire session has been closed');
                       console.log('user '+connected_user);
                       console.log('session '+session_id);
                       close_room (connected_user,session_id);
                    });
     }else
     {
      connection.leave();
       log_out(connected_user,connection.sessionid);
     }
     document.getElementById('room-id').value=id;
      password_exist(id);
}

function clear_user() {
    
  if(connection.isInitiator) {
                    // use this method if you did NOT set "autoCloseEntireSession===true"
                    // for more info: https://github.com/muaz-khan/RTCMultiConnection#closeentiresession
                    connection.closeEntireSession(function() {
                       // document.querySelector('h1').innerHTML = 'Entire session has been closed.';
                       console.log('Entire session has been closed');
                       console.log('user '+connected_user);
                       console.log('session '+session_id);
                       close_room (connected_user,session_id);
                    });
                     //desactive_room(connection.sessionid);
                     alert('Entire session has been closed');
                       alert('user '+connected_user);
                       alert('session '+session_id);
                }
                else {
                    connection.leave();
                    log_out(connected_user,connection.sessionid);
                }   
}





