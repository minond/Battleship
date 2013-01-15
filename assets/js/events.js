"use strict";

// ship selector click
listen.click("#ships .ship", function(event) {
	var ship = Ship.id(this.dataset.ship);

	if (ship) {
		action.select_ship(ship);
	}
});
