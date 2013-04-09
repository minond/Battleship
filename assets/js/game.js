"use strict";

var my_board;

Battleship.Controller = new Polypus.Controller({
	/**
	 * file holding highscore data
	 * @var string
	 */
	highscores_file: "highscores.json",

	/**
	 * highscores display template
	 * @var string
	 */
	highscores_template:
		"<div class='scores'>{scores <div><span class='score'>{score}" +
		"</span><span class='nickname'>{nickname}</span></div>}</div>",

	/**
	 * display a message
	 * @param string message
	 * @param int width - optional popup element width
	 */
	show_message: function (message, title, width) {
		Modal.show(message, title || "Battleship", width || 150);
	},

	/**
	 * hide message element
	 */
	hide_mesage: function() {
		Modal.hide();
	},

	/**
	 * retrieve high scores data
	 * @return object
	 */
	get_high_scores: function($Ajax) {
		var scores = $Ajax.get({ url: this.highscores_file });

		try {
			scores = JSON.parse(scores);
			return scores;
		} catch (error) {
			console && console.error &&
				console.error(error.message);
		}
	},

	/**
	 * display highscore data
	 */
	show_high_scores: function() {
		var sorted, html, scores = this.get_high_scores();

		if (scores && scores.users) {
			sorted = scores.users.sort(function(a, b) {
				if (a.score === b.score)
					return 0;
				else if (a.score > b.score)
					return -1;
				else
					return 1;
			});

			html = Polypus.Template(this.highscores_template, {
				scores: sorted
			});

			this.show_message(html, "Highscores", 400);
		}
	}
}, {
	"load": "show_high_scores"
});
