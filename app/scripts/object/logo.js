define("scripts/object/logo.js", function(exports){
	var displacement = require("scripts/factory/displacement");
	var tween = require("scripts/lib/tween");
	
	exports = displacement.create("images/logo.png", 288, 135, 17, -182, 17, 1, tween.exponential.co, 1e3);;

	return exports;
});