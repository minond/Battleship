"use strict";

var Clipper = Battleship.Ships.get_by_name("Clipper");

var bmsg = function(message, width) {
	Modal.show(message, "Battleship", width || 150);
};

Battleship.GameController = new Polypus.Controller({}, {});

Battleship.Game = new Polypus.Service("Game", {
	boards: new Polypus.Collection(Battleship.Board)
});

Battleship.Game.boards.mine = Battleship.Game.boards.create({
	title: "Player 1",
	rows: 20,
	columns: 20,
	owner: Battleship.Board.owner.player
});
