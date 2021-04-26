



(function(){
	'use strict';
	// HTML elements
	var baddie, content, coinTab, messageTab, thirdTab, forthTab, coinView, messageView, swapImg, coinDisplay, messageDisplay;
	// Numbers
	var tileSize, gridSize, left, top, posLeft, posTop;
	// Arrays
	var gameArea;
	// Get HTML elements that are to be used
	baddie = document.getElementById("baddie");
	content = document.getElementById("content");
	coinTab = document.getElementById("coinTab");
	coinView = document.getElementById("coinView");
	coinDisplay = document.getElementById("coinDisplay")
	messageTab = document.getElementById("messageTab");
	messageView = document.getElementById("messageView");
	messageDisplay = document.getElementById("messageDisplay");
	thirdTab = document.getElementById("thirdTab");
	forthTab = document.getElementById("forthTab");
	swapImg = document.getElementById("swapImg");

	//Other global variables
	var finishedMission1 = true;
	var finishedMission2 = false;
	var finishedMission3 = false;
	var coinViewOpen = false;
	var messageViewOpen = false;
	var person = "Anna";
	var backdrop = "grass";
	var gotWand = false;
	var coinCount = 0;
	var level = 0;
	var gotBag = false;
	var gotWizardsBag = false;
	var firstMessage = true;
	var makeSpell = "";
	var spellYellow = false;
	var spellGreen = false;
	var spellBlue = false;
	var defeatedDueller = false;
	var inCastle = false;
	var randomMagician = "";

	 var coinSound = new sound("sound/coin-shortest.wav");
	 var vortexSound = new sound("sound/vortex-shortest.wav");
	 var workingSound = new sound("sound/working.wav");
	 var phoneSound = new sound("sound/phone.wav");
	 var spellYellowSound = new sound("sound/spell-yellow.wav");
	 var spellGreenSound = new sound("sound/spell-green.wav");
	 var spellBlueSound = new sound("sound/spell-blue.wav");
	 var spellExplotionSound = new sound("sound/spell-explotion.wav");

	// Size of each tile
	tileSize = 32;
	// Number of tiles per row
	gridSize = 10;
	// Sets content size to match tilesize and gridsize
	content.style.width = content.style.height = gridSize*tileSize + "px";
	coinTab.style.width = (gridSize*tileSize)/4 +1 + "px";
	coinTab.style.height = (gridSize*tileSize)/13 + "px";
	messageTab.style.width = coinTab.style.width;
	messageTab.style.height = coinTab.style.height;
	thirdTab.style.width = (gridSize*tileSize)/4 +1 + "px";
	thirdTab.style.height = coinTab.style.height;
	forthTab.style.width = (gridSize*tileSize)/4 +1 + "px";
	forthTab.style.height = coinTab.style.height;
	// Gets starting position of baddie
	left = baddie.offsetLeft;
	top = baddie.offsetTop;
	// Starting position of baddie in the grid
	posLeft = 0;
	posTop = 0;


	/**
	 * This is the game area with a 10x10 grid
	 * 10 - nothing (grass)
	 * 11 - wall (impassible)
	 * 12 - obstacle (movable)
	 * 13 - door (passible)
	 * 14 - coin (movable)
	 * 15 - vortex (movable)
	 * 16 - guard (passable if payed)
	 * 17 - guard 2 (passable if payed)
	 * 18 - Bag (picked up)
	 */

	/* gameArea = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,11,11,11,11,11,11,11,11,11,
		]; */

	gameArea = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,11,11,10,14,11,10,10,11,
		11,10,11,10,10,11,11,13,10,11,
		11,25,10,10,11,10,10,10,10,11,
		11,11,11,10,11,11,11,12,12,11,
		11,14,11,10,10,14,11,10,10,11,
		11,10,11,10,11,11,11,11,10,11,
		11,10,10,10,10,11,14,10,10,11,
		11,14,11,11,10,10,10,11,10,11,
		11,11,11,11,11,11,11,11,11,11,
		];

	var level0 = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,11,11,10,14,11,10,10,11,
		11,10,11,10,10,11,11,13,10,11,
		11,25,10,10,11,10,10,10,10,11,
		11,11,11,10,11,11,11,12,12,11,
		11,14,11,10,10,14,11,10,10,11,
		11,10,11,10,11,11,11,11,10,11,
		11,10,10,10,10,11,14,10,10,11,
		11,14,11,11,10,10,10,11,10,11,
		11,11,11,11,11,11,11,11,11,11,
		];
    
    var level1 = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,13,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,20,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,21,10,11,
		11,11,11,11,11,11,11,11,11,11,
		];
    
    var level2 = [
		11,11,11,11,11,11,11,11,11,11,
		22,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,13,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,25,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,11,11,11,11,11,11,11,11,11,
		];
    
    var level3 = [
		11,11,11,11,11,11,11,11,11,11,
		23,10,10,10,10,12,10,10,10,11,
		11,10,11,10,11,10,11,10,11,11,
		11,10,11,10,11,10,11,10,11,11,
		11,10,11,10,11,15,11,10,11,11,
		11,14,11,14,11,14,11,14,11,11,
		11,10,11,10,11,10,11,12,11,11,
		11,10,11,10,11,10,11,10,11,11,
		11,10,10,10,10,10,10,10,13,11,
		11,11,11,11,11,11,11,11,11,11,
		];
    
    var level4 = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,12,10,10,10,13,10,10,11,
		11,10,10,12,12,10,10,10,10,11,
		11,14,10,12,10,10,12,12,10,11,
		11,10,10,10,10,12,10,10,14,11,
		11,10,10,10,12,10,10,12,10,11,
		11,10,14,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,11,11,11,11,11,11,11,11,11,
		];
    
    var level5 = [
		11,11,11,11,11,11,11,11,11,11,
		11,14,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,12,10,10,10,10,10,10,10,11,
		11,10,12,12,11,11,11,11,11,11,
		11,10,10,10,16,10,10,14,11,11,
		11,10,10,12,11,10,11,10,10,11,
		11,10,10,10,11,14,10,11,10,11,
		11,24,10,10,11,11,10,10,10,11,
		11,11,11,11,11,11,11,11,22,11,
		];

	var level6 = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,14,10,10,10,10,10,10,11,
		11,10,18,10,10,10,10,24,10,11,
		11,10,10,24,10,10,10,10,10,11,
		11,10,10,10,10,14,10,10,14,11,
		11,10,14,24,10,24,10,10,10,11,
		11,10,10,10,10,10,10,24,10,11,
		11,10,24,10,10,10,10,10,10,11,
		11,10,10,10,13,10,10,10,10,11,
		11,11,11,11,11,11,11,11,23,11,
		];

	var level7 = [
		11,11,11,11,11,11,11,11,11,11,
		11,12,12,12,10,10,10,10,10,11,
		11,10,12,10,10,10,13,10,10,11,
		11,10,10,12,12,12,10,10,10,11,
		11,10,10,10,12,10,10,10,10,11,
		11,10,10,10,10,12,12,12,10,11,
		11,10,10,10,10,10,12,10,10,11,
		11,10,10,10,10,10,10,12,12,11,
		11,10,10,10,10,10,10,10,12,11,
		11,11,11,11,11,11,11,11,11,11,
		];

	var level8 = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,10,11,10,10,10,10,10,11,
		11,10,10,17,10,10,10,10,10,11,
		11,11,10,11,11,10,10,10,24,11,
		11,10,10,10,10,11,11,11,11,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,11,11,10,10,10,10,10,11,
		11,10,19,11,10,10,10,10,10,11,
		11,10,10,11,10,10,10,10,13,11,
		11,11,11,11,11,11,11,11,11,11,
		];
	
	var level9 = [];

	var level10 = [
		11,11,11,11,11,11,22,11,11,11,
		11,10,11,11,11,10,10,11,11,11,
		11,10,10,10,10,10,11,13,11,11,
		11,11,11,10,11,10,11,10,11,11,
		11,11,11,10,11,10,10,10,11,11,
		11,10,10,25,11,11,11,11,11,11,
		11,11,11,10,10,10,11,14,11,11,
		11,10,10,10,11,10,10,10,11,11,
		11,14,11,11,11,11,11,11,11,11,
		11,11,11,11,11,11,11,11,11,11,
		];

	var level11 = [
		11,11,11,11,11,11,23,11,11,11,
		11,11,11,11,11,12,10,12,10,11,
		11,11,11,10,10,10,12,10,10,11,
		11,11,10,10,10,10,10,10,26,11,
		11,10,19,10,10,11,10,10,26,11,
		11,10,10,10,10,11,11,10,26,11,
		11,11,11,11,11,11,11,10,26,22,
		11,10,27,10,10,11,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,11,11,11,11,11,11,11,11,11,
		]; 

	var level12 = [
		11,11,11,11,11,11,11,11,11,11,
		11,24,11,10,10,18,11,14,11,11,
		11,10,11,14,26,11,10,10,14,11,
		11,10,11,11,10,10,10,11,11,11,
		11,10,10,10,10,10,10,10,26,11,
		11,11,11,10,11,10,10,11,10,11,
		11,11,10,10,11,10,26,10,10,23,
		11,10,10,11,11,29,11,10,10,11,
		11,28,10,11,11,10,11,11,10,11,
		11,11,11,11,11,22,11,11,11,11,
		]; 

	var level13 = [ // 
		11,11,11,11,11,11,11,11,11,11,
		11,11,11,11,10,10,10,11,11,11,
		22,10,10,10,10,30,10,11,11,11,
		11,11,11,11,10,10,10,11,11,11,
		11,11,11,11,11,10,11,11,11,11,
		11,11,11,11,11,10,11,11,11,11,
		11,11,11,11,11,10,11,11,11,11,
		11,11,11,11,11,10,11,11,11,11,
		11,11,11,11,11,10,11,11,11,11,
		11,11,11,11,11,23,11,11,11,11,
		];

	var level14 = [ // Castle
		10,10,10,10,10,10,10,10,10,10,
		10,10,10,10,10,10,10,10,10,10,
		31,31,31,31,31,30,31,31,31,31,
		31,34,32,32,32,32,31,34,32,31,
		31,32,32,31,32,32,31,32,32,31,
		31,32,34,31,32,32,32,32,32,31,
		31,31,31,31,32,32,31,32,32,31,
		31,33,32,32,32,32,31,32,34,31,
		31,32,32,31,32,32,31,34,32,31,
		31,31,31,31,31,31,31,31,31,31,
		];

	var level15 = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,10,10,10,10,11,10,10,11,
		23,10,11,11,11,10,11,10,10,11,
		11,10,11,11,11,10,10,10,10,11,
		11,10,11,11,11,10,11,10,10,11,
		11,10,10,10,10,10,11,10,10,11,
		11,10,11,11,11,10,11,11,10,11,
		11,10,11,11,11,10,11,10,10,11,
		11,10,10,10,10,10,11,10,10,11,
		11,11,11,11,11,11,11,11,22,11,
		];

	var level16 = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,11,11,11,11,11,11,10,11,
		11,10,11,10,10,10,10,11,10,11,
		11,10,11,10,11,11,10,11,10,11,
		11,10,11,10,11,11,10,11,10,11,
		11,10,11,10,13,11,10,11,10,11,
		11,10,11,11,11,11,10,11,10,11,
		11,10,10,10,10,10,10,11,10,11,
		11,11,11,11,11,11,11,11,23,11,
		]; 


	var levels = [
		level0, level1, level2, level3, level4, 
		level5, level6, level7, level8, level9, 
		level10, level11, level12, level13, level14,
		level15, level16
	];

	var newLevel0 = [];
	var newLevel1 = [];
	var newLevel2 = [];
	var newLevel3 = [];
	var newLevel4 = [];
	var newLevel5 = [];
	var newLevel6 = [];
	var newLevel7 = [];
	var newLevel8 = [];
	var newLevel9 = [];
	var newLevel10 = [];
	var newLevel11 = [];
	var newLevel12 = [];
	var newLevel13 = [];
	var newLevel14 = [];
	var newLevel15 = [];
	var newLevel16 = [];


	var newLevels = [
		newLevel0, newLevel1, newLevel2, newLevel3, newLevel4,
		newLevel5, newLevel6, newLevel7, newLevel8, newLevel9,
		newLevel10, newLevel11, newLevel12, newLevel13, newLevel14,
		newLevel15, newLevel16
	];


	/**
	 * Initiates the game area by adding each tile as a div with class and id to content area
	 * @param  {[type]} gameArea [description]
	 */
	var drawGamePlan = function(gameArea) {
		var i, tile;
		console.log("Drawing gameplan:");
		console.log(gameArea);

		for(i = 0; i < gameArea.length; i++) {
			// Creating a new tile
			tile = document.createElement("div");
			// Writing out the current tile from gameArea
			var tileFromArray = gameArea[i];
			// Adding class name to tile
			tile.className = "tile grass" + tileFromArray;
			// Adding ID to tile
			tile.id = "n" + i;
			// Append tile to the content
			content.appendChild(tile);
		}

		for (var j = 0; j < levels.length; j++) {
			newLevels[j] = Array.from(levels[j]);
			//console.log(levels[j]);
			console.log(newLevels[j]);
		}
	};

