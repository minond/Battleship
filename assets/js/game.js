"use strict";

var Clipper = Battleship.Ships.get_by_name("Clipper");

var bmsg = function(message, width) {
	Modal.show(message, "Battleship", width || 150);
};

Battleship.GameController = new Polypus.Controller({}, {});

Battleship.Game = new Polypus.Service("Game", {
	boards: new Polypus.Collection(Battleship.Board)
});

Battleship.Game.boards.mine = Battleship.Game.boards.create({
	title: "Player 1",
	rows: 20,
	columns: 20,
	owner: Battleship.Board.owner.player
});




var Persist = Polypus.Service.api.get_service_from_cache("Persist");
var Sync = Polypus.Service.api.get_service_from_cache("Sync");
var Tabular = Polypus.Service.api.get_service_from_cache("Tabular");

var Tweet = new Polypus.Model({ message: "", author: "", datetime: {
	$set: function(date) {
		return new Date(date ? date : Date.now());
	}
} });
var Tweets = new Polypus.Collection(Tweet);

Persist.collection("Tweets", Tweets);


// Tweets.create({ author: "test", message: "hi" })
