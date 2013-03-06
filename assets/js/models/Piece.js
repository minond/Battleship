"use strict";

/**
 * represents an actual ship (piece) in use
 */
Battleship.Piece = new Polypus.Model({
	/**
	 * a reference to a Ship model. used to get information shared accross all
	 * shipts of the same type.
	 * @var Ship
	 */
	ship: Battleship.Ship,

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
	y: null
});
