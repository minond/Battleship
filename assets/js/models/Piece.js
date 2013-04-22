"use strict";

/**
 * represents an actual ship (piece) in use
 */
Battleship.Piece = new Polypus.Model({
	/**
	 * a reference to a Ship model. used to get information shared accross all
	 * shipts of the same type.
	 * @var string
	 */
	ship_name: null,

	/**
	 * ship orientation
	 */
	orientation: Polypus.Model.enum("horizontal", "vertical"),

	/**
	 * board coordinates
	 * @var int
	 */
	x: null,

	/**
	 * board coordinates
	 * @var int
	 */
	y: null,

	/**
	 * ship getter
	 * @return Battleship.Ship
	 */
	get_ship: function() {
		return Battleship.Ships.get_by_name(this.ship_name);
	}
});
