"use strict";

/**
 * game/ui controller
 * @var Polypus.Controller
 */
Battleship.Game = new Polypus.Controller({
	/**
	 * collection kyes
	 * @var object
	 */
	keys: {
		boards: "gameboards",
		my_pieces: "my_pieces",
		op_pieces: "op_pieces",
		my_shots: "my_shots",
		op_shots: "op_shots"
	},

	/**
	 * data holding game progress information
	 * @var string
	 */
	progress_file: "./assets/js/progress.json",

	/**
	 * opponent's name
	 * @var string
	 */
	computer_name: "Computer",

	/**
	 * board definition
	 * @var object
	 */
	board: {
		rows: 10,
		columns: 10
	},

	/**
	 * @var Collection[Battleship.Board]
	 */
	boards: new Polypus.Collection(Battleship.Board),

	/**
	 * @var Battleship.State
	 */
	state: new Battleship.State,

	/**
	 * @var Battleship.Board
	 */
	my_board: null,

	/**
	 * @var Battleship.Board
	 */
	my_opponent: null,

	/**
	 * continues game in progress or starts a new one
	 */
	__load__: function() {
		this.state.message("Checking game state...");

		if (this._persist_boards() === 0) {
			this.state.message("Creating new game...");
			this._create_new_boards();
			this._show_new_game_message();
		} else {
			this.state.message("Retrieving game...");
			this._find_previous_boards();
			this._start_game();
		}

		this._persist_board_info();
	},

	_start_game: function($GameLogic) {
		// $GameLogic.initalize();
	},

	/**
	 * load game data
	 */
	_retrieve_new_game_progress: function($Ajax) {
		var ok = false, progress;

		this.state.message("Loading game progress data...");
		progress = $Ajax.get({ url: this.progress_file });

		try {
			progress = JSON.parse(progress);
			ok = true;
		} catch (error) {
			this._msg("There was an error loading the game progress data: " +
				"<b>" + error.message + "</b>", 250);
		}

		if (ok && progress.pieces) {
			this.state.message("Successfully retrieved data!");
			this._add_pieces_to(this.my_board, progress.pieces.player);
			this._add_pieces_to(this.my_opponent, progress.pieces.opponent);
			this.state.message("Progress loaded!");
		}
	},

	/**
	 * add game pieces to a board
	 * @param Battleship.Board
	 * @param array
	 */
	_add_pieces_to: function(board, pieces, $Battleship) {
		var ship, that = this;

		Polypus.adjutor.foreach(pieces, function(i, piece) {
			ship = $Battleship.Ships.get_by_name(piece.ship);

			if (ship) {
				board.pieces.create({
					ship: ship,
					orientation: piece.orientation,
					x: piece.x,
					y: piece.y
				});

				that.state.message(
					"Game piece added to board (" + board.title + ")");
			} else {
				that.state.error("Invalid ship: " + piece.ship);
			}
		});
	},

	/**
	 * @return void
	 */
	_find_previous_boards: function($Battleship) {
		this.my_board = this.boards.get_by_owner(
			$Battleship.Board.owner.player);
		this.my_opponent = this.boards.get_by_owner(
			$Battleship.Board.owner.opponent);
	},

	/**
	 * @return void
	 */
	_create_new_boards: function($Battleship) {
		this.my_board = this.boards.create({
			title: "Player 1",
			rows: this.board.rows,
			columns: this.board.columns,
			owner: $Battleship.Board.owner.player
		});

		this.my_opponent = this.boards.create({
			title: this.computer_name,
			rows: this.board.rows,
			columns: this.board.columns,
			owner: $Battleship.Board.owner.opponent
		});
	},

	/**
	 * load/save boards
	 * @return int - number of boards in cache
	 */
	_persist_boards: function($Persist) {
		$Persist.collection(this.keys.boards, this.boards);
		return this.boards.items.length;
	},

	/**
	 * load/save board pieces and shots
	 */
	_persist_board_info: function($Persist) {
		$Persist.collection(this.keys.my_pieces, this.my_board.pieces);
		$Persist.collection(this.keys.my_shots, this.my_board.shots);
		$Persist.collection(this.keys.op_pieces, this.my_opponent.pieces);
		$Persist.collection(this.keys.op_shots, this.my_opponent.shots);
	},

	/**
	 * shows the start game message
	 */
	_show_new_game_message: function($Tmpl) {
		this._msg($Tmpl.player_name.render(), 250);
	},

	/**
	 * starts a new game
	 */
	_show_start_game_message: function($Tmpl) {
		this._msg($Tmpl.new_game_msg.render({
			opponent: this.computer_name,
			player: this.my_board.title
		}), "auto");

		setTimeout(this._hide_msg.bind(this), 1000);
	},

	/**
	 * show message
	 * @param string message
	 * @param int width - optional
	 */
	_msg: function(message, width) {
		Modal.show(message, "Message", width || 150);
	},

	/**
	 * hide message element
	 */
	_hide_msg: Modal.hide.bind(Modal),

	/**
	 * unsets persisted collection
	 * @param boolean dontreload
	 * @param Polypus.Service.$Persist
	 */
	_reset: function(dontreload, $Persist) {
		for (var key in this.keys) {
			$Persist.unset_collection(this.keys[ key ]);
		}

		if (dontreload !== true) {
			window.location.reload();
		}
	},
}, {
	// message element "x" (close) click
	"click .modal_close": "_hide_msg",

	// start new game trigger
	"click .start_game": function() {
		this._hide_msg();
		this._show_start_game_message();
		this._retrieve_new_game_progress();
		this._start_game();
	},

	// reset button
	"click #reset_game": function() {
		this._reset();
	}
});
