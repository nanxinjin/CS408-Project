var modal = document.getElementById('id01');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

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
        headers: {
            "Auth":localStorage.auth
        },
        data: {
            title: $Title.val(),
            description: $Description.val(),
            price: $Price.val(),
            contact: $Contact.val(),

        },
        type: "POST",
        dataType : "json",

    })// Code to run if the request succeeds (is done);
      // The response is passed to the function
      .done(function( data, textStatus, request ) {
          //TODO: deal with the success situation, store the token to localstorage

        //   window.location.href = "userpage.html";
      })

      // Code to run if the request fails; the raw request and
      // status codes are passed to the function
      .fail(function( xhr, status, errorThrown ) {
          //TODO: deal with the success situation
        
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
