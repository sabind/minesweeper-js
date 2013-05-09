var BombSquare = function(x, y) {
	this.x = x;
	this.y = y;
	this.type = SQUARE_TYPE.BOMB;
};

BombSquare.prototype = new GridSquare(x,y);

BombSquare.prototype.leftClick = function() {
	if (!this.flagged)
    {
    	this.setCovered(false);
        this.parentFrame.gameOver();
        this.color = COLORS.BLOW_UP;
    }
};