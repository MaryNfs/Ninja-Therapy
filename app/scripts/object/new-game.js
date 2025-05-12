define("scripts/object/new-game.js", function(exports){
	var rotate = require("scripts/factory/rotate");
	var tween = require("scripts/lib/tween");
	// 41, 240, 175, 175
	exports = rotate.create("images/new-game.png", 400, 240, 175, 175, 1e-5, tween.exponential.co, 500);;

	return exports;
});
