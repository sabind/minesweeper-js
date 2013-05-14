var BombSquare = function(x, y) {
	this.x = x;
	this.y = y;
	this.type = SQUARE_TYPE.BOMB;
};

BombSquare.prototype = new GridSquare();

BombSquare.prototype.leftClick = function() {
	if (!this.flagged)
    {
    	this.setCovered(false);
        this.parentFrame.gameOver();
        this.color = COLORS.BLOW_UP;
    } else {
        GridSquare.prototype.leftClick.call(this);
    }
};