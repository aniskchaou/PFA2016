var connection = new RTCMultiConnection();

            // by default, socket.io server is assumed to be deployed on your own URL
            connection.socketURL = 'http://localhost:9001';
           //connection.socketURL = '/';
            // comment-out below line if you do not have your own socket.io server
           // connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

            connection.socketMessageEvent = 'audio-video-file-chat-demo';

            connection.enableFileSharing = true; // by default, it is "false".

            connection.session = {
                audio: true,
                video: true,
                data: true
            };
           


          


            connection.sdpConstraints.mandatory = {
                OfferToReceiveAudio: true,
                OfferToReceiveVideo: true
            };

            connection.videosContainer = document.getElementById('videos-container');
            connection.onstream = function(event) {

               

                var width = parseInt(connection.videosContainer.clientWidth / 2) - 20;
                var mediaElement = getMediaElement(event.mediaElement, {
                    title: event.userid,
                    buttons: ['full-screen'],
                    width: width,
                    showOnMouseEnter: false
                });

                connection.videosContainer.appendChild(mediaElement);

                setTimeout(function() {
                    mediaElement.media.play();
                }, 5000);

                mediaElement.id = event.streamid;

                




            };

            connection.onstreamended = function(event) {
                var mediaElement = document.getElementById(event.streamid);
                if(mediaElement) {
                    mediaElement.parentNode.removeChild(mediaElement);
                }
            };

            connection.onmessage = appendDIV;
            connection.filesContainer = document.getElementById('file-container');

            connection.onopen = function() {
                document.getElementById('share-file').disabled = false;
                document.getElementById('input-text-chat').disabled = false;
                document.getElementById('btn-leave-room').disabled = false;

                //document.querySelector('h1').innerHTML = 'You are connected with: ' + connection.getAllParticipants().join(', ');
               //alert('You are connected with: ' + connection.getAllParticipants().join(', '));
              // document.getElementById('users').innerHTML=connection.getAllParticipants().join(', ');
            };

            connection.onclose = function() {
                if(connection.getAllParticipants().length) {
                    //document.getElementById('msg').innerHTML = 'You are still connected with: ' + connection.getAllParticipants().join(', ');
                 // alert('You are still connected with: ' + connection.getAllParticipants().join(', '));
                 //document.getElementById('users').innerHTML=connection.getAllParticipants().join(', ');
                }
                else {
                  //  document.getElementById('msg').innerHTML = 'Seems session has been closed or all participants left.';
                  // alert('Seems session has been closed or all participants left.');
                }
            };

            connection.onEntireSessionClosed = function(event) {
                document.getElementById('share-file').disabled = true;
                document.getElementById('input-text-chat').disabled = true;
                document.getElementById('btn-leave-room').disabled = true;

                document.getElementById('open-or-join-room').disabled = false;
                document.getElementById('open-room').disabled = false;
                document.getElementById('join-room').disabled = false;
                document.getElementById('room-id').disabled = false;

                connection.attachStreams.forEach(function(stream) {
                    stream.stop();
                });

                // don't display alert for moderator
                if(connection.userid === event.userid) return;
                document.querySelector('h1').innerHTML = 'Entire session has been closed by the moderator: ' + event.userid;
            };

            connection.onUserIdAlreadyTaken = function(useridAlreadyTaken, yourNewUserId) {
                // seems room is already opened
                connection.join(useridAlreadyTaken);
            };

            function disableInputButtons() {
                document.getElementById('open-or-join-room').disabled = true;
                document.getElementById('open-room').disabled = true;
                document.getElementById('join-room').disabled = true;
                document.getElementById('room-id').disabled = true;
            }
            
