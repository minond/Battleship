"use strict";

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

var find_game_piece_cell = function(table, piece) {
	var row = table.rows[ piece.y ];
	return row ? row.cells[ piece.x ] : null;
};

var handle_redraw = function() {
	var selector = Template("table[data-board_id='{__id}']", this),
		table = document.querySelector(selector), cells, cell, i , len;
	
	if (table) {
		cells = table.querySelectorAll("td");

		// clean up
		for (i = 0, len = cells.length; i < len; i++) {
			cells[ i ].className = "";
		}

		// pieces
		this.pieces.foreach(function(i, piece) {
			if (cell = find_game_piece_cell(table, piece)) {
				cell.classList.add("ship-piece");
			}
		});

		// shots
		this.shots.foreach(function(i, shot) {
			if (cell = find_game_piece_cell(table, shot)) {
				cell.classList.add("target-" + shot.outcome);
			}
		});
	} else {
		console.error("table not found for", this);
	}
};

window.addEventListener("load", function() {
	// dummy pieces
	myboard.pieces.create({ x: 1, y: 0 });
	myboard.pieces.create({ x: 2, y: 0 });
	myboard.pieces.create({ x: 3, y: 0 });

	myboard.pieces.create({ x: 7, y: 5 });
	myboard.pieces.create({ x: 7, y: 6 });
	myboard.pieces.create({ x: 7, y: 7 });

	myboard.pieces.create({ x: 6, y: 9 });
	myboard.pieces.create({ x: 7, y: 9 });
	myboard.pieces.create({ x: 8, y: 9 });
	myboard.pieces.create({ x: 9, y: 9 });

	myboard.pieces.create({ x: 12, y: 4 });
	myboard.pieces.create({ x: 12, y: 5 });
	myboard.pieces.create({ x: 12, y: 6 });
	myboard.pieces.create({ x: 12, y: 7 });
	myboard.pieces.create({ x: 12, y: 8 });

	myboard.pieces.create({ x: 17, y: 14 });
	myboard.pieces.create({ x: 17, y: 15 });
	myboard.pieces.create({ x: 17, y: 16 });
	myboard.pieces.create({ x: 17, y: 17 });
	myboard.pieces.create({ x: 17, y: 18 });

	myboard.shots.create({ x: 3, y: 0, outcome: Shot.outcome.hit });
	myboard.shots.create({ x: 5, y: 9, outcome: Shot.outcome.miss });
	myboard.shots.create({ x: 6, y: 9, outcome: Shot.outcome.hit });
	myboard.shots.create({ x: 7, y: 9, outcome: Shot.outcome.hit });
	myboard.shots.create({ x: 8, y: 9, outcome: Shot.outcome.hit });
	myboard.shots.create({ x: 9, y: 9, outcome: Shot.outcome.hit });
	myboard.shots.create({ x: 4, y: 0, outcome: Shot.outcome.miss });
	myboard.shots.create({ x: 4, y: 10, outcome: Shot.outcome.miss });
	myboard.shots.create({ x: 8, y: 12, outcome: Shot.outcome.miss });
	myboard.shots.create({ x: 3, y: 10, outcome: Shot.outcome.miss });
	myboard.shots.create({ x: 19, y: 2, outcome: Shot.outcome.miss });
	myboard.shots.create({ x: 5, y: 12, outcome: Shot.outcome.miss });
	myboard.shots.create({ x: 13, y: 9, outcome: Shot.outcome.miss });

	theirboard.shots.create({ x: 3, y: 10, outcome: Shot.outcome.hit });
	theirboard.shots.create({ x: 5, y: 19, outcome: Shot.outcome.miss });
	theirboard.shots.create({ x: 5, y: 13, outcome: Shot.outcome.miss });
	theirboard.shots.create({ x: 5, y: 14, outcome: Shot.outcome.hit });
	theirboard.shots.create({ x: 14, y: 14, outcome: Shot.outcome.hit });
	theirboard.shots.create({ x: 15, y: 14, outcome: Shot.outcome.miss });
	theirboard.shots.create({ x: 6, y: 13, outcome: Shot.outcome.miss });
	theirboard.shots.create({ x: 16, y: 13, outcome: Shot.outcome.miss });
	theirboard.shots.create({ x: 14, y: 3, outcome: Shot.outcome.hit });
	theirboard.shots.create({ x: 7, y: 5, outcome: Shot.outcome.miss });
	theirboard.shots.create({ x: 11, y: 7, outcome: Shot.outcome.miss });

	Board.observe("after", "publish_redraw_request", handle_redraw);
	Boards.foreach(function(i, board) {
		board.publish_redraw_request();
	});

	// popup close window
	listen.click(".modal_close", function() {
		Modal.popup.hide();
	});

	Modal.popup.show(Template.list.desc.render(), "Code design", 600);
});
