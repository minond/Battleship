"use strict";

/**
 * represents a move
 */
var Shot = new Model({
	/**
	 * shot/move outcome
	 * @var enum
	 */
	outcome: Model.enum("hit", "miss"),

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
