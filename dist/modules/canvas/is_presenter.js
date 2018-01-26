function is_presenter () {
	
	$.post("http://localhost/recording/dist/modules/canvas/is_presenter.php",function(result){
    if(result==connected_user)
    {
    	$('#widget-container').show();
    }else
    {
    	$('#widget-container').hide();
    }
    
    });
}