(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.onload = function() {
	var MainScene = require('./main.js');
	var mainScene = new MainScene();
}
},{"./main.js":2}],2:[function(require,module,exports){
var Square = require('./square');

function MainScene() {
	this.canvas = document.getElementById("canvas");
	this.ctx = this.canvas.getContext('2d');

	this.squares = this.initSquares()
	this.update();
};

MainScene.prototype.initSquares = function() {
	var squares = [];
	var size;
	var alpha;
	var posX;
	var posY;

	for(var i = 0; i < 20; i++) {
		size = Math.random() * 20 + 1;
		alpha = 1 / size + 0.3;
		posX = Math.random() * this.canvas.width;
		posY = Math.random() * this.canvas.height;

		squares.push(new Square({
			ctx: 	this.ctx, 
			color: 	"rgba(200, 0, 200, " + alpha + ")", 
			width: 	size, 
			height: size, 
			mass:   size,
			posX: 	posX, 
			posY: 	posY
		}));
	}

	return squares;
};

MainScene.prototype.drawSquares = function() {
	for(var i = 0; i < this.squares.length; i++) {
		this.squares[i].draw()
	}
}

MainScene.prototype.draw = function() {
	this.ctx.fillStyle = "rgba(255, 255, 255, 1)";
	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	this.drawSquares();
};

MainScene.prototype.update = function() {
	var this_ = this;
	window.requestAnimationFrame(function() {this_.update()});
	this.draw();
};

module.exports = MainScene;
},{"./square":3}],3:[function(require,module,exports){
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
},{"./vector":4}],4:[function(require,module,exports){
function Vector(x, y) {
	this.x = x;
	this.y = y;
};

Vector.prototype.add = function(vector) {
	this.x += vector.x;
	this.y += vector.y;
};

Vector.prototype.sub = function(vector) {
	this.x -= vector.x;
	this.y -= vector.y;
};

Vector.prototype.mult = function(n) {
	this.x *= n;
	this.y *= n;
};

Vector.prototype.div = function(n) {
	this.x /= n;
	this.y /= n;
};

Vector.prototype.checkMaxXVal = function(val) {
	if(this.x > val) this.x = val;
	else if(this.x < -val) this.x = -val;
}

Vector.prototype.checkMaxYVal = function(val) {
	if(this.y > val) this.y = val;
	else if(this.y < -val) this.y = -val;
}

module.exports = Vector;


},{}]},{},[1])