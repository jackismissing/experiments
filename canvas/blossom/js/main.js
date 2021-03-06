var Leaf = require('./leaf');

function MainScene() {
	this.canvas = document.getElementById("canvas");
	this.ctx = this.canvas.getContext('2d');

	this.leaves = this.initLeaves()
	this.update();
};

MainScene.prototype.initLeaves = function() {
	var leaves = [];
	var size;
	var alpha;
	var posX;
	var posY;

	for(var i = 0; i < 100; i++) {
		size = Math.random() * (15 - 3) + 3;
		alpha = 1 / size + 0.3;
		posX = Math.random() * this.canvas.width;
		posY = Math.random() * this.canvas.height;

		leaves.push(new Leaf({
			ctx: 	this.ctx, 
			color: 	"rgba(200, 0, 200, " + alpha + ")", 
			width: 	size, 
			height: size, 
			mass:   size,
			posX: 	posX, 
			posY: 	posY
		}));
	}

	return leaves;
};

MainScene.prototype.drawBgGradient = function() {
	var lingrad = this.ctx.createLinearGradient(0,0,0,this.canvas.height);
 	lingrad.addColorStop(0, 'rgba(200, 0, 200, .1)');
 	lingrad.addColorStop(0.3, 'rgba(255, 255, 255, .1)');
 	lingrad.addColorStop(0.7, 'rgba(255, 255, 255, .1)');
 	lingrad.addColorStop(1, 'rgba(200, 0, 200, .1)');

 	this.ctx.fillStyle = lingrad;
 	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

MainScene.prototype.drawLeaves = function() {
	for(var i = 0; i < this.leaves.length; i++) {
		this.leaves[i].draw()
	}
};

MainScene.prototype.draw = function() {
	this.ctx.fillStyle = "rgba(255, 255, 255, 1)";
	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	this.drawBgGradient();
	this.drawLeaves();
};

MainScene.prototype.update = function() {
	var this_ = this;
	window.requestAnimationFrame(function() {this_.update()});
	this.draw();
};

module.exports = MainScene;