"use strict";

/**
 * represents a ship "type"
 */
var Ship = new Model({
	/**
	 * the ships name
	 * @var string
	 */
	name: "",

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
	 * image souce
	 * @var string
	 */
	src: ""
});

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

/**
 * represents a board
 */
var Board = new Model({
	rows: 0,
	columns: 0
});
