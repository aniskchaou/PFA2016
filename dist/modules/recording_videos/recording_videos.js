 // http://www.rtcmulticonnection.org/docs/constructor/
            var rmc = new RTCMultiConnection();
         
          
            var recorders = [];
            document.getElementById('recordAudioVideo').onclick = function() {
                var streams = rmc.streams.selectAll({
                    local: true
                });
                streams = streams.concat(rmc.streams.selectAll({
                    remote: true
                }));
                var button = this;
                if (button.innerHTML == 'Record Audio+Video+Screen') {
                    button.disabled = true;
                    streams.forEach(function(streamEvent) {
                        var recorder = RecordRTC(streamEvent.stream, {
                            type: 'video'
                        });
                        recorder.startRecording();
                        recorders.push(recorder);
                    });
                    setTimeout(function() {
                        button.innerHTML = 'Stop Recording Audio/Video';
                        button.disabled = false;
                    }, 3000);
                } else if (button.innerHTML == 'Stop Recording Audio/Video') {
                    recorders.forEach(function(recorder) {
                        recorder.stopRecording(function() {
                            appendRecordedVideo(recorder.blob);
                        });
                    });
                    recorders = [];
                    button.innerHTML = 'Record Audio+Video+Screen';
                }
            };
            var recordedVideos = document.getElementById('recorded-videos');
            function appendRecordedVideo(blob) {
                if(blob.video) {
                    blob = blob.video;
                }
                var video = document.createElement('video');
                video.controls = true;
                video.src = URL.createObjectURL(blob);
                recordedVideos.appendChild(video);
            }