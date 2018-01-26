function setpresenter(id) {
	//alert(id+'is presenter');
		$.post("http://localhost/recording/dist/modules/users/set_user_presenter.php",{id_user:id},function(result){
     
    //var input="<input id='pass' type='hidden' value='"+result+"'/>"
       //alert(result);
     // document.getElementById("pwd").innerHTML=input;
        document.getElementById("getusers").innerHTML.click();
      
    });
}