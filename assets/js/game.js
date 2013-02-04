"use strict";

/*
var Boards, Board, myboard;

Board = new Model({
	rows: 0,
	columns: 0
});

Boards = new Collection(Board);

myboard = Boards.create({
	rows: 20,
	columns: 20
});
*/

Template.config.load.auto = false;

var board_holder, generate_game_board = function(width, height, type) {
	var tablestr = [ "<table class='board ", type, "'>" ];

	for (var i = 0; i < width; i++) {
		tablestr.push("<tr>");
		for (var j = 0; j < height; j++) {
			tablestr.push("<td></td>");
		}
		tablestr.push("</tr>");
	}

	tablestr.push("</table>");
	return tablestr.join("");
};

window.onload = function() {
	board_holder = document.getElementById("board_holder");
	board_holder.innerHTML = generate_game_board(10, 10, "player");
};
