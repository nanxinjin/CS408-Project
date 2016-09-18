var $form = $('#login-form');

$form.on('submit', function(event) {
	event.preventDefault();

    var $email = $form.find('input[name=email]');
    var $password = $form.find('input[name=password]');

    console.log('clicked email: ' + $email.val() + ' password: ' + $password.val());

    $.ajax({
        url: "https://cs408.herokuapp.com/api/login",
        data: {
            email: $email.val(),
            password: $password.val()
        },
        type: "POST",
        dataType : "json",
    })// Code to run if the request succeeds (is done);
      // The response is passed to the function
      .done(function( json ) {
          //TODO: deal with the success situation
          console.log('success login: ' + json);
      })
      // Code to run if the request fails; the raw request and
      // status codes are passed to the function
      .fail(function( xhr, status, errorThrown ) {
          //TODO: deal with the success situation
        alert( "Log in fail!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
      })
      // Code to run regardless of success or failure;
      .always(function( xhr, status ) {
          console.log("The request is complete!");
        // alert( "The request is complete!" );
      });
});
