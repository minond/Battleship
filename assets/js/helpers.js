"use strict";

/**
 * console output
 */
var log = {
	/**
	 * log output
	 * @param string*
	 */
	msg: function() {
		console.log.apply(console, Array.prototype.splice.call(arguments, 0));
	},

	/**
	 * warning output
	 * @param string*
	 */
	warn: function() {
		console.warn.apply(console, Array.prototype.splice.call(arguments, 0));
	},

	/**
	 * error output
	 * @param string*
	 */
	error: function() {
		console.error.apply(console, Array.prototype.splice.call(arguments, 0));
	}
};

/**
 * element helpers
 */
var elem = {
	/**
	 * retrieve an element
	 * @param string id
	 * @return Node
	 */
	byid: function(id) {
		var el;

		if (id instanceof Node) {
			el = id;
			return id;
		}
		else {
			el = document.getElementById(id);
			if (!el) {
				warn("no element found with an id of %s", id);
			}
		}

		return el;
	},

	/**
	 * show an element
	 * @param mixed string|Node
	 */
	show: function(el) {
		el = this.byid(el);

		if (el) {
			el.style.display = "initial";
		}
	},

	/**
	 * hide an element
	 * @param mixed string|Node
	 */
	hide: function(el) {
		el = this.byid(el);

		if (el) {
			el.style.display = "none";
		}
	},

	/**
	 * Node.MatchesSelector helper
	 * @param mixed string|Node el
	 * @param string selector
	 * @return boolean
	 */
	is: function(el, selector) {
		el = this.byid(el);
		
		if (el.webkitMatchesSelector) {
			return el.webkitMatchesSelector(selector);
		} else if (el.mozMatchesSelector) {
			return el.mozMatchesSelector(selector);
		} else if (el !== document) {
			log.error("missing selector match method");
		}
	},

	/**
	 * conver a string into a node tree
	 * @param string str
	 * @return Node
	 */
	to_node: function(str) {
		var el = document.createElement("div");
		el.innerHTML = str;
		return el.children[0];
	}
}

/**
 * event listeners
 */
var listen = {
	/**
	 * track bound events
	 * @var object
	 */
	bound: {},

	/**
	 * trigger an event
	 * @param string eventname
	 * @param Node node
	 * @param Event event
	 */
	trigger: function(eventname, node, event) {
		var ev;

		if (eventname in this.bound) {
			for (var i = 0, len = this.bound[ eventname ].length; i < len; i++) {
				ev = this.bound[ eventname ][ i ];

				if (elem.is(node, ev.selector)) {
					ev.action.call(node, event);
				}
			}
		}
	},

	/**
	 * bind any event
	 * @param string eventname
	 * @param string selector
	 * @param function action
	 */
	on: function(eventname, selector, action) {
		var that = this;

		if (!(eventname in this.bound)) {
			document.addEventListener(eventname, function(ev) {
				var max = 200, el = ev.target;

				// simulate bubbling
				while (el && el !== document.body && max) {
					max--;
					that.trigger(eventname, el, ev);
					el = el.parentNode;
				}
			});

			this.bound[ eventname ] = [];
		}

		this.bound[ eventname ].push({
			selector: selector,
			action: action
		});
	},

	/**
	 * self.on(click) shortcut
	 * @param string selector
	 * @param function action
	 */
	click: function(selector, action) {
		this.on("click", selector, action);
	}
};
