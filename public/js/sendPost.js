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

if (localStorage.getItem('email')) {
    $('#login').text(localStorage.getItem('email'));
} else {
    window.location.href = "index.html";
}

$(document).ready(function(){
    $("#login").click(function(){
        if (localStorage.getItem('email')) {
            window.location.href = "userpage.html";
        } else {
            $('#id01').css({display: 'block'});
        }
    });
});

var $form = $('#postMarket-form');

$form.on('submit', function(event) {
	event.preventDefault();

    var $Title = $form.find('textarea[name=Title]');
    var $Description = $form.find('textarea[name=Description]');
    var $Price = $form.find('textarea[name=Price]');
    var $Contact = $form.find('textarea[name=Contact]');

    console.log('clicked email: ' + $Title.val() + ' password: ' + $Description.val() + ' '  + $Price.val() + ' ' + $Contact.val());


    $.ajax({
        url: "https://cs408.herokuapp.com/api/market",
        // url: "http://localhost:3001/api/market",
        headers: {
            "Auth":localStorage.auth
        },
        data: {
            title: $Title.val(),
            content: $Description.val(),
            price: $Price.val(),
            contact: $Contact.val(),

        },
        type: "POST"
    }).done(function( data, textStatus, request ) {
          //TODO: deal with the success situation, store the token to localstorage
          window.location.href = "postPage.html";
        //   window.location.href = "userpage.html";
    }).fail(function( xhr, status, errorThrown ) {
          //TODO: deal with the success situation
        alert( "Post message fail!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        // console.dir( xhr );
    }).always(function( xhr, status ) {
          console.log("The request is complete!");
        // alert( "The request is complete!" );
      });
});
