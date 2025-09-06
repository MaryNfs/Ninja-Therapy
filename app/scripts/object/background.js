/**
 * @source D:\hosting\demos\fruit-ninja\output\scripts\object\background.js
 */ 
define("scripts/object/background.js", function(exports){
	var Ucren = require("scripts/lib/ucren");
	var layer = require("scripts/layer");
	var timeline = require("scripts/timeline");
	var image, time;
	
	var random = Ucren.randomNumber;
	
	exports.set = function(){
		image = layer.createImage( "default", "images/background.jpg", 0, 0, 640, 480 );
	};
	
	exports.wobble = function(){
		time = timeline.setInterval( wobble, 50 );
	};
	
	exports.stop = function(){
	    time.stop();
	    image.attr({ x: 0, y: 0 });
	};
	
	function wobble(){
	    var x, y;
	    x = random( 12 ) - 6;
	    y = random( 12 ) - 6;
	    image.attr({ x: x, y: y });
	};;

	return exports;
});