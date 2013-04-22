"use strict";

/**
 * represents a board
 */
Battleship.Board = new Polypus.Model({
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
		this.pieces = new Polypus.Collection(Battleship.Piece);
		this.shots = new Polypus.Collection(Battleship.Shot);
		this.pieces.observe("add",
			this.constructor.__specials__.__redraw__.bind(this));
		this.shots.observe("add",
			this.constructor.__specials__.__redraw__.bind(this));
	},

	/**
	 * should only call publish_redraw_request
	 */
	__redraw__: function() {
		Battleship.Game.state.info("Redrawing board (" + this.title + ")");
		this.publish_redraw_request();
	},

	/**
	 * acts as a dummy funtion used only by the observer
	 */
	publish_redraw_request: function() {},

	/**
	 * finds this board's output element (table node)
	 * @return Node
	 */
	get_element: function() {
		return document.querySelector(
			"table[data-board_id='" + this.__id + "']");
	},

	/**
	 * @param int x
	 * @param int y
	 * @return Node
	 */
	get_cell: function(x, y) {
		var el = this.get_element();
		return !el || !el.rows[ y ] ? null : el.rows[ y ].cells[ x ];
	},

	/**
	 * @return object
	 */
	get_random_coordinates: function() {
		return {
			x: Math.floor(Math.random() * this.columns),
			y: Math.floor(Math.random() * this.rows)
		};
	}
});
