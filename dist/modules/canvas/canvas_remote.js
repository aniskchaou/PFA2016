document.getElementById('room-id-canvas').onkeyup = document.getElementById('room-id-canvas').onblur = function() {
    localStorage.setItem('canvas-designer-roomid', this.value);
};

if(localStorage.getItem('canvas-designer-roomid')) {
    document.getElementById('room-id-canvas').value = localStorage.getItem('canvas-designer-roomid');
}


document.getElementById('open-room-canvas').onclick = function() {
    var room_id = document.getElementById('room-id-canvas').value;
    if(!room_id.length) return alert('Please enter roomid.');
    
    this.disabled = true;
    
    con.open(room_id);
    
    this.parentNode.innerHTML = '<a href="#' + room_id + '" target="_blank">Please share this link</a>';
};

var con = new RTCMultiConnection();

con.socketURL = 'http://localhost:9001/';
//con.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
con.socketMessageEvent = 'canvas-designer';

con.enableFileSharing = false;
con.session = {
    data: true
};
con.sdpConstraints.mandatory = {
    OfferToReceiveAudio: false,
    OfferToReceiveVideo: false
};
if(location.hash.replace('#', '').length) {
    var room_id = location.hash.replace('#', '');
    con.join(room_id);
}

con.onUserStatusChanged = function(event) {
    var infoBar = document.getElementById('hide-on-datachannel-opened');
    if(event.status == 'online') {
        infoBar.innerHTML = event.userid + ' is <b>online</b>.';
    }

    if(event.status == 'offline') {
        infoBar.innerHTML = event.userid + ' is <b>offline</b>.';
    }

    numberOfConnectedUsers.innerHTML = con.getAllParticipants().length;
};

var numberOfConnectedUsers = document.getElementById('number-of-connected-users');
con.onopen = function(event) {
    var infoBar = document.getElementById('hide-on-datachannel-opened');
    infoBar.innerHTML = '<b>' + event.userid + '</b> is ready to collaborate with you.';

    //if(designer.pointsLength <= 0) {
        // make sure that remote user gets all drawings synced.
        setTimeout(function() {
            con.send('plz-sync-points');
        }, 1000);
    //}

    numberOfConnectedUsers.innerHTML = con.getAllParticipants().length;
};

con.onclose = con.onerror = con.onleave = function() {
    numberOfConnectedUsers.innerHTML = con.getAllParticipants().length;
};

con.onmessage = function(event) {
    if(event.data === 'plz-sync-points') {
        designer.sync();
        return;
    }

    designer.syncData( event.data );
};