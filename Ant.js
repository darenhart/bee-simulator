/**
 * Custom Pool object. Holds Ant objects to be managed to prevent
 * garbage collection.
 */
function Pool(maxSize) {
	var size = maxSize; // Max ants allowed in the pool
	var pool = [];
	this.active = false;
	
	/*
	 * Populates the pool array with Ant objects
	 */
	this.init = function() {
		this.active = false;
		game.antsContext.clearRect(0, 0, imageRepository.background.width, imageRepository.background.height);
		for (var i = 0; i < size; i++) {
			// Initalize the ant object
			var ant = new Ant();
			ant.init(0,0, imageRepository.ant.width,
			            imageRepository.ant.height);
			pool[i] = ant;
		}
	};
	/*
	 * Grabs the last item in the list and initializes it and
	 * pushes it to the front of the array.
	 */
	this.get = function(x, y) {
		this.active = true;
		if(!pool[size - 1].alive) {
			pool[size - 1].spawn(x, y);
			pool.unshift(pool.pop());
		}
	};

	this.getAnts = function() {
		return pool;
	};
	
	/*
	 * Draws any in use Ants. If a ant goes off the screen,
	 * clears it and pushes it to the front of the array.
	 */
	this.animate = function() {
		for (var i = 0; i < size; i++) {
			// Only draw until we find an ant that is not alive
			if (pool[i].alive) {
				if (pool[i].draw()) {
					pool[i].clear();
					pool.push((pool.splice(i,1))[0]);
				}
			}
			else
				break;
		}
	};
}


/**
 * Creates the Ant object. The ants are
 * drawn on the "main" canvas.
 */
function Ant() {
	this.alive = false; // Is true if the ant is currently in use
	/*
	 * Sets the ant values
	 */
	this.spawn = function(x, y) {
		this.x = x;
		this.y = y;
		this.alive = true;
		this.angle = 170;
		this.speed = parseFloat($('#speed').val());
		this.angleRandom = parseFloat($('#angleRandom').val());
		this.speedRandom = parseFloat($('#speedRandom').val());
		this.foodAttract = parseFloat($('#foodAttract').val());
		this.distanceFoodAttract = parseFloat($('#distanceFoodAttract').val());
	};
	/*
	 * Uses a "drity rectangle" to erase the ant and moves it.
	 * Returns true if the ant moved off the screen, indicating that
	 * the ant is ready to be cleared by the pool, otherwise draws
	 * the ant.
	 */
	this.draw = function() {
	
		this.context.clearRect(this.x-1, this.y-1, this.width+2, this.height+2);

		if (game.mirror) {
			if (this.x <= 0) {
				this.x = game.width - this.width;
			} else if (this.x >= game.width - this.width) {
				this.x = 0;
			} else if (this.y <= 0) {
				this.y = game.height - this.height;
			} else if (this.y >= game.height - this.height) {
				this.y = 0;
			}
		} else {
			var angAux;
			if (this.x <= 0 || this.x >= game.width-this.width) {
				this.angle += 180 + 2*(90-this.angle);
			} else if (this.y <= 0 || this.y >= game.height - this.height) {
				this.angle += 180 + 2*(180-this.angle);
			}
		}


		var foods = game.foods.pool;
		var gotFood = false;
		for (var i = 0; i < foods.length; i++) {
			var food = foods[i];
			var distance = this.distance(food);

			if (distance.hypo < this.distanceFoodAttract) {
				// gravitacional
				if (game.isGravit) {
					this.attractA = this.foodAttract / Math.pow(distance.hypo,1.5);
				} else {
					this.attractA = this.foodAttract / distance.hypo;
				}
				// set a max for the attractA
				this.attractA = Math.min(6,this.attractA);

				var foodAntA = this.getAngle(distance.deltaX,distance.deltaY);
				if (this.getSmallestAngle(this.angle, foodAntA) < 0) {
					this.angle += this.attractA;
				} else {
					this.angle -= this.attractA;
				}

				if (distance.hypo < 2) {
					gotFood = true;
					game.foods.found(i);
					break;
				}
			}
		}

		this.speed *= 1 + (Math.random()*2-1) * (this.speedRandom/1000);
		this.angle += (Math.random()*2-1) * this.angleRandom;
		if (!gotFood) {
			this.y += this.speed*(Math.cos(this.angle*Math.PI/180));
			this.x += this.speed*(Math.sin(this.angle*Math.PI/180));
		}
		this.context.drawImage(imageRepository.ant, this.x, this.y);
	};
	/*
	 * Resets the ant values
	 */
	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.alive = false;
	};
}
Ant.prototype = new Drawable();

function Anthill() {
	var maxAnts = 50;
	var antBornRate = 8;
	var counter = 0;
	this.antPool = new Pool(maxAnts);
	this.antPool.init();
	
	this.listen = function() {
		counter++;
		if (KEY_STATUS.space && counter >= antBornRate) {
			this.newAnt();
			counter = 0;
		}
	};
	
	this.newAnt = function() {
		this.antPool.get(game.ninho.bornX, game.ninho.bornY);
	};
}
