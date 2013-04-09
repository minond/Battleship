"use strict";

/**
 * represents a ship "type"
 */
Battleship.Ship = new Polypus.Model({
	/**
	 * the ships name
	 * @var string
	 */
	name: "",

	/**
	 * information about ship
	 * @var string
	 */
	description: "",

	/**
	 * ship's length
	 * @var int
	 */
	length: 0,

	/**
	 * ship's width
	 * @var int
	 */
	width: 0,

	/**
	 * image source
	 * @var string
	 */
	src: "",

	/**
	 * ship is available to player flag
	 * @var boolean
	 */
	available: true
});
