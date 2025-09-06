define("scripts/object/home-mask.js", function(exports){
	var displacement = require("scripts/factory/displacement");
	var tween = require("scripts/lib/tween");
	
	exports = displacement.create("images/home-mask.png", 640, 183, 0, -183, 0, 0, tween.exponential.co, 1e3);;

	return exports;
});
