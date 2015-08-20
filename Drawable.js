/**
 * Creates the Drawable object which will be the base class for
 * all drawable objects in the game. Sets up default variables
 * that all child objects will inherit, as well as the default
 * functions.
 */
function Drawable() {
	this.init = function(x, y, width, height) {
		// Defualt variables
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	};
	
	// get distance between this and a point
	this.distancePoint = function(x,y) {
		var centerThis = {
			x: this.x + (this.width/2),
			y: this.y + (this.height/2),
		};
		var deltaX = centerThis.x - x;
		var deltaY = centerThis.y - y;
		var hypo = Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2));
		return {
			deltaX: deltaX,
			deltaY: deltaY,
			hypo: hypo 
		};
	};

	// get distance between this and another drawable d
	this.distance = function(d) {
		return this.distancePoint(d.x + (d.width/2), d.y + (d.height/2));
	};
	
	// get angle between two points with deltaX and deltaY
	this.getAngle = function(deltaX, deltaY) {
		return Math.atan2(deltaX,deltaY) * 180 / Math.PI + 180;
	};
	
	// get the smallest difference between 2 angles a1 and a2
	this.getSmallestAngle = function(a1, a2) {
		// get mod 360 and if it is negative, turn to positive
		a1 = a1%360;
		a1 = (a1 < 0) ? 360 + a1 : a1;
		a2 = a2%360;
		a2 = (a2 < 0) ? 360 + a2 : a2;
		
		var smallA = a1 - a2;
		smallA += (smallA>180) ? -360 : (smallA<-180) ? 360 : 0;
		return smallA;
	};

	// check if this is touching or inside another drawable d
	this.touch = function(d) {
		return (this.x + this.width > d.x && this.x < d.x + d.width &&
				this.y + this.height > d.y && this.y < d.y + d.height);  
	};

}

