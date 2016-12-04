var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (localStorage.getItem('email')) {
//         window.location.href = "userpage.html";
//     } else {
//         if (event.target == modal) {
//             modal.style.display = "none";
//         }
//     }
// }

$(document).ready(function(){
    $("#login").click(function(){
        if (localStorage.getItem('email')) {
            window.location.href = "userpage.html";
        } else {
            $('#id01').css({display: 'block'});
        }
    });

    $('#post-list').click(function(){
        $('#myModal').css({display: 'block'});
        $('#img-large').attr('src',$('.item-img').attr('src') );
    });

    $('.close').click(function(){
        $('#myModal').css({display: 'none'});
    });
});

if (localStorage.getItem('email')) {
    $('#login').text(localStorage.getItem('email'));
} else {
    $('#post').hide();
}

// post-list
$.ajax({
    url: "https://cs408.herokuapp.com/api/market",
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
          $('#post-list').append('<div class="column">' + itemHTML + '</div>')

      })
  }).fail(function( xhr, status, errorThrown ) {
    alert( "Log in fail!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    // console.dir( xhr );
  }).always(function( xhr, status ) {
      console.log("The request is complete!");
  });

function w3_open() {
document.getElementById("mySidenav").style.display = "block";
document.getElementById("myOverlay").style.display = "block";
}
function w3_close() {
document.getElementById("mySidenav").style.display = "none";
document.getElementById("myOverlay").style.display = "none";
}

/////////////This is enlarger
// Get the modal

/////////////This is enlarger

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
        url: "https://cs408.herokuapp.com/api/login",
        // url: "http://localhost:3001/api/login",
        data: {
            email: $email.val(),
            password: $password.val()
        },
        type: "POST",
        dataType : "json"
    })// Code to run if the request succeeds (is done);
      // The response is passed to the function
      .done(function( data, textStatus, request ) {
          //TODO: deal with the success situation, store the token to localstorage
          console.log('data: '+ JSON.stringify(data));
          localStorage.setItem("auth", data.Auth);
          localStorage.setItem("email", data.email);

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
