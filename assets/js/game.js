"use strict";

// log.msg("starting game...");
var myboard = Boards.create({
	rows: 20,
	columns: 20
});


var ui = {};

ui.Modal = new Model({
	head: "",
	body: "",
	width: "",
	display: Model.enum("block", "none"),
	show: function(body, head, width) {
		this.set_body(body);
		this.set_head(head);
		this.set_width(width);
		this.set_display("block");
		document.body.style.overflowY = "hidden";
	},
	hide: function() {
		this.set_display("none");
		document.body.style.overflowY = "";
	}
});

ui.modal = new ui.Modal({display: "none"});

// document.querySelectorAll("[data-bindto]:not(script)");  

var parse_bind_prop = function(str) {
	var parts = str.split(".");
	return {
		model: parts[0],
		prop: parts[1],
		property: parts[1]
	};
};

/*
listen.on("keyup", "[data-bindto]", function(ev) {
	Template.trigger = this;
	var info = parse_bind_prop(this.dataset.bindto);
	window[ info.model ].set(info.property, this.value);
});

listen.click("#ships .ship", function(event) {
	var ship = Ships.get_by_id(this.dataset.ship_id);

	if (ship) {
		console.log(ship);
		action.select_ship(ship);
	}
});

listen.on("mouseover", ".board.player td", function(event) {
	if (action.selected_ship) {
		console.log("showing %o over %o", action.selected_ship, event.target);
	}
});
*/