/* ---- Coins menu ----- */

	document.getElementById("coinTab").addEventListener("click", function(){ 
		if(coinViewOpen == false){
			coinView.style.display = "block";
			messageView.style.display = "none";
			messageViewOpen = false;
			coinViewOpen = true;
		}else if(coinViewOpen == true){
			coinView.style.display = "none";
			coinViewOpen = false;
		}
		console.log("In coins funciton");
	});
	document.getElementById("messageTab").addEventListener("click", function(){ 
		if(messageViewOpen == false){
			messageTab.innerHTML = "Messages";
			messageView.style.display = "block";
			coinView.style.display = "none";
			coinViewOpen = false;
			messageViewOpen = true;
			messageView.scrollTop = messageView.scrollHeight - messageView.clientHeight;
		}else if(messageViewOpen == true){
			messageView.style.display = "none";
			messageViewOpen = false;
		}
	});
	document.getElementById("thirdTab").addEventListener("click", function(){ 
		if(person === "Anna" ){
			person = "Sebastian";
		}else if(person === "Sebastian"){
			person = "Moa";
		}else{
			person = "Anna";
		}
		swapImg.className = person;
		moveBaddie(0,0);
		console.log("Person: " + person);
	});

/* ---- Mouse keys ----- */
	document.getElementById("arrowLeft").addEventListener("click", function(){ 
                if(isBaddieMovable(-1, 0)) {
                    // Go left - Use moveBaddie-function
                    moveBaddie(-1, 0);
                    // Turn baddie left - Use the given function
                    turnLeft();
                }
	});
	document.getElementById("arrowRight").addEventListener("click", function(){ 
                if(isBaddieMovable(1, 0)) {
                    // Go right - Use moveBaddie-function
                    moveBaddie(1, 0);
                    // Turn baddie right - Use the given function
                    turnRight();
                }
	});
	document.getElementById("arrowUp").addEventListener("click", function(){ 
                if(isBaddieMovable(0, -1)) {
                    // Go up - Use moveBaddie-function
					moveBaddie(0, -1);
					turnUp();
                }
	});
	document.getElementById("arrowDown").addEventListener("click", function(){ 
                if(isBaddieMovable(0, 1)) {
                    // Go down - Use moveBaddie-function
					moveBaddie(0, 1);
					turnDown();
                }
	});

