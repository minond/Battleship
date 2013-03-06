"use strict";

Battleship.Game = new Polypus.Controller({}, {});

Battleship.myboard = Battleship.Boards.create({
	title: "Player 1",
	rows: 20,
	columns: 20,
	owner: Battleship.Board.owner.player
});
