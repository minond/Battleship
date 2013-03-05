"use strict";

battleship.myboard = battleship.Boards.create({
	title: "Player 1",
	rows: 20,
	columns: 20,
	owner: battleship.Board.owner.player
});

battleship.Battleship = new Polypus.Controller({}, {
	"mouseover table.board.player tr td": function(mouse, el) {
		console.log(mouse, el);
	}
});

Polypus.eventuum.load(function() {
	// battleship.Modal.show(
		// Polypus.Template.tmpl.player_name.render(battleship.myboard), "Battleship", "auto");
	// Polypus.adjutor.dataset(
		// document.getElementById("player_name"), "model", battleship.myboard);
});