/* ----- Kyboard keys ----- */
	// Triggers action on keypress
	document.addEventListener("keydown", function(event) {
		var key;
		// Gets what key was pressed as number
		key = event.keyCode || event.which;
		console.log("");
		console.log(key + " was pressed");
		
        switch(key) {
            case 37:
                if(isBaddieMovable(-1, 0)) {
                    // Go left - Use moveBaddie-function
                    moveBaddie(-1, 0);
                    // Turn baddie left - Use the given function
                    turnLeft();
                }
                break;
            case 38:
                if(isBaddieMovable(0, -1)) {
                    // Go up - Use moveBaddie-function
					moveBaddie(0, -1);
					turnUp();
                }
                break;
            case 39:
                if(isBaddieMovable(1, 0)) {
                    // Go right - Use moveBaddie-function
                    moveBaddie(1, 0);
                    // Turn baddie right - Use the given function
                    turnRight();
                }
                break;
            case 40:
                if(isBaddieMovable(0, 1)) {
                    // Go down - Use moveBaddie-function
					moveBaddie(0, 1);
					turnDown();
                }
                break;
			default:
				// Button was pressed but no action is to be performed
				console.log("Nothing happened with the gameboard");
				// return this function so that the default button action is performed instead
				return true;
		}
		// Baddie action was performed - prevent button default
		event.preventDefault();
	});
