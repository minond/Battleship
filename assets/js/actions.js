"use strict";

/**
 * general game actions
 */
var action = {};

/**
 * reference to Ship we're placing on the board
 * @var Ship
 */
action.selected_ship = null;

/**
 * used when starting a new game. selects a ship to be able to be placed on
 * the game board
 * @param Ship ship
 */
action.select_ship = function(ship) {
	log.msg("ship selected: %s", ship.get_name());
	this.selected_ship = ship;
};

action.show_help = function() {
	document.body.appendChild(elem.to_node(Modal.render({
		head: "Battleship",
		width: 500,
		body: HelpContent.render({
			ships: Ship.all()
		})
	})));
};
