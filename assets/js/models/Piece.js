"use strict";

/**
 * represents an actual ship (piece) in use
 */
var Piece = new Model({
	/**
	 * a reference to a Ship model. used to get information shared accross all
	 * shipts of the same type.
	 * @var Ship
	 */
	ship: Ship
});
