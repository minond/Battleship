"use strict";

/**
 * represents a board
 */
battleship.Board = new Polypus.Model({
	/**
	 * ui title
	 * @var string
	 */
	title: "",

	/**
	 * @var int
	 */
	rows: 0,

	/**
	 * @var int
	 */
	columns: 0,

	/**
	 * board owner
	 * @var enum
	 */
	owner: Polypus.Model.enum("player", "opponent"),

	/**
	 * @var Collection
	 */
	pieces: null,

	/**
	 * @var Collection
	 */
	shots: null,

	/**
	 * initializes pieces property
	 */
	__init__: function() {
		this.pieces = new Polypus.Collection(battleship.Piece);
		this.shots = new Polypus.Collection(battleship.Shot);
		this.pieces.observe("add",
			this.constructor.__specials__.__redraw__.bind(this));
		this.shots.observe("add",
			this.constructor.__specials__.__redraw__.bind(this));
	},

	/**
	 * should only call publish_redraw_request
	 */
	__redraw__: function() {
		this.publish_redraw_request();
	},

	/**
	 * acts as a dummy funtion used only by the observer
	 */
	publish_redraw_request: function() {}
});
