"use strict";

var Tabular = Polypus.Service.api.get_service_from_cache("Tabular");
var Persist = Polypus.Service.api.get_service_from_cache("Persist");
var Sync = Polypus.Service.api.get_service_from_cache("Sync");

var theirboard = Boards.create({
	title: "Your Opponent",
	rows: 20,
	columns: 20,
	owner: Board.owner.opponent
});

var myboard = Boards.create({
	title: "Player 1",
	rows: 20,
	columns: 20,
	owner: Board.owner.player
});

var BattleshipGame = Polypus.Service("BattleshipGame", {
	start_game: function(args, $BattleshipGame) {
		console.log(this, arguments, this === $BattleshipGame);
	}
});

var Battleship = new Polypus.Controller({
	selected: null,
	select: function(ship, $BattleshipGame) {
		console.log(arguments);
		this.selected = ship;
	}
}, {
	// select a ship to be added to the board
	"click #ships .ship": function(click, el) {
		var ship = Ships.get_by_id(el.dataset.shipId);
		this.select(ship);
		console.log(click, el, ship);
	},

	// hover a ship on the board
	"mouseover table.board.player tr td": function(mouse, el) {
		console.log(mouse, el);
	}
});
