
function Food() {

	this.isFound = false;

	this.spawn = function(x,y) {
		if (x == undefined) {
			x = (game.width - 100) * Math.random() + 50;
			y = (game.height - 100) * Math.random() + 50;
		}
			
		this.init(
			x-imageRepository.food.width,y-imageRepository.food.height,
			imageRepository.food.width,
			imageRepository.food.height
		);
	};

	this.draw = function() {
		this.context.drawImage(imageRepository.food, this.x, this.y);
	};

	this.clear = function() {
		this.context.clearRect(this.x-1, this.y-1, this.width+2, this.height+2);
		this.x = 0;
		this.y = 0;
	};
}
Food.prototype = new Drawable();

function Foods() {

	this.pool = [];
	
	this.listen = function() {
		if (KEY_STATUS.mouse) {
			if (KEY_STATUS.mouse.layerX != this.oldx || KEY_STATUS.mouse.layerY != this.oldy) {
				event = KEY_STATUS.mouse;
				this.oldx = event.layerX;
				this.oldy = event.layerY;
				// check if is ereasing a food
				for (var i = 0; i < this.pool.length; i++) {
					var food = this.pool[i];
					if (food.distancePoint(event.layerX, event.layerY).hypo < 10) {
						this.remove(i);
						return;
					}
				}
				
				this.newFood(event.layerX,event.layerY);
			}
		}
	};

	this.newFood = function(x, y) {
		var food = new Food();
		food.spawn(x, y);
		food.draw();
		this.pool.push(food);
	};

	this.found = function(i) {
		this.pool[i].isFound = true;
		this.remove(i);
	};

	this.remove = function(i) {
		this.pool[i].clear();
		this.pool.splice(i,1);
	}

	this.init = function() {
		this.pool = [];
		game.foodsContext.clearRect(0, 0, game.width, game.height);
	};
	
}

