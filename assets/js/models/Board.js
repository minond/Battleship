"use strict";

/**
 * represents a board
 */
var Board = new Model({
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
	owner: Model.enum("player", "opponent"),

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
		this.pieces = new Collection(Piece);
		this.shots = new Collection(Shot);
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
