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
