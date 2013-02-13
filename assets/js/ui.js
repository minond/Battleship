"use strict";

/**
 * ui functions "namespace"
 */
var ui = {
	/**
	 * render like functions
	 */
	render: {}
};

/**
 * pre-load any resouce
 * @param string url
 */
ui.preload = function(url) {
	var img = new Image;
	img.src = url;
};

/**
 * image selector section
 */
ui.render.ship_selector = function() {
	var ships = Ship.all(),
		len = ships.length,
		el = elem.byid("ships"),
		i = 0;

	if (el) {
		for (; i < len; i++) {
			ui.preload(ships[ i ].src);
			el.innerHTML += ShipProfile.render(ships[ i ]);
		}

		setTimeout(function() { elem.show(el); }, 1000);
	}
	else {
		log.error("could not render ship selector, holder not found");
	}
};

ui.Modal = new Model({
	head: "",
	body: "",
	width: "",
	display: Model.enum("block", "none"),
	show: function(body, head, width) {
		this.set_body(body);
		this.set_head(head);
		this.set_width(width);
		this.set_display("block");
		document.body.style.overflowY = "hidden";
	},
	hide: function() {
		this.set_display("none");
		document.body.style.overflowY = "";
	}
});

ui.modal = new ui.Modal({display: "none"});
