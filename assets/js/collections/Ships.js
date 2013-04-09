"use strict";

// var Ships = new Polypus.Collection(Ship);
Battleship.Ships = new Polypus.Collection(Battleship.Ship, {
	proto: {
		selection: function() {
			return this.find({
				available: true
			}, {
				$sort: "name"
			});
		}
	}
});
