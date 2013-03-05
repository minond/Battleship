"use strict";

var coors = new Polypus.Model(
	{ singleton: true },
	{ x: 0, y: 0 }
);

var Clipper = battleship.Ships.get_by_name("Clipper");

var px2int = function(num) {
	return +num.replace(/px$/g, "");
};

var int2px = function(num) {
	return num + "px";
};

var shift_left_and_right = function(el, offset, repeat) {
	var gcs = getComputedStyle(el),
		width = px2int(gcs.width),
		height = px2int(gcs.height),
		goright = false,
		origoffset = offset,
		per75 = parseInt(offset * .75),
		per25 = parseInt(offset * .25),
		origs = {
			position: gcs.position,
			left: gcs.left,
			top: gcs.top
		};

	if (!offset) {
		offset = 5;
	}

	if (!repeat) {
		repeat = 1;
	}

	// center element
	el.style.position = "fixed";
	el.style.left = int2px(innerWidth / 2 - width / 2);
	el.style.top = int2px(innerHeight / 2 - height / 2);

	(function move_in_direction() {
		var cur_loc = px2int(el.style.left);

		el.style.left = int2px(cur_loc + (goright ? 1 : -1));

		if (!offset--) {
			if (!--repeat) {
				// reset original values
				el.style.position = origs.position;
				el.style.left = origs.left;
				el.style.top = origs.top;
			} else {
				offset = origoffset;
				setTimeout(move_in_direction, 10);
			}
		} else {
			if (offset == per25 || offset == per75) {
				goright = !goright;
			}
			setTimeout(move_in_direction, 10);
		}
	})();
};

battleship.myboard = battleship.Boards.create({
	title: "Player 1",
	rows: 20,
	columns: 20,
	owner: battleship.Board.owner.player
});

battleship.Battleship = new Polypus.Controller({}, {
	// onclick handlers for all table cells
	"click table.board.player tr td": function(mouse, el) {
		// Modifies the contents and style of a cell that the user clicks
		el.innerHTML = "...";
		el.className = "target-hit";

		// Displays a message in the document (not an alert) that includes
		// the table cell coordinates
		coors.set_x(el.cellIndex);
		coors.set_y(el.parentNode.rowIndex);
	},

	// Use HTML input elements and events in your game
	"click .ship button": function(click, btn) {
		var ship = battleship.Ships.get_by_id(btn.dataset.id);

		if (ship) {
			alert("Selected ship: " + ship.get_name());
		}
	}
});

Polypus.eventuum.load(function() {
	// Uses JS and CSS to position and animate an HTML element
	shift_left_and_right(document.getElementById("coor_information"), 75, 4);

	Clipper.observe("set", "name", function(prop, name) {
		alert("You just changed my name to " + name);
	});
});

