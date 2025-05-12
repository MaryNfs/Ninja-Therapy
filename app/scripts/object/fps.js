define("scripts/object/fps.js", function(exports){
	var layer = require("scripts/layer");
	var timeline =require("scripts/timeline");
	
	var text, fps = "fps: ";
	
	exports.set = function(){
		text = layer.createText( "default", fps + "0", 4, 470 ).attr( "fill", "#ccc" );
	};
	
	exports.update = function(){
		text.attr( "text", fps + ( timeline.getFPS() >> 0 ) );
	};;

	return exports;
});