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