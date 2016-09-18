var $form = $('#login-form');

$form.on('submit', function(event) {
	event.preventDefault();
    console.log('clicked');
    var $email = $form.find('input[name=email]');
    var $password = $form.find('input[name=password]');
    
    //
	// $message.val('');
});
