//This is for user login
var modal = document.getElementById('id01');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//This is for full screen Information
function openNav() {
    document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}

var $form = $('#login-form');

$form.on('submit', function(event) {
	event.preventDefault();

    var $email = $form.find('input[name=email]');
    var $password = $form.find('input[name=password]');

    console.log('clicked email: ' + $email.val() + ' password: ' + $password.val());

//existing account:
// email: 111@tao.com
// password: tao

    $.ajax({
        // url: "https://cs408.herokuapp.com/api/login",
        url: "http://localhost:3001/api/login",
        data: {
            email: $email.val(),
            password: $password.val()
        },
        type: "POST",
        dataType : "json",
        success: function (data, status, xhr) {
            // console.log('data: ' + JSON.stringify(data));
            // console.log('status: ' + status);
            // console.log('xhr: ' + JSON.stringify(xhr));
            // console.log('xhr1: ' + xhr.getResponseHeader("Auth"));
        }
    })// Code to run if the request succeeds (is done);
      // The response is passed to the function
      .done(function( data, textStatus, request ) {
          //TODO: deal with the success situation, store the token to localstorage
        //   console.log('1 success login: ' + JSON.stringify(data));
        //   console.log('2 success login: ' + request.getResponseHeader('auth'));
        //   console.log('2.1 success login: ' + request.getResponseHeader('Auth'));
        //   console.log('3 success login: ' + request.getAllResponseHeaders());
        //   console.log('4 success login: ' + JSON.stringify(request));
        //   console.log('5 success login: ' + textStatus);
        //   console.log('6 success login: ' + data.getResponseHeader('Auth'));
          window.location.href = "userpage.html";
      })

      // Code to run if the request fails; the raw request and
      // status codes are passed to the function
      .fail(function( xhr, status, errorThrown ) {
          //TODO: deal with the success situation
        alert( "Log in fail!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        // console.dir( xhr );

      })
      // Code to run regardless of success or failure;
      .always(function( xhr, status ) {
          console.log("The request is complete!");
        // alert( "The request is complete!" );
      });
});
