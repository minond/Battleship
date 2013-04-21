"use strict";

/**
 * helper model
 */
Battleship.State = new Polypus.Model({
	/**
	 * displayed to user
	 * @var string
	 */
	messages: [],

	/**
	 * add standard message
	 * @param string text
	 */
	message: function(text) {
		this.add_messages({ text: text, type: "message" });
	},

	/**
	 * add info message
	 * @param string text
	 */
	info: function(text) {
		this.add_messages({ text: text, type: "info" });
	},

	/**
	 * add error message
	 * @param string text
	 */
	error: function(text) {
		this.add_messages({ text: text, type: "error" });
	},

	/**
	 * returns messages is reverse order
	 * @return array
	 */
	get_latest_messages: function() {
		var i, j, copy = [];

		for (j = 0, i = this.messages.length; i > 0; i--, j++) {
			copy[ i - 1 ] = this.messages[ j ];
		}

		return copy;
	},
});
