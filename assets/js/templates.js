"use strict";

// var ShipProfile = Template.get("ships"),
	// Modal = Template.get("modal"),
	// HelpContent = Template.get("help_content");
var Ships = new Collection(Ship);
var Boards = new Collection(Board);
var myboard = Boards.create({
	rows: 20,
	columns: 20
});
// var templates = Template.load(document);
// Template.config.load.auto = false;
