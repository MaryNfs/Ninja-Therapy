define("scripts/object/quit.js", function(exports){
	var rotate = require("scripts/factory/rotate");
	var tween = require("scripts/lib/tween");
	
	exports = rotate.create("images/upload.png", 85, 290, 85, 75, 1e-5, tween.exponential.co, 500);;

	return exports;
});