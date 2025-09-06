define("scripts/sence.js", function(exports){
	var Ucren = require("scripts/lib/ucren");
	var sound = require("scripts/lib/sound");
	var fruit = require("scripts/factory/fruit");
	var flash = require("scripts/object/flash");
	
	var state = require("scripts/state");
	var message = require("scripts/message");
	
	// the fixed elements
	var background = require("scripts/object/background");
	var fps = require("scripts/object/fps");
	
	// the home page elements
	var homeMask = require("scripts/object/home-mask");
	var logo = require("scripts/object/logo");
	var ninja = require("scripts/object/ninja")
	var homeDesc = require("scripts/object/home-desc");
	
	var dojo = require("scripts/object/dojo");
	var newGame = require("scripts/object/new-game");
	var quit = require("scripts/object/quit");
	var newSign = require("scripts/object/new");
	var sandia, boom;
	
	// the elements in game body
	var score = require("scripts/object/score");
	var lose = require("scripts/object/lose");
	
	// the game logic
	var game = require("scripts/game");
	
	// the elements in 'developing' module
	var developing = require("scripts/object/developing");
	var gameOver = require("scripts/object/game-over");
	
	// commons
	var message = require("scripts/message");
	var timeline = require("scripts/timeline");
	var setTimeout = timeline.setTimeout.bind( timeline );
	var setInterval = timeline.setInterval.bind( timeline );
	
	var menuSnd;
	var gameStartSnd;
	
	// initialize sence
	exports.init = function(){
	    menuSnd = sound.create( "sound/menu" );
	    gameStartSnd = sound.create( "sound/start" );
		[ background, homeMask, logo, ninja, homeDesc, dojo, newSign, newGame, quit, score, lose, developing, gameOver, flash, fps ].invoke( "set" );
	    setInterval( fps.update.bind( fps ), 500 );
	};
	
	// switch sence
	exports.switchSence = function( name ){
	    var curSence = state( "sence-name" );
	    var senceState = state( "sence-state" );
	
	    if( curSence.is( name ) )
	        return ;
	
	    var onHide = function(){
	        curSence.set( name );
	        senceState.set( "entering" );
	        switch( name ){
	            case "home-menu": this.showMenu( onShow ); break;
	            case "dojo-body": this.showDojo( onShow ); break;
	            case "game-body": this.showNewGame( onShow ); break;
	            case "quit-body": this.showQuit( onShow ); break;
	        }
	    }.bind( this );
	
	    var onShow = function(){
	        senceState.set( "ready" );
	
	        if( name == "dojo-body" || name == "quit-body" ){
	            exports.switchSence( "home-menu" );
	        }
	    };
	
	    senceState.set( "exiting" );
	
	    if( curSence.isunset() ) onHide();
	    else if( curSence.is( "home-menu" ) ) this.hideMenu( onHide );
	    else if( curSence.is( "dojo-body" ) ) this.hideDojo( onHide );
	    else if( curSence.is( "game-body" ) ) this.hideNewGame( onHide );
	    else if( curSence.is( "quit-body" ) ) this.hideQuit( onHide );
	};
	
	// to enter home page menu
	exports.showMenu = function( callback ){
	    var callee = arguments.callee;
	    var times = callee.times = ++ callee.times || 1;
	
	    upload = fruit.create( "upload", 137, 333, true );
	    sandia = fruit.create( "sandia", 480, 322, true );
	    // boom = fruit.create( "boom", 552, 367, true, 2500 );
	
	    [ sandia, upload ].forEach(function( f ){ f.isHomeMenu = 1; });
	    upload.isDojoIcon = 1; 
		sandia.isNewGameIcon  = 1;
	
	    var group = [
	    	[ homeMask, 0 ], 
	    	[ logo, 0 ], 
	
	    	[ ninja, 500 ], 
	    	[ homeDesc, 1500 ], 
	
	    	[ dojo, 2000 ], 
	    	[ newGame, 2000 ], 
	    	// [ quit, 2000 ],
	        
	        // [ newSign, 2000 ],
	
	        [ upload, 2000 ],
	        [ sandia, 2000 ],
	        // [ boom, 2000 ]
	    ];
		
	    group.invoke( "show" );
	    [ sandia, upload ].invoke( "rotate", 2500 );
	
	    menuSnd.play();
	    setTimeout( callback, 2500 );
	};
	
	// to exit home page menu
	exports.hideMenu = function( callback ){
	    [ newGame ].invoke( "hide" );
	    [ homeMask, logo, ninja, homeDesc, dojo ].invoke( "hide" );
	    [ sandia, upload ].invoke( "fallOff", 150 );
	
	    menuSnd.stop();
	    setTimeout( callback, fruit.getDropTimeSetting() );
	};
	
	// to enter game body
	exports.showNewGame = function( callback ){
	    score.show();
	    lose.show();
	    game.start();
	    
	    // gameStartSnd.play();
	    setTimeout( callback, 1000 );
	};
	
	// to exit game body
	exports.hideNewGame = function( callback ){
	    score.hide();
	    lose.hide();
	
	    // gameStartSnd.stop();
	    setTimeout( callback, 1000 );
	};
	
	// to enter dojo mode
	exports.showDojo = function( callback ){
	    developing.show( 250 );
	    setTimeout( callback, 1500 );
	};
	
	// to exit dojo mode
	exports.hideDojo = function( callback ){
	    // TODO: 
	    setTimeout( callback, 1000 );
	};
	
	// to enter quit page
	exports.showQuit = function( callback ){
	    developing.show( 250 );
	    setTimeout( callback, 1500 );
	};
	
	// to exit quit page
	exports.hideQuit = function( callback ){
	    // TODO: 
	    setTimeout( callback, 1000 );
	};
	
	message.addEventListener("sence.switchSence", function( name ){
	    exports.switchSence( name );
	});

	return exports;
});
