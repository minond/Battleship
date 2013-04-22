"use strict";

Battleship.GameLogic = new Polypus.Service("GameLogic", {
	/**
	 * @var object
	 */
	players: {
		player: Battleship.Board.owner.player,
		opponent: Battleship.Board.owner.opponent
	},

	/**
	 * player turn tracker
	 * @see Battleship.GameLogic.players
	 * @var string
	 */
	_turn_owner: null,

	/**
	 * @var string
	 */
	winner: null,

	/**
	 * display turn message
	 */
	_display_turn_message: function($Battleship) {
		var msg;

		switch (this._turn_owner) {
			case this.players.player:
				msg = "Your turn";
				break;

			case this.players.opponent:
				msg = "Waiting for opponent...";
				break;

			default:
				msg = "Whose turn is it anyway?";
				break;
		}

		$Battleship.Game.state.message(msg);
	},

	/**
	 * @param string known
	 * @return string
	 */
	_get_other_player: function(known) {
		return known === this.players.player ?
			this.players.opponent : this.players.player;
	},

	/**
	 * starts game
	 */
	initalize: function() {
		this._turn_owner = this.players.player;
		this._display_turn_message();
	},

	/**
	 * turn tick (move to next player)
	 */
	tick: function($Battleship) {
		this._turn_owner = this._get_other_player(this._turn_owner);
		this._display_turn_message();
	},

	/**
	 * can shooter fire?
	 * @param string shooter
	 * @return boolean - true: yes, they can fire
	 */
	can_fire: function(shooter) {
		return this._turn_owner === shooter;
	},

	/**
	 * winner!
	 * @param string shooter
	 */
	declare_winner: function(shooter, $Battleship) {
		var board = $Battleship.Game.boards.get_by_owner(shooter);
		this.winner = shooter;
		$Battleship.Game._msg(board.title + " is the winner!");
	},

	/**
	 * user/computer fires
	 * @param object coordinates
	 * @param string shooter
	 * @return mixed, boolean: shot's outcome, null: invalid shot (out of range,
	 *        not shooter's turn)
	 */
	fire: function(coordinates, shooter, $Battleship) {
		var notick = false, great_success, target_board, cell, shot,
			state = $Battleship.Game.state;

		if (this.can_fire(shooter)) {
			target_board = $Battleship.Game.boards.get_by_owner(
				this._get_other_player(shooter));

			// find target node, and check if it has anything
			cell = target_board.get_cell(coordinates.x, coordinates.y);

			if (cell) {
				if (cell.classList.contains("target")) {
					// cannot re-try shot
					notick = true;
					great_success = false;
					state.info("Cannot re-try shot, try again");
				} else {
					shot = {
						x: coordinates.x,
						y: coordinates.y
					};

					if (cell.classList.contains("ship-piece")) {
						great_success = true;
						shot.outcome = Battleship.Shot.outcome.hit;
					} else {
						great_success = false;
						shot.outcome = Battleship.Shot.outcome.miss;
					}

					target_board.shots.create(shot);

					// check for winner
					if (!target_board.get_element()
						.querySelectorAll("td.ship-piece:not(.target)")
						.length) {
						this.declare_winner(shooter);
						notick = true;
					}
				}
			} else {
				// where did you click?
				notick = true;
				state.error("Shot outside bounds");
			}

			// move to next turn?
			if (notick !== true) {
				this.tick();
			}
		} else {
			// not your turn
			great_success = null;
		}

		return great_success;
	}
});
