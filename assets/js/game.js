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
var TaskManager = new Polypus.Controller(
	{
		__init__: function(s, $Tabular, $Sync) {
			$Tabular.on("add_todo", Todos.create.bind(Todos));
			$Tabular.on("remove_todo", this.remove_todo.bind(this));
			Todos.observe("add", $Sync.synchronize.bind($Sync));
			Todos.observe("remove", function(instance) {
				$Tabular.trigger("remove_todo", [instance.__id]);
			});
			$Tabular.on("say_hi", function() {
				console.log("someone has logged in!");
			});
		},
		__load__: function() {
			for (var i = 0; i < 3; i++)
				this.add_random_todo();
		},
		say_hi: function($Tabular) {
			$Tabular.trigger("say_hi");
		},
		add_random_todo: function(s, $Tabular, $Sync) {
			var todo = Todos.create({
				label: Math.random().toString().substr(3, 10),
				duedate: +("1" + Math.random().toString().substr(3, 12))
			});

			$Sync.synchronize(todo);
			$Tabular.trigger("add_todo", [ todo.raw(true) ]);
		},
		remove_todo: function(id) {
			 var todo = Todos.get_by_id(id);
			 if (todo) todo.remove();
		},
		edit_todo: function(id) {
			var todo, input = document.getElementById("todo_editor");
			if (input) {
				todo = Todos.get_by_id(id);

				if (todo) {
					input.style.display = "";
					input.focus();
					Polypus.adjutor.dataset(input, "model", todo);
					input.value = todo.get_label();
				}
			}
		}
	},
	{
		"click button[id='add_todo']": function(click, btn) {
			this.add_random_todo();
		},
		"click span[x-bind-delete-task]": function(click, span) {
			this.remove_todo(span.parentNode.dataset.taskId);
		},
		"click span[x-bind-edit-task]": function(click, span) {
			// this.edit_todo(span.parentNode.dataset.taskId);
		},
		"keydown #todo_editor": function(keydown, input) {
			if (keydown.keyCode === 13) {
				Todos.create({
					label: input.value,
					duedate: Date.now()
				});
				input.value = "";
			}
		},
		"load window": function() {
			this.say_hi();
		}
	}
);
