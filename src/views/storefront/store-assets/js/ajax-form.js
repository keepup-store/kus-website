$(function() {

	// Get the form.
	var form = $('#cart-form');

	// Get the messages div.
	var formMessages = $('.ajax-response');
	$(formMessages).addClass('d-none');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		var cartItems = JSON.parse(localStorage.getItem('cart_items')) || { items: [], subtotal: "0.00" };

		// Get the value of the "Your Name" field
    var name = $('#name').val();

    // Get the value of the "Phone Number" field
    var input = document.querySelector("#phone_number");

    // Get the intlTelInput instance
    var iti = window.intlTelInputGlobals.getInstance(input);

    // Get the full phone number
    var phoneNumber = iti.getNumber();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: {
				name,
				phone_number: phoneNumber,
				cart: JSON.stringify(cartItems.items)
			}
		})
		.done(function(response) {

			// clear cart

			// redirect to checkout page
			
		})
		.fail(function(data) {

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
			$(formMessages).removeClass('d-none');
		});
	});

});
