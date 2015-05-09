var Vector = require('./vector');

function Square(data) {
	this.ctx 		= data.ctx;
	this.color 		= data.color;
	this.width 		= data.width;
	this.height 	= data.height;
	this.mass       = data.mass;
	
	this.vAcc 		= new Vector(0, 0);
	this.vVel 		= new Vector(0, 0);
	this.vLoc 		= new Vector(data.posX, data.posY);

	this.wind 		= new Vector(20, 0);
	this.gravity 	= new Vector(0, 3);
}
	
Square.prototype.move = function() {
	// Newton's 2 law of motion : "Net force equals mass times acceleration"
	// Or : acceleration = sum(forces) / mass 
	// (don't forget to reset acceleration after each move because forces are not cumulative)
	this.vAcc.mult(0);
	
	var windForce = this.applyForce(this.vAcc, this.wind, true);
	var gravityForce = this.applyForce(this.vAcc, this.gravity);
	this.vVel.add(this.vAcc);
	
	// Velocity must not exceed wind and gravity forces
	this.vVel.checkMaxXVal(windForce.x);
	this.vVel.checkMaxYVal(gravityForce.y);
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

Square.prototype.checkBoundaries = function() {
	if(this.vLoc.x > canvas.width)
		this.vLoc.x = 0;
	else if(this.vLoc.x <= 0)
		this.vLoc.x = canvas.width;
	if(this.vLoc.y > canvas.height)
		this.vLoc.y = 0;
	else if(this.vLoc.y <= 0)
		this.vLoc.y = canvas.height;
}

Square.prototype.draw = function() {
	this.move();
	
	this.ctx.fillStyle = this.color;
	this.ctx.fillRect(this.vLoc.x, this.vLoc.y, this.width, this.height);

	/*
	this.ctx.fillStyle = this.color;
	this.ctx.beginPath();
	this.ctx.moveTo(this.vLoc.x, this.vLoc.y);
	this.ctx.lineTo(this.vLoc.x + this.width / 2, this.vLoc.y + this.height);
	this.ctx.lineTo(this.vLoc.x - this.width / 2, this.vLoc.y + this.height);
	this.ctx.closePath();
	//this.ctx.arc(this.vLoc.x, this.vLoc.y, this.width, 0, 2 * Math.PI, false);
	this.ctx.fill();
	*/
}

module.exports = Square;