function Ninho() {

	this.spawn = function(x,y) {
		if (x == undefined) {
			x = (game.width - 200) * Math.random() + 100;
			y = (game.height - 200) * Math.random() + 150;
		}

		this.init(
			x-imageRepository.ninho.width/2,y-imageRepository.ninho.height/2,
			imageRepository.ninho.width,
			imageRepository.ninho.height
		);
		this.bornX = this.x + this.width/2 - 6;
		this.bornY = this.y + this.height/2 -14;
	};

	this.draw = function() {
		this.context.drawImage(imageRepository.ninho, this.x, this.y);
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

	this.create();
	
}
Ninho.prototype = new Drawable();



