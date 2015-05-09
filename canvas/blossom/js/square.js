var Vector = require('./vector');
var SimplexNoise = require('simplex-noise');
var simplex = new SimplexNoise();

function Square(data) {
	this.ctx 		= data.ctx;
	this.color 		= data.color;
	this.width 		= data.width;
	this.height 	= data.height;
	this.mass       = data.mass;
	this.rotation  	= Math.random() * 10;

	this.vAcc 		= new Vector(0, 0);
	this.vVel 		= new Vector(0, 0);
	this.vLoc 		= new Vector(data.posX, data.posY);
	this.vDir       = new Vector(1, 1);

	this.wind 		= new Vector(20, 0);
	this.gravity 	= new Vector(0, 3);

	this.windNoiseX = 1;
	this.windNoiseY = 100;
}
	
Square.prototype.move = function() {
	// Newton's 2 law of motion : "Net force equals mass times acceleration"
	// Or : acceleration = sum(forces) / mass 
	// (don't forget to reset acceleration after each move because forces are not cumulative)
	this.vAcc.mult(0);
	
	var windForce = this.applyForce(this.vAcc, this.wind, true);
	var gravityForce = this.applyForce(this.vAcc, this.gravity);
	
	/*
	this.vAcc.x *= this.vDir.x;
	this.vAcc.y *= this.vDir.y;
	*/
	this.vVel.add(this.vAcc);
	
	// Velocity must not exceed wind and gravity forces
	this.vVel.x = windForce.x > 0 ? Math.min(this.vVel.x, windForce.x) : Math.max(this.vVel.x, windForce.x);
	this.vVel.y = Math.min(this.vVel.y, gravityForce.y);

	this.vLoc.add(this.vVel);
	this.checkBoundaries();
	
}

Square.prototype.applyForce = function(vector, force, applyMass) {
	// Make a copy of forces original values to prevent them from being overriden at each loop turn
	var forceCopy = {
		x: force.x,
		y: force.y
	}

	if(applyMass) {
		forceCopy.x /= this.mass;
		forceCopy.y /= this.mass;
	}

	vector.add(forceCopy);

	return forceCopy;
}

Square.prototype.updateForces = function() {
	// Change wind according to noise
	this.wind.x = Math.floor(simplex.noise2D(this.windNoiseX, this.windNoiseY) * 20 + 20)
	this.windNoiseX += 0.001;
	this.windNoiseY += 0.001;
}

Square.prototype.draw = function() {
	this.move();
	this.updateForces();
	
	/*
	this.ctx.save()
	console.log(Math.PI * this.rotation);
	this.ctx.rotate(Math.PI * this.rotation);
	*/
	
	this.ctx.fillStyle = this.color;
	this.ctx.beginPath();
	this.ctx.moveTo(this.vLoc.x, this.vLoc.y);
	this.ctx.lineTo(this.vLoc.x + this.width, this.vLoc.y + this.height / 1.5);
	this.ctx.lineTo(this.vLoc.x - this.width / 4, this.vLoc.y + this.height);
	this.ctx.fill();
	this.ctx.closePath();
	
	this.ctx.beginPath();
	this.ctx.moveTo(this.vLoc.x, this.vLoc.y + this.height / 2);
	this.ctx.lineTo(this.vLoc.x - this.width / 2, this.vLoc.y + this.height / 2);
	this.ctx.lineTo(this.vLoc.x - this.width / 4, this.vLoc.y + this.height );
	this.ctx.fill();
	this.ctx.closePath();

	//this.ctx.restore()


	//this.ctx.fillRect(this.vLoc.x, this.vLoc.y, this.width, this.height);
}

Square.prototype.checkBoundaries = function() {
	
	if(this.vLoc.x > canvas.width)
		this.vLoc.x = -20;
	else if(this.vLoc.x < -20)
		this.vLoc.x = canvas.width;
	if(this.vLoc.y > canvas.height)
		this.vLoc.y = -20;
	else if(this.vLoc.y < -20)
		this.vLoc.y = canvas.height;
	

	/*
	if(this.vLoc.x > canvas.width) {
		this.vLoc.x = canvas.width;
		this.vDir.x = -1;
	}
	else if(this.vLoc.x < 0) {
		this.vLoc.x = 0;
		this.vDir.x = 1;
	}
	if(this.vLoc.y > canvas.height) {
		this.vLoc.y = canvas.height;
		this.vDir.y = -1;
	}
	else if(this.vLoc.y < 0) {
		this.vLoc.y = 0;
		this.vDir.y = 1;
	}
	*/


}

module.exports = Square;