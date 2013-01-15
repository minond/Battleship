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
	new Image(url);
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
