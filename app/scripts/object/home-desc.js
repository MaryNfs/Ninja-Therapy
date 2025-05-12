define("scripts/object/home-desc.js", function(exports){
	var displacement = require("scripts/factory/displacement");
	var tween = require("scripts/lib/tween");
	
	exports = displacement.create("images/home-desc.png", 161, 91, -161, 140, 7, 127, tween.exponential.co, 500);;

	return exports;
});