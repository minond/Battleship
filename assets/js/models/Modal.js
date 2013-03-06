"use strict";

var Modal = new Polypus.Model({ singleton: true }, {
	/**
	 * header text
	 * @var string
	 */
	head: "",

	/**
	 * body text
	 * @var string
	 */
	body: "",

	/**
	 * popup width
	 * @var int
	 */
	width: null,

	/**
	 * popup height
	 * @var int
	 */
	height: null,

	/**
	 * css display value
	 * @var enum
	 */
	display: Polypus.Model.enum("block", "none"),

	/**
	 * auto hides popup
	 */
	__init__: function() {
		this.hide();
	},

	/**
	 * display popup message
	 * @param string body
	 * @param string head
	 * @param int width
	 * @param int height
	 */
	show: function(body, head, width, height) {
		this.set_body(body);
		this.set_head(head);
		this.set_width(width);
		this.set_height(height);
		this.set_display("block");

		document.body.style.overflowY = "hidden";
		window.scrollTo(0, 0);
	},

	/**
	 * hide popup message
	 */
	hide: function() {
		this.set_display("none");
		document.body.style.overflowY = "";
	}
});
