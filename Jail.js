function Jail() {

	this.spawn = function(x,y) {
		if (x == undefined) {
			x = (game.width-imageRepository.jail.width) * Math.random();
			y = (game.height-imageRepository.jail.height) * Math.random();
		}

		this.init(
			x,y,
			imageRepository.jail.width,
			imageRepository.jail.height
		);
	};

	this.draw = function() {
		this.context.drawImage(imageRepository.jail, this.x, this.y);
	};

	this.create = function() {
		this.clear();
		this.spawn();
	};

	this.clear = function() {
		this.context.clearRect(0, 0, this.width, this.height);
		this.x = 0;
		this.y = 0;
	};

	this.checkAnts = function() {
		if (!game.anthill.antPool.active) {
			return;
		}
		var ants = game.anthill.antPool.getAnts();
		var allInside = true;
		for (var i = 0; i < ants.length; i++) {
			if (ants[i].alive && !this.touch(ants[i])) {
				allInside = false;
				return;
			}
		}
		if (allInside) {
			game.win();
		}
	};

	this.create();
	
}
Jail.prototype = new Drawable();



