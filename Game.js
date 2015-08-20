var imageRepository = new function() {

	// Set images src
	var imgs = {
		background: "imgs/bg.png",
		ninho: "imgs/ninho.png",
		jail: "imgs/jail.png",
		ant: "imgs/ant.png",
		food: "imgs/food.png"
	};

	var numImages = 0;
	for (var key in imgs) {
		numImages++;
		this[key] = new Image();
		this[key].src = imgs[key];
		this[key].onload = function() {
			imageLoaded();
		};
	}

	// Ensure all images have loaded before starting the game
	var numLoaded = 0;
	function imageLoaded() {
		numLoaded++;
		if (numLoaded === numImages) {
			window.init();
		}
	}
}

function Background() {
	// Implement abstract function
	this.draw = function() {
		// Pan background
		this.context.drawImage(imageRepository.background, this.x, this.y);
	};

	this.init(0,0); // Set draw point to 0,0
}
// Set Background to inherit properties from Drawable
Background.prototype = new Drawable();


/**
 * Creates the Game object which will hold all objects and data for
 * the game.
 */
function Game() {
	/*
	 * Gets canvas information and context and sets up all game
	 * objects.
	 * Returns true if the canvas is supported and false if it
	 * is not. This is to stop the animation script from constantly
	 * running on older browsers.
	 */
	this.init = function() {
	
		var canvases = {
			'background': Background,
			'ninho': Ninho,
			'jail': Jail,
			'ants': Ant,
			'foods': Food,
			'texts': Text
		};
		
		// Test to see if canvas is supported
		if (!document.getElementById('background').getContext) {
			return false;
		} else {
		
			this.width = imageRepository.background.width;
			this.height = imageRepository.background.height;

			for (var key in canvases) {
				var canvas = document.getElementById(key);
				canvas.width = this.width;
				canvas.height = this.height;
				this[key+'Context'] = canvas.getContext('2d');
				canvases[key].prototype.context = this[key+'Context'];
				canvases[key].prototype.canvasWidth = this[key+'Context'].width;
				canvases[key].prototype.canvaasHeight = this[key+'Context'].height;
			}
			
			this.background = new Background();
			this.ninho = new Ninho();
			//this.jail = new Jail();
			this.anthill = new Anthill();
			this.foods = new Foods();
			this.texts = new Text();
			
			return true;
		}
	};
	
	this.retrieveInputs = function() {
		this.isGravit = $('#gravitacional').is(':checked');
		this.mirror = $('#mirror').is(':checked');
	};
	
	this.win = function() {
	    game.anthill.antPool.init();
	    this.texts.win();
	};
	
	// Start the animation loop
	this.start = function() {
		animate();
	};
}



/**
 * The animation loop. Calls the requestAnimationFrame shim to
 * optimize the game loop and draws all game objects. This
 * function must be a gobal function and cannot be within an
 * object.
 */
function animate() {
	requestAnimFrame( animate );
	game.anthill.listen();
	game.anthill.antPool.animate();
	game.foods.listen();
	//game.jail.checkAnts();
	game.texts.fpsUpdate();
}

/**
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop,
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();

/**
 * Initialize the Game and starts it.
 */
var game = new Game();
function init() {
	if(game.init()) {
		game.background.draw();
		game.ninho.draw();
		//game.jail.draw();
		game.retrieveInputs();
		game.start();
	}
}

$('#restart').click(function() {
	game.anthill.antPool.init();
	game.foods.init();
	game.retrieveInputs();
});

$('#restartAnt').click(function() {
	game.anthill.antPool.init();
	game.retrieveInputs();
});
$('#restartFood').click(function() {
	game.retrieveInputs();
	game.foods.init();
});

$('#newAnt').click(function() {
	game.anthill.newAnt();
});
$('#newFood').click(function() {
	game.foods.newFood();
});

