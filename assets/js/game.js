"use strict";

// Write JavaScript code to get the user's log-in name and password and send
// them to the server for validation. The URL to use for this assignment is:
var LOGIN_URL = "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php",
	Ajax = Polypus.Service.api.get_service_from_cache("Ajax"),
	Persist = Polypus.Service.api.get_service_from_cache("Persist");

Polypus.eventuum.click(".modal_close", Modal.hide.bind(Modal));

// Add a button to your home page (near the log-in elements) that clears
// local storage.
Polypus.eventuum.click("#reset_btn", Persist.clear.bind(Persist));

Polypus.eventuum.load(function() {
	var login_info;

	if (window.location.href.match("index.html")) {
		// Log-in text fields and button, password field does not show
		// characters
		Modal.show(Polypus.Template.tmpl.player_login.render() , "Login");

		// Ajax to validate the user log-in. Near the log-in button, make an
		// element to display a short (~20 characters) message so that the user
		// cat be informed if the log-in fails.
		Modal.set_message("Enter your username and password.");
	} else if (window.location.href.match("game.html")) {
		// On your game page, use a script to retrieve the user log-in string
		// from local storage.
		login_info = Persist.get("2550timestamp");

		if (login_info) {
			login_info = login_info.split(" ");

			// Display the user name and timestamp string somewhere on the
			// game page.
			Modal.show(Polypus.Template.tmpl.login_information.render({
				username: login_info[0],
				timestamp: login_info[1],
			}) , "Login Information", 300);
		}
	}
});

Polypus.eventuum.click("#login_btn", function() {
	Ajax.post({
		url: LOGIN_URL,

		// Be sure to include the HTTP Content-Type header for the POST
		headers: { "Content-Type": "application/x-www-form-urlencoded" },

		// Use the POST method with two parameters: userName for the user name,
		// and password for the password.
		data: Polypus.Template("userName={u}&password={p}", {
			u: document.getElementById("username").value,
			p: document.getElementById("password").value
		}),

		before: function() {
			// Ajax to validate the user log-in. Near the log-in button, make
			// an element to display a short (~20 characters) message so that
			// the user can be informed if the log-in fails.
			Modal.set_message("Authenticating...");
		},

		after: function() {
			var login = JSON.parse(this.responseText);

			// The server will respond with a JSON object (in string form) that
			// has three elements: result, userName, and timestamp.  result
			// will be the string "valid" or the string "invalid". If result is
			// "invalid", the other two elements will be undefined. If result
			// is "valid", userName will be the login name and timestamp will
			// be a string with a date and time.
			if (login.result === "valid") {
				Modal.set_message("Successful login!");

				// If the password is correct, make a log-in info string that
				// is a concatentation of the user log-in name, a space, and
				// the timestamp string from the server. Store the log-in info
				// string in local storage with the key 2550timestamp
				Persist.set("2550timestamp", login.userName + " " + login.timestamp);

				// If the password is correct, save the login information in
				// local storage as described below and then take the user to
				// your game page.
				window.location.href = "/Battleship/game.html";
			} else {
				// If the password is not correct, stay on the same page and
				// put a message in the message element that says that the
				// password was incorrect.
				Modal.set_message("Invalid login!");
			}
		}
	});
});
