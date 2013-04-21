"use strict";

var Tmpl = Polypus.Template.tmpl,
	Persist = Polypus.Service.api.get_service_from_cache("Persist");

/**
 * game/ui controller
 * @var Polypus.Controller
 */
Battleship.Game = new Polypus.Controller({
	collkey: "gameboards",
	computer_name: "Computer",
	board: {
		rows: 10,
		columns: 10
	},

	/**
	 * @var Collection[Battleship.Board]
	 */
	boards: new Polypus.Collection(Battleship.Board),

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
		// Icorporates HTML 5 audio tags, video tags, canvas, or local storage
		Persist.collection(this.collkey, Battleship.Game.boards);

		if (!Battleship.Game.boards.items.length) {
			this.my_board = this.boards.create({
				title: "Player 1",
				rows: this.board.rows,
				columns: this.board.columns,
				owner: Battleship.Board.owner.player
			});

			this.my_opponent = this.boards.create({
				title: this.computer_name,
				rows: this.board.rows,
				columns: this.board.columns,
				owner: Battleship.Board.owner.opponent
			});

			this.show_new_game_message();
		} else {
			this.my_board = Battleship.Game.boards.get_by_owner(
				Battleship.Board.owner.player);
			this.my_opponent = Battleship.Game.boards.get_by_owner(
				Battleship.Board.owner.opponent);
		}
	},

	/**
	 * shows the start game message
	 */
	show_new_game_message: function() {
		Battleship.Game.msg(Tmpl.player_name.render(), 250);
	},

	start_game: function() {
		this.msg(Tmpl.new_game_msg.render({
			opponent: this.computer_name,
			player: this.my_board.title
		}), "auto");

		setTimeout(this.hide_msg.bind(this), 1000);
	},

	/**
	 * unsets persisted collection
	 */
	reset_game: function() {
		Persist.unset_collection(this.collkey);
		window.location.reload();
	},

	/**
	 * show message
	 * @param string message
	 * @param int width - optional
	 */
	msg: function(message, width) {
		Modal.show(message, "Message", width || 150);
	}
}, {
	// message element "x" (close) click
	"click .modal_close": "hide_msg",

	// start new game trigger
	"click .start_game": function() {
		this.hide_msg();
		this.start_game();
	}
});
