define("scripts/object/developing.js", function(exports){
	var layer = require("scripts/layer");
	var tween = require("scripts/lib/tween");
	var timeline = require("scripts/timeline");
	var message = require("scripts/message");
	
	var exponential = tween.exponential.co;
	
	/**
	 * "coming soon" 模块
	 */
	
	exports.anims = [];
	
	exports.set = function(){
		this.image = layer.createImage( "default", "images/deverloping.png", 103, 218, 429, 53 );
	};
	exports.show = function(){

			var modal = document.getElementById("myModal");
			modal.style.display = "block";
			
			document.getElementById("preview").innerHTML = "";
			
			var span = document.getElementsByClassName("close")[0];
			// When the user clicks on <span> (x), close the modal
			span.onclick = function() {
				// modal.style.display = "none";
				window.location.reload(); // to reload image sources
			}

			// When the user clicks anywhere outside of the modal, close it
			window.onclick = function(event) {
				if (event.target == modal) {
					// modal.style.display = "none";
					window.location.reload(); // to reload image sources
				}
			}
	}
	
	// exports.show = function( start ){
	//     timeline.createTask({
	// 		start: start, duration: 500, data: [ 1e-5, 1, "show" ],
	// 		object: this, onTimeUpdate: this.onZooming, onTimeStart: this.onZoomStart, onTimeEnd: this.onZoomEnd,
	// 		recycle: this.anims
	// 	});
	
	// 	// this.hide( 2000 );
	// };  
	
	exports.hide = function( start ){
	    timeline.createTask({
			start: start, duration: 500, data: [ 1, 1e-5, "hide" ],
			object: this, onTimeUpdate: this.onZooming, onTimeStart: this.onZoomStart, onTimeEnd: this.onZoomEnd,
			recycle: this.anims
		});
	};
	
	// Show/hide related
	
	exports.onZoomStart = function(){
		this.image.show();
	};
	
	exports.onZooming = function( time, sz, ez, z ){
		this.image.scale( z = exponential( time, sz, ez - sz, 500 ), z );
	};
	
	exports.onZoomEnd = function( sz, ez, mode ){
	    if( mode === "hide" )
	        this.image.hide();
	};;

	return exports;
});