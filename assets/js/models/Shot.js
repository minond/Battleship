"use strict";

/**
 * represents a move
 */
battleship.Shot = new Polypus.Model({
	/**
	 * shot/move outcome
	 * @var enum
	 */
	outcome: Polypus.Model.enum("hit", "miss"),

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
