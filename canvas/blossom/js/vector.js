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

