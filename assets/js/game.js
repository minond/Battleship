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


var ViewModel = new Polypus.Model({
	clicks: 0,
	add_click: function() {
		this.clicks++;
	},
	remove_click: function() {
		this.clicks--;
	},
	reset_clicks: function() {
		this.clicks = 0;
	},
	too_many_clicks: function() {
		return this.clicks > 3;
	}
}, { singleton: true });


var Service = function() {};

var Persistant = new Service(function($eventuum) {
	var me = this;

	$eventuum.unload(function() {
		me.save(me.data.__id, me.data);
	});
});




var ReportTab = new Polypus.Model({
	title: "",
	template: "",
	complete: false,
	loaded: false
});

var ReportSections = new Polypus.Collection(ReportTab);

var Settings = new Polypus.Model({
	name: "",
	sayhi: function() {
		if(this.name)
		alert("my name is " + this.name);
	},
	randname: function() {
		this.set_name("random stuff, " + Math.random());
	},
	type: Polypus.Model.enum("lead", "contact", "account")
}, { mixin: [ ReportTab ], singleton: true });

var DetailField = new Polypus.Model({
	id: "",
	label: "",
	type: Polypus.Model.enum("sum", "avg", "min", "max")
});

var Details = new Polypus.Model({
	fields: new Polypus.Collection(DetailField)
}, { mixin: [ ReportTab ], singleton: true });

