"use strict";

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
