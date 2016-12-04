$(document).ready(function(){
	$('div').mouseenter(function(){
		$('div').fadeTo('fast',1);
	});
	$('div').mouseleave(function(){
		$('div').fadeTo('fast',1);
	});
});

var $email = $('#user-email');
if (localStorage.getItem("email")) {
	$email.text(localStorage.getItem("email"));
} else {
	$email.text("Please log in");
}

$.ajax({
    url: "https://cs408.herokuapp.com/api/usermarket",
    type: "GET",
    dataType : "json"
}).done(function( data, textStatus, request ) {
      console.log('get data: '+ JSON.stringify(data));
      data.forEach(function(item) {
          var itemHTML = '<img class="item-img" src="image/cars.jpg" alt="Cars" width="300" height="200"/>';
          itemHTML += '<h2>' + item.title + '</h2>';
          if (item.content) { itemHTML += '<h4>' + item.content + '</h4>'; }
          if (item.price) { itemHTML += '<h4>' + item.price.toString() + '</h4>'; }
          if (item.contact) { itemHTML += '<h4>' + item.contact + '</h4>'; }
          $('#post-list').append('<figure class="col-sm-4">' + itemHTML + '</figure>')

      })
  }).fail(function( xhr, status, errorThrown ) {
    alert( "Log in fail!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    // console.dir( xhr );
  }).always(function( xhr, status ) {
      console.log("The request is complete!");
  });
