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
    },
};
Object.freeze(SQUARE_TYPE);

var GridSquare = function(x, y) {
    this.x = x;
    this.y = y;
};

GridSquare.prototype.getX = function() {
    return this.x;
};

GridSquare.prototype.getY = function() {
    return this.y;
};