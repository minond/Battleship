"use strict";

log.msg("starting game...");
var myboard = Boards.create({
	rows: 20,
	columns: 20
});





// document.querySelectorAll("[data-bindto]:not(script)");  

var parse_bind_prop = function(str) {
	var parts = str.split(".");
	return {
		model: parts[0],
		prop: parts[1],
		property: parts[1]
	};
};

listen.on("keyup", "[data-bindto]", function(ev) {
	Template.trigger = this;
	var info = parse_bind_prop(this.dataset.bindto);
	window[ info.model ].set(info.property, this.value);
});