/* ----- SWIPE FUNCTIONALITY -----*/
	var fingerCount = 0;
	var startX = 0;
	var startY = 0;
	var curX = 0;
	var curY = 0;
	var deltaX = 0;
	var deltaY = 0;
	var horzDiff = 0;
	var vertDiff = 0;
	var minLength = 72; // the shortest distance the user may swipe
	var swipeLength = 0;
	var swipeAngle = null;
	var swipeDirection = null;	

	document.getElementById("swipeBox").addEventListener("touchstart", function(event) {
		coinView.style.display = "none";
		coinViewOpen = false;
		messageView.style.display = "none";
		messageViewOpen = false
		// disable the standard ability to select the touched object
		event.preventDefault();
		// get the total number of fingers touching the screen
		fingerCount = event.touches.length;
		// since we're looking for a swipe (single finger) and not a gesture (multiple fingers),
		// check that only one finger was used
		if ( fingerCount == 1 ) {
			// get the coordinates of the touch
			startX = event.touches[0].pageX;
			startY = event.touches[0].pageY;
			// store the triggering element ID
			//triggerElementID = passedName;
		} else {
			// more than one finger touched so cancel
			touchCancel(event);
		}
	});

	document.getElementById("swipeBox").addEventListener("touchmove", function(event) {
		event.preventDefault();
		if ( event.touches.length == 1 ) {
			curX = event.touches[0].pageX;
			curY = event.touches[0].pageY;
		} else {
			touchCancel(event);
		}
	});

	document.getElementById("swipeBox").addEventListener("touchend", function(event) {
		event.preventDefault();
		// check to see if more than one finger was used and that there is an ending coordinate
		if ( fingerCount == 1 && curX != 0 ) {
			// use the Distance Formula to determine the length of the swipe
			swipeLength = Math.round(Math.sqrt(Math.pow(curX - startX,2) + Math.pow(curY - startY,2)));
			// if the user swiped more than the minimum length, perform the appropriate action
			if ( swipeLength >= minLength ) {
				caluculateAngle();
				determineSwipeDirection();
				processingRoutine();
				touchCancel(event); // reset the variables
			} else {
				touchCancel(event);
			}	
		} else {
			touchCancel(event);
		}
	});

	document.getElementById("swipeBox").addEventListener("touchCancel", function(event) {
		// reset the variables back to default values
		fingerCount = 0;
		startX = 0;
		startY = 0;
		curX = 0;
		curY = 0;
		deltaX = 0;
		deltaY = 0;
		horzDiff = 0;
		vertDiff = 0;
		swipeLength = 0;
		swipeAngle = null;
		swipeDirection = null;
		//triggerElementID = null;
	});
	var caluculateAngle = function() {
		var X = startX-curX;
		var Y = curY-startY;
		var Z = Math.round(Math.sqrt(Math.pow(X,2)+Math.pow(Y,2))); //the distance - rounded - in pixels
		var r = Math.atan2(Y,X); //angle in radians (Cartesian system)
		swipeAngle = Math.round(r*180/Math.PI); //angle in degrees
		if ( swipeAngle < 0 ) { swipeAngle =  360 - Math.abs(swipeAngle); }
	};

	var determineSwipeDirection = function() {
		if ( (swipeAngle <= 45) && (swipeAngle >= 0) ) {
			swipeDirection = 'left';
		} else if ( (swipeAngle <= 360) && (swipeAngle >= 315) ) {
			swipeDirection = 'left';
		} else if ( (swipeAngle >= 135) && (swipeAngle <= 225) ) {
			swipeDirection = 'right';
		} else if ( (swipeAngle > 45) && (swipeAngle < 135) ) {
			swipeDirection = 'down';
		} else {
			swipeDirection = 'up';
		}
	};

	var processingRoutine = function() {
		if ( swipeDirection == 'left' ) {
			if(isBaddieMovable(-1, 0)) {
				// Go left - Use moveBaddie-function
				moveBaddie(-1, 0);
				// Turn baddie left - Use the given function
				turnLeft();
			}
		} else if ( swipeDirection == 'up' ) {
			if(isBaddieMovable(0, -1)) {
				// Go up - Use moveBaddie-function
				moveBaddie(0, -1);
			}
		} else if ( swipeDirection == 'right' ) {
			if(isBaddieMovable(1, 0)) {
				// Go right - Use moveBaddie-function
				moveBaddie(1, 0);
				// Turn baddie right - Use the given function
				turnRight();
			}
		} else if ( swipeDirection == 'down' ) {
			if(isBaddieMovable(0, 1)) {
				// Go down - Use moveBaddie-function
				moveBaddie(0, 1);
			}
		}
	};

