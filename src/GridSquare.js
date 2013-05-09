var SQUARE_TYPE = {
    BOMB: {
        value: 0,
        name: "free",
        code: "F"
    },
    FREE: {
        value: 1,
        name: "bomb",
        code: "b"
    }
};
Object.freeze(SQUARE_TYPE);

var COLORS = {
    NON_ACTIVE_COLOR: {
        color: "LIGHT_GRAY",
        value: 0
    },
    CLEARED: {
        color: "WHITE",
        value: 1
    },
    ALERT: {
        color: "YELLOW",
        value: 2
    },
    FLAGGED_COLOR: {
        color: "GREEN",
        value: 3
    },
    BORDER_COLOR: {
        color: "BLACK",
        value: 4
    },
    BLOW_UP: {
        color:"RED",
        value: 5
    }
};
Object.freeze(COLORS)

var SQUARE_SIZE = 75;
var BOMB_RATIO = .15;

var GenerateSquare = function(x,y) {
    if (Math.random() > BOMB_RATIO)
        return new FreeSquare(x, y);
    else
        return new BombSquare(x, y);
};

var GridSquare = function(x, y) {
    this.x = x;
    this.y = y;
    this.covered = true;
    this.flagged = false;
    this.processing = false;
    this.numBombsAround = 0;
    this.parentFrame = null;
    this.type = SQUARE_TYPE.FREE;
    this.color = COLORS.NON_ACTIVE_COLOR;
};

GridSquare.prototype.setParentFrame = function(parentFrame) {
    this.parentFrame = parentFrame;
};

GridSquare.prototype.getX = function() {
    return this.x;
};

GridSquare.prototype.getY = function() {
    return this.y;
};

GridSquare.prototype.getSquareType = function() {
    return this.type;
};

GridSquare.prototype.isCovered = function() {
    return this.covered;
};

GridSquare.prototype.setCovered = function(covered) {
    this.covered = covered;
};

GridSquare.prototype.isProcessing = function() {
    return this.processing;
};

GridSquare.prototype.setProcessing = function(processing) {
    this.processing = processing;
};

GridSquare.prototype.isFlagged = function() {
    return this.flagged;
};

GridSquare.prototype.setFlagged = function(flagged) {
    this.flagged = flagged;
};

GridSquare.prototype.uncover = function() {
    this.parentFrame.uncover(this);
}

GridSquare.prototype.getNumBombsAround = function() {
    return this.numBombsAround;
};

GridSquare.prototype.setNumBombsAround = function(numBombsAround) {
    this.numBombsAround = numBombsAround;
};

GridSquare.prototype.swapColor = function(color) {
    this.color = color;
};

GridSquare.prototype.leftClick = function() {
    if (!this.flagged)
        this.uncover();
};
    
GridSquare.prototype.rightClick = function() {
    if (this.covered
    {
        if (!this.flagged && this.type === SQUARE_TYPE.BOMB)
        {
            this.parentFrame.decrementFlaggedBombs();
        }
        else if (this.flagged && this.type === SQUARE_TYPE.BOMB)
        {
            this.parentFrame.incrementFlaggedBombs();
        }
        else if (!this.flagged && this.type !== SQUARE_TYPE.BOMB)
        {
            this.parentFrame.decrementBadFlags();
        }
        else if (this.flagged && this.type !== SQUARE_TYPE.BOMB)
        {
            this.parentFrame.incrementBadFlags();
        }

        this.flagged = !this.flagged;
        this.swapColor();
    }
};