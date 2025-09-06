define("scripts/object/dojo.js", function(exports){
	var rotate = require("scripts/factory/rotate");
	var tween = require("scripts/lib/tween");
	
	exports = rotate.create("images/dojo.png", 41, 240, 175, 175, 1e-5, tween.exponential.co, 500);;

	return exports;
});
