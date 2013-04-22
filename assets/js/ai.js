"use strict";

Battleship.ComputerAI = new Polypus.Service("ComputerAI", {
	/**
	 * our target
	 * @var Battleship.Board
	 */
	player_board: null,

	/**
	 * reference to Battleship.Game.state
	 * @var Battleship.State
	 */
	state: null,

	/**
	 * information about the last shots
	 * @var array
	 */
	history: [],

	/**
	 * loads player's board
	 */
	__load__: function($Battleship) {
		this.state = $Battleship.Game.state;
		this.player_board = $Battleship.Game.boards.get_by_owner(
			Battleship.Board.owner.player);
	},

	/**
	 * @return object
	 */
	_find_best_shot: function() {
		var x, y, try_neighbour_for, coordinates = {
			x: null,
			y: null
		};

		if (!this.history.length) {
			coordinates = this._get_random_coordinates();
		} else {
			try_neighbour_for = this._get_last_hit();

			// try another random hit?
			if (!try_neighbour_for) {
				coordinates = this._get_random_coordinates();
			} else {
				// let's try getting the neighbours
				x = try_neighbour_for.x;
				y = try_neighbour_for.y;

				// to the right
				if (this._should_take_shot(x + 1, y))
					coordinates = { x: x + 1, y: y };
				// to the left
				else if (this._should_take_shot(x - 1, y))
					coordinates = { x: x - 1, y: y };
				// up
				else if (this._should_take_shot(x, y - 1))
					coordinates = { x: x, y: y - 1 };
				// down
				else if (this._should_take_shot(x, y + 1))
					coordinates = { x: x, y: y + 1 };
				// top right
				else if (this._should_take_shot(x + 1, y - 1))
					coordinates = { x: x + 1, y: y - 1 };
				// top left
				else if (this._should_take_shot(x - 1, y - 1))
					coordinates = { x: x - 1, y: y - 1 };
				// bottom right
				else if (this._should_take_shot(x + 1, y + 1))
					coordinates = { x: x + 1, y: y + 1 };
				// bottom left
				else if (this._should_take_shot(x - 1, y + 1))
					coordinates = { x: x - 1, y: y + 1 };
				// another random hit
				else {
					try_neighbour_for.ignore = true;
					coordinates = this._get_random_coordinates();
				}
			}
		}

		return coordinates;
	},

	/**
	 * @return object
	 */
	_get_random_coordinates: function() {
		var coordinates, max = 500;

		while (!coordinates && max--) {
			coordinates = this.player_board.get_random_coordinates();

			if (!this._should_take_shot(coordinates.x, coordinates.y)) {
				coordinates = false;
			}
		}

		return coordinates;
	},

	/**
	 * returns true if a shot should be made on given coordinates
	 * @param int x
	 * @param int y
	 * @return boolean
	 */
	_should_take_shot: function(x, y) {
		return this._valid_coordinates(x, y) && !this._has_taken_shot_before(x, y);
	},

	/**
	 * returns true if shot can be made on given coordinates
	 * @param int x
	 * @param int y
	 * @return boolean
	 */
	_valid_coordinates: function(x, y) {
		return x < this.player_board.columns && y < this.player_board.rows;
	},

	/**
	 * returns coordinates for last successfull hit
	 * @return object
	 */
	_get_last_hit: function() {
		var len, i;

		for (i = 0, len = this.history.length; i < len; i++) {
			if (this.history[ i ].hit === true && this.history[ i ].ignore !== true) {
				return this.history[ i ];
			}
		}
	},

	/**
	 * checks if shots has been taken
	 * @param int x
	 * @param int y
	 * @return boolean
	 */
	_has_taken_shot_before: function(x, y) {
		var len, i, shot;

		for (i = 0, len = this.history.length; i < len; i++) {
			shot = this.history[ i ];

			if (shot.x === x && shot.y === y) {
				return true;
			}
		}

		return false;
	},

	/**
	 * computer ai shot
	 */
	fire: function($GameLogic) {
		var outcome, coordinates = this._find_best_shot();
		this.state.message("Computer firing...");

		outcome = $GameLogic.fire({
			x: coordinates.x,
			y: coordinates.y
		}, Battleship.Board.owner.opponent);

		// save history
		this.history.unshift({
			hit: outcome,
			x: coordinates.x,
			y: coordinates.y
		});
	}
});
