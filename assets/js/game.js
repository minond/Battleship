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
	 * hide message element
	 */
	hide_msg: Modal.hide.bind(Modal),

	/**
	 * continues game in progress or starts a new one
	 */
	__load__: function() {
		var newgame = this._persist_boards() === 0;

		if (newgame) {
			this._create_new_boards();
			this._show_new_game_message();
		} else {
			this._find_previous_boards();
		}

		this._persist_board_info();

newgame = true;
		if (newgame) {
			this._retrieve_game_progress();
		}
	},

	/**
	 * load game data
	 */
	_retrieve_game_progress: function($Ajax) {
		var progress = $Ajax.get({ url: this.progress_file }),
			ok = false;

		try {
			progress = JSON.parse(progress);
			ok = true;
		} catch (error) {
			this._msg("There was an error loading the game progress data: " +
				"<b>" + error.message + "</b>", 250);
		}

		if (ok && progress.pieces) {
		}
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

		setTimeout(this.hide_msg.bind(this), 1000);
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
	 * unsets persisted collection
	 * @param boolean dontreload
	 * @param Polypus.Service.$Persist
	 */
	reset: function(dontreload, $Persist) {
		for (var key in this.keys) {
			$Persist.unset_collection(this.keys[ key ]);
		}

		if (dontreload !== true) {
			window.location.reload();
		}
	},
}, {
	// message element "x" (close) click
	"click .modal_close": "hide_msg",

	// start new game trigger
	"click .start_game": function() {
		this.hide_msg();
		this._show_start_game_message();
	}
});
