"use strict";

// ship selector click
listen.click("#ships .ship", function(event) {
	var ship = Ships.get_by_id(this.dataset.ship_id);

	if (ship) {
		console.log(ship);
		action.select_ship(ship);
	}
});

listen.on("mouseover", ".board.player td", function(event) {
	if (action.selected_ship) {
		console.log("showing %o over %o", action.selected_ship, event.target);
	}
});
