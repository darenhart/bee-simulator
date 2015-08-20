function Text() {

	// fps
	var lastCalledTime  = Date.now();
	var fps;
	var fpsRate = 50;
	var fpsCount = 0;
	var fpsText = {
		x: game.width - 30,
		y: 10
	};

	this.fpsUpdate = function() {
		fpsCount++;
		var delta = (new Date().getTime() - lastCalledTime)/1000;
		lastCalledTime = Date.now();
		fps = Math.round(1/delta);
		if (fpsCount > fpsRate) {
			fpsCount = 0;
			this.context.textAlign="left"; 
			this.context.font="9px Verdana";
			this.context.clearRect(fpsText.x-2, fpsText.y-10, 32, 15);
			this.context.fillText('fps:'+fps,fpsText.x,fpsText.y);
		}
	}
	
	this.win = function() {
		this.context.font="50px Verdana";
		this.context.textAlign="center"; 
		this.context.fillText('WIN',game.width/2,game.height/2);
	};
	
}
Text.prototype = new Drawable();



