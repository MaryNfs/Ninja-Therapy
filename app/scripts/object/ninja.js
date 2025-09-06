define("scripts/object/ninja.js", function(exports){
	var displacement = require("scripts/factory/displacement");
	var tween = require("scripts/lib/tween");
	
	exports = displacement.create("images/ninja.png", 244, 81, 315, -140, 315, 43, {
		show: tween.bounce.co,
		hide: tween.exponential.co
	}, 1e3);;

	return exports;
});