/* ------ FUNCTIONS ------ */

	/** Initiates area and baddie */
	var init = function() {
		drawGamePlan(gameArea);
		moveBaddie(1, 1);
	};

	/**
	 * This function checks that the move was possible and returns either the new position or false
	 * @param  {int} moveLeft	- direction to move horizontally, range: -1 -> 1
	 * @param  {int} moveTop	- direction to move vertically, range: -1 -> 1
	 * @return {bool} 			- if baddie was movable true is returned, otherwise false is returned
	 */

	var isBaddieMovable = function(moveLeft, moveTop){
		var tile, tilePos, newLeft, newTop, movable;
		// This time we want the grid position values, not the pixel position values
		newLeft = posLeft + moveLeft;
		newTop = posTop + moveTop;
		//Assume that badddie cannot move there
		movable = false;
		// Get the tile baddie wants to move to
		// Left is the row number and top is the column number
		tilePos = newLeft + newTop*gridSize;
		// Getting the tile value from array gameArea and place it in the variable tile
		tile = gameArea[tilePos];
		//Writing out moves
		console.log("Move to: " + newLeft + "," + newTop);
		console.log("Tile " + tilePos + " contains " + gameArea[tilePos]);
		
		makeSpell = "";
		// Switch case on the tile value - do different things depending on what tile baddie is moving to
		switch(tile) {
			case 10: // Empty tile
				movable = true;
				break;
			case 11: // Wall, don't move baddie
				console.log("Baddie collided with wall: %s", tile);
				break;
			case 12: // Tile was an obstacle, move it and then baddie
				var nextPos, nextTile;
				// Calculate where the sibling tile to be checked is in the array
				nextPos = tilePos + moveLeft + (gridSize*moveTop);
				// Get the next tile from gameArea and place it in the variable nextTile (5b)
				nextTile = gameArea[nextPos];
				console.log("The next tile is: " + nextTile);
				console.log("Game area: " + gameArea);
				// Only move if the sibling tile to be moved to is empty
				if(nextTile == 10) {
					moveTile(tilePos, nextPos);
					// Allow  baddie to move to the current tile
					movable = true;
					console.log("Moved an obstacle");
				} else {
					// If not empty - don't do anything else
					console.log("Can't push obstacle - next tile is not empty");					
				}
				break;
			case 13: // Spaceship
				if(level == 8){
					level = 1;
				}else if(level == 2){
					level = 1;
				}else if(level == 10){
					level = 1;
				}else if(level == 16){
					level = 1;
				}else{
					level = level + 1;
				}
				movable = true;
				
				updateTiles(level);
				console.log("In the tardis! gameArea[titlePos]: " + gameArea[tilePos] + ". Should be: 13")
				console.log("Class: " + baddie.classList);
				console.log("Level: " + level);
				break;
			case 14: // Coin - pick up
				coinSound.play();
				coinCount = coinCount + 1;
				if(coinCount == 1){
					coinDisplay.innerHTML = "You have " + coinCount + " coin. ";
				}else{
					coinDisplay.innerHTML = "You have " + coinCount + " coins. ";
				}
			    movable = true;
			    console.log("Picked up coin/gem. coinCount: " + coinCount);
			    gameArea[tilePos] = 10;
				emptyTile(tilePos);
				
				coinTab.innerHTML = "Coins: " + coinCount;
			    break;
			case 15: //Vortex
				vortexSound.play();
				// level = 0;
				movable = true;
				rewindTime(level);
				updateTiles(level);
                break;
            case 16: //Guard
                if(coinCount >= 10){
                    movable = true;
                    gameArea[tilePos] = 10;
					emptyTile(tilePos);
					coinCount = coinCount - 10;
					coinTab.innerHTML = "Coins: " + coinCount;
					coinDisplay.innerHTML = "Coins: " + coinCount;
                }else{
                    movable = false;
                }
				break;
			case 17: //Guard 2
				if(coinCount >= 5){
					movable = true;
					gameArea[tilePos] = 10;
					emptyTile(tilePos);
					coinCount = coinCount - 5;
					coinTab.innerHTML = "Coins: " + coinCount;
					coinDisplay.innerHTML = "Coins: " + coinCount;
				}else{
					movable = false;
				}
				break;
			case 18: // Bag
				if(level == 6){
					gotBag = true;
				} else if(level == 12){
					gotWizardsBag = true;	
				}
				movable = true;
				//gameArea[tilePos] = 10;
				emptyTile(tilePos);
				moveBaddie(0,0);
				break;
			case 19: // Work/Wand shop
				if(backdrop == "agate"){
						movable = true;
						baddie.style.visibility = "hidden";
						gotWand = true;
						setTimeout(baddieWorking, 1000);
						moveBaddie(0, 1);
				}else{	
					if(gotBag == true){
						workingSound.play();
						movable = true;
						baddie.style.visibility = "hidden";
						finishedMission1 = true;
						setTimeout(baddieWorking, 2500);
						moveBaddie(0, 1);
					}else{
						movable = false;
					}
				}
				break;
			case 20: // Blue planet
				if(finishedMission1 == true){
					movable = true;
					level = 10;
					//backdrop = "agate";
					console.log("In the tardis! gameArea[titlePos]: " + gameArea[tilePos] + ". Should be: 20")
					console.log("Class: " + baddie.classList);
					console.log("Level: " + level);
					updateTiles(level);
				}else{
					movable = false;
				}
				break;
			case 21: // Orange planet
				if(finishedMission1 == true && finishedMission2 == true){
					movable = true;
					level = 30; 
				}else{
					movable = false;

				}
				break;
			case 22: // Exit
				movable = true;
				if(level == 13){
					level = level + 2;
				}else{
					level = level + 1;
				}
				updateTiles(level);
				break;
			case 23: // Re-entry
				movable = true;
				if(level == 15){
					level = level - 2;
				}else{
					level = level - 1;
				}
				
				updateTiles(level);
				break;
			case 24: //Vortex2
				vortexSound.play();
				movable = true;
				level = level - 2;
				rewindTime(level);
				updateTiles(level);
				break;
			case 25: //Phone
				phoneSound.play();
				movable = true;
				gameArea[tilePos] = 10;
				emptyTile(tilePos);
				break;
			case 26: //Spell-object
				movable = false;
				if(gotWand && spellYellow == true){
					animateTile(tilePos);
					spellExplotionSound.play();
					setTimeout(emptyTile, 1000, tilePos);
					makeSpell = "Yellow";
					moveBaddie(0,0);
				}
				break;
			case 27: // Magician
				movable = false;
				if(gotWand){
					spellYellow = true;
					spellYellowSound.play();
					animateTile(tilePos);
					makeSpell = "Yellow";
					moveBaddie(0,0);
					
				}
				break;
			case 28: // Magician 2
				movable = false;
				if(gotWand && gotWizardsBag){
					spellGreenSound.play();
					animateTile(tilePos);
					makeSpell = "Green";
					moveBaddie(0,0);
					spellGreen = true;
				}
				break;
			case 29: //Spell-object
				movable = false;
				if(gotWand && spellGreen){
					animateTile(tilePos);
					document.getElementById("n" + tilePos).className = "tile " + backdrop + "29b"; // current tile will be empty
					//setTimeout(emptyTile, 1000, tilePos);
					makeSpell = "Green";
					moveBaddie(0,0);
					if(defeatedDueller){
						movable = true; 
						defeatedDueller = false;
					}else{
						defeatedDueller = true;
						spellGreenSound.play();
					}
				}
				break;
			case 30: //Castle
				if(inCastle){
					level = level - 1;
					inCastle = false;
				}else{
					level = level + 1;
					inCastle = true;
				}
				movable = true;
				updateTiles(level);
				break;
			case 31: //Castle wall
				movable = false;
				break;
			case 32: //Castle floor
				movable = true;
				break;
			case 33: // Magician 3
				movable = false;
				if(gotWand){
					spellBlueSound.play();
					animateTile(tilePos);
					makeSpell = "Blue";
					moveBaddie(0,0);
					spellBlue = true;
				}
				break;
			case 34: // Random magician
				movable = false;
				console.log("Random magician is: " + document.getElementById("n" + tilePos).className);
				var classesString = document.getElementById("n" + tilePos).className;
				var classString = classesString.slice(-1);

				randomMagician = "randomMagician" + classString;
				console.log("randomMagician = " + randomMagician)
			default:
				// Tile was impassible - collided, do not move baddie
				console.log("Oh no, baddie collided with the wall");
				movable = false;
		}
		updateMessage(tile);
		return movable;
		
	};
	var baddieWorking = function(){
		baddie.style.visibility = "visible";
		gotBag = false;
	}
	var updateMessage = function(tileNr) {
		var addition = "";
		switch(tileNr){
			case 15: //Vortex
				addition = "<img id='vortex' class='profilePic'> <em>TIME VORTEX</em><br>";
				addition += "<img id='"+ person +"' class='profilePic'>: <em>Going back in time.</em>";
				break;
			case 16: //guard
				addition = "<img id='guard' class='profilePic'><p class='chat'>:<em> Entrance is 10 coins.</em></p>";
				if(coinCount >= 10){
					addition += "<br>" + "<img id='guard' class='profilePic'>: <em>Thanks.</em>";
                }
				break;
			case 17: //guard 2
				addition = "<img id='guard2' class='profilePic'>: <em>Entrance is 5 coins.</em>";
				if(coinCount >= 5){
					addition += "<br>" + "<img id='guard2' class='profilePic'>: <em>Thanks.</em>";
				}
				break;
			case 18: //Bag
				addition = "<img id='"+ person +"' class='profilePic'>: <em>Bag content picked up!</em>";
				break;
			case 19: //Work
				if(backdrop == "grass"){
					if(gotBag == true){
						addition = "<img id='"+ person +"' class='profilePic'>: <em>Working!</em>";
					}else{
						addition = "<img id='"+ person +"' class='profilePic'>: <em>I don't have the right uniform!</em>";
					}
				}
				break;
			case 20:
				if(finishedMission1 == false){
					addition = "<img id='"+ person +"' class='profilePic'>: <em>I have to complete mission 1 first!</em>";
				}
				break;
			case 21:
				if(finishedMission1 == false || finishedMission2 == false){
					addition = "<img id='"+ person +"' class='profilePic'>: <em>I have to complete mission 1 and 2 first!</em>";
				}
				break;
			case 24:
				addition = "<img id='vortex2' class='profilePic'> <em>TIME VORTEX</em><br>";
				addition += "<img id='"+ person +"' class='profilePic'>: <em>Going back in time.</em>";
				break;
			case 25:
				if(level == 0){
					addition = "<img id='phone' class='profilePic'>: Complete one mission on each planet.";
				}else if(level == 2){
					addition = "<img id='phone' class='profilePic'>: Get your uniform and go to work.";
				}else if(level == 10){
					addition = "<img id='phone' class='profilePic'>: Defeat the evil wizard by getting a wand and learning spells.";
				}
				break;
			case 27:
					addition = "<img id='magician' class='profilePic'>: <em>Let me teach you a spell to destroy those rocks.</em>";
					break;
			case 28:
				if(gotWizardsBag){
					addition = "<img id='magician2' class='profilePic'>: <em>Thank you for finding my bag. <br> Now, let me teach you a duelling spell.</em>";
				}else{
					addition = "<img id='magician2' class='profilePic'>: <em>I can't help you now. I need to find my lost bag. </em>";
				}
				break;
			case 29:
				if(spellGreen){
					addition = "<img id='dueller' class='profilePic'>: <em> Fine. You beat me.  </em>";
				}else{
					addition = "<img id='dueller' class='profilePic'>: <em> Piss off. You have to beat me in a duel to get through here. </em>";
				}
				break;
			case 33:
				addition = "<img id='magician3' class='profilePic'>: <em>I'll teach you a spell. </em>";
				break;
			case 34:
				addition = "<img id='" + randomMagician + "' class='profilePic'>: <em>Sorry. I'm busy.</em>";
				break;
			default: 
				console.log("No message");
				break;
		}
		console.log("Firstmessage: " + firstMessage);

		if(addition !== ""){
			if(firstMessage == true){
				messageDisplay.innerHTML = addition + "<br>"; 
				firstMessage = false;
			}else{
				messageDisplay.innerHTML += addition + "<br>";
			}
			messageView.scrollTop = messageView.scrollHeight - messageView.clientHeight;
			popMessage(addition);
		}
	}

	var popMessage = function(message){
		var popUp = document.createElement('div');
		popUp.id = "popMessage";
		popUp.className = "popMessage";
		popUp.innerHTML = message;
		content.appendChild(popUp);
		setTimeout(removePopMessage, 2000);
	}
	var removePopMessage = function(){
		content.removeChild(document.getElementById("popMessage"));
	}

	/**
	 * Changes position variables for baddie and style to draw the change out on the screen
	 * @param  {[type]} x	- direction to move horizontally
	 * @param  {[type]} y	- direction to move vertically
	 */
	var moveBaddie = function(x, y) {

		if(backdrop == "space"){
			baddie.className = "baddieTardis";
		}else if(gotBag == true){
			baddie.className = "baddie" + person + "Work";
		}else if(gotWand == true && makeSpell != ""){
			baddie.classList = person + "Spell" + makeSpell;
			console.log("Doing animation");
		}else if(gotWand == true){
			baddie.className = "baddie" + person + "Wand";
		}else{
			baddie.className = "baddie" + person;
		}
		// Update baddies position variables
		posLeft += x;
		posTop += y;
		// Assigning left and right to the pixel positions inside the area that the baddie is moving to
		// x and y are the grid coordinates. tile tileSize is used to get the pixels
		left = posLeft*tileSize;
		top = posTop*tileSize;
		// To actually visually move baddie we need to change left and top in style as pixels
		baddie.style.left = left + "px";
		baddie.style.top = top + "px";
	};

	/**
	 * Switches two tiles and updates their classes to redraw them
	 * @param  {int} current	- array position of the tile to move
	 * @param  {int} next		- array position to move tile to
	 */

	var moveTile = function(current, next) {
		var tile = gameArea[current];
		// Switching the tiles
		// Placing tile into the next positon in the array gameArea
		// Then making sure the current tile is empty in the array gameArea
		gameArea[next] = tile;
        tile = 12;
		gameArea[current] = 10;

		// Giving the tiles new classnames to redraw them
		document.getElementById("n" + next).className = "tile " + backdrop + tile; // box tile here
		document.getElementById("n" + current).className = "tile " + backdrop + 10; // current tile will be empty
	};

	var emptyTile = function(current){
        var tile = gameArea[current];
        tile = 14;
		gameArea[current] = 10;

		document.getElementById("n" + current).className = "tile " + backdrop + 10; // current tile will be empty

		newLevels[level][current] = 10;

	};
	var animateTile = function(current){
		if(gameArea[current] == 26){
			console.log("Running explotion");
			document.getElementById("n" + current).className = "tile explotionYellow";
		} else if(gameArea[current] == 27){
			console.log("Running spell practice");
			document.getElementById("n" + current).className = "tile magicianYellow";
		}else if(gameArea[current] == 28){
			console.log("Running spell practice");
			document.getElementById("n" + current).className = "tile magicianGreen";
		}else if(gameArea[current] == 33){
			console.log("Running spell practice");
			document.getElementById("n" + current).className = "tile magicianBlue";
		}
	};

	var rewindTime = function(backToLevel){
		for (var i = backToLevel; i < newLevels.length; i++) {
			newLevels[i] = Array.from(levels[i]);
		}
	};

    var updateTiles = function(level){
        var currentLevel = [];
        switch(level) {
            case 0:
                currentLevel = gameArea;
				backdrop = "grass";
                break;
            case 1:
				currentLevel = level1;
				backdrop = "space";
                break;
            case 2:
				currentLevel = level2;
				backdrop = "grass";
                break;
            case 3:
				currentLevel = level3;
				backdrop = "grass";
                break;
            case 4:
				currentLevel = level4;
				backdrop = "space";
                break;
            case 5:
				currentLevel = level5;
				backdrop = "grass";
				break;
			case 6:
				currentLevel = level6;
				backdrop = "grass";
				break;
			case 7:
				currentLevel = level7;
				backdrop = "space";
				break;
			case 8:
				currentLevel = level8;
				backdrop = "grass";
				break;
			case 10: //agate level 1
				currentLevel = level10;
				backdrop = "agate";
				break;
			case 11:
				currentLevel = level11;
				backdrop = "agate";
				break;
			case 12:
				currentLevel = level12;
				backdrop = "agate";
				break;
			case 13:
				currentLevel = level13;
				backdrop = "agate";
				break;
			case 14:
				currentLevel = level14;
				backdrop = "agate";
				break;
			case 15:
				currentLevel = level15;
				backdrop = "agate";
				break;
			case 16:
				currentLevel = level16;
				backdrop = "agate";
				break;
			default:
				break;
		}
		
		//console.log("Current level: " + level);
		//Redrawing the gameArea with the new level
		var randomMagicianCounter = 0;
        for(var i = 0; i < gameArea.length; i++){
			/*gameArea[i] = currentLevel[i];
            // emptyTile(i);            
			document.getElementById("n" + i).className = "tile " + backdrop + currentLevel[i];  */

			gameArea[i] = newLevels[level][i];
            // emptyTile(i);            
			document.getElementById("n" + i).className = "tile " + backdrop + newLevels[level][i];

			if(level == 14 && newLevels[level][i] == 30){
				document.getElementById("n" + i).className = "tile " + backdrop + "30-1";
				console.log("Drawing castle door");
			}else if(newLevels[level][i] == 34 ){
				document.getElementById("n" + i).className = "tile " + backdrop + "34-" + randomMagicianCounter;
				if(newLevels[level][i+1] == 31){
					document.getElementById("n" + i).className = "tile flip "+ backdrop + "34-" + randomMagicianCounter;
				}
				randomMagicianCounter ++;
			}
		}
		console.log("Level:" + level);
		console.log(currentLevel);
		console.log("NewLevel:");
		console.log(newLevels[level]);
	};
	
	/** Turn baddie image right or left - transform handled in style.css */
	function turnRight() {
		if (backdrop == "space") {
			baddie.classList.remove("baddiePointLeft");
			baddie.classList.add("baddiePointRight");
		}else{
			baddie.classList.remove("baddieLeft");
			baddie.classList.add("baddieRight");
		}
	}
	function turnLeft() {
		if (backdrop == "space") {
			baddie.classList.remove("baddiePointRight");
			baddie.classList.add("baddiePointLeft");
		}else{
			baddie.classList.remove("baddieRight");
			baddie.classList.add("baddieLeft");
		}
	}
	function turnUp() {
		if(backdrop == "space"){
			baddie.classList.remove("baddieDown");
			baddie.classList.add("baddieUp");
		}
	}
	function turnDown() {
		if(backdrop == "space"){
			console.log("turning down")
			baddie.classList.remove("baddieUp");
			baddie.classList.add("baddieDown");
		}
	}

	function sound(src) {
		this.sound = document.createElement("audio");
		this.sound.src = src;
		this.sound.setAttribute("preload", "auto");
		this.sound.setAttribute("controls", "none");
		this.sound.style.display = "none";
		document.body.appendChild(this.sound);
		this.play = function(){
			this.sound.play();
		}
		this.stop = function(){
			this.sound.pause();
		}    
	}

	/* ---- Run code ---- */
	init();
})();

