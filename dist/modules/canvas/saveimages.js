
function canvas_to_image () {
	      //alert("qsd");
        var canvas=document.getElementById('temp-canvas');
    var dt = canvas.toDataURL('image/jpeg');
    document.getElementById('img').src = dt;

    var dl = document.createElement("a");
    dl.href = dt;
   // dl.innerHTML = "Download Image!";
    dl.download = true; // Make sure the browser downloads the image
    document.body.appendChild(dl); // Needs to be added to the DOM to work
   /* dl.click();  */// Trigger the click
     
}

function send_images_server() {

	canvas_to_image ();
    //alert("ok");
	    $.post({url: "recording_images.php"},{img:$("#img").attr("src")},  function(result){
      //  alert(result);
    });
}