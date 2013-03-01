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

var Todos = new Polypus.Collection(new Polypus.Model({
	label: "",
	duedate: {
		$get: function() {
			var mon = this.duedate.getMonth() + 1,
				dat = this.duedate.getDate(),
				fyr = this.duedate.getFullYear();

			mon = mon < 10 ? "0" + mon : mon;
			dat = dat < 10 ? "0" + dat : dat;

			return [ mon, dat, fyr ].join("/");
		},
		$set: function(val) {
			this.duedate = new Date(val);
		}
	}
}));
var TaskManager = new Polypus.Controller({
	__init__: function(s, $Tabular, $Sync) {
		var that = this;
		Polypus.adjutor.times(3, function() {
			that.add_random_todo();
		});

		$Tabular.on("add_todo", function(todo) {
			todo = Todos.create(todo);
			$Sync.synchronize(todo);
		});

		$Tabular.on("remove_todo", function(id) {
			var todo = Todos.get_by_id(id);
			if (todo) todo.remove();
		});
	},
	add_random_todo: function(s, $Tabular, $Sync) {
		var todo = ({
			label: Math.random().toString().substr(3, 10),
			duedate: +("1" + Math.random().toString().substr(3, 12))
		});

		todo = Todos.create(todo);
		$Sync.synchronize(todo);
		$Tabular.trigger("add_todo", [ todo.raw(true) ]);
	},
	remove_todo: function(id, $Tabular) {
		var todo = Todos.get_by_id(id);
		if (todo) {
			todo.remove();
			$Tabular.trigger("remove_todo", [id]);
		}
	}
}, {
	"click button[id='add_todo']": function(click, btn) {
		this.add_random_todo();
	},
	"click span[x-bind-delete-task]": function(click, span) {
		this.remove_todo(span.parentNode.dataset.taskId);
	}
});












