var GridFrame = function(rows, columns) {
	this.rows = rows;
	this.columns = columns;
	this.gridSquare2DArray = new Array();
    this.numActiveBombs = 0;
    this.totalBombs = 0;
    this.squaresLeft = rows * columns;
    this.badFlags = 0;

    var buildGrid = function(gridRows, gridColumns) {
		var temp;

		for (var y = 0; y < gridRows; ++y)
		{
			this.gridSquare2DArray.push(new Array());
			for (var x = 0; x < gridColumns; ++x)
			{
				temp = GenerateSquare(y, x);
				temp.setParentFrame(this);

                if (temp.getSquareType() === SQUARE_TYPE.BOMB) {
                    this.numActiveBombs++;
				}

				gridSquare2DArray[y].push(temp);
			}
		}

        this.totalBombs = this.numActiveBombs;
	};

	buildGrid(rows, columns);
};

GridFrame.prototype.decrementFlaggedBombs = function() {
    this.numActiveBombs--;
};

GridFrame.prototype.incrementFlaggedBombs = function() {
    this.numActiveBombs++;
};

GridFrame.prototype.decrementBadFlags = function() {
    this.badFlags--;
};

GridFrame.prototype.incrementBadFlags = function() {
    this.badFlags++;
};

GridFrame.prototype.numActiveBombs = function() {
    return this.numActiveBombs;
};

GridFrame.prototype.numBadFlags = function() {
    return this.badFlags;
};

GridFrame.prototype.isGameWon = function() {
    return (this.badFlags === 0) && ((this.numActiveBombs === 0) || (this.totalBombs === this.squaresLeft));
};

//NEEDS MORE WORK
GridFrame.prototype.gameOver = function() {
	for (GridSquare[] rows : gridSquare2DArray)	{
		for (GridSquare square : rows) {
			if (square.getSquareType() === SQUARE_TYPE.BOMB && !square.flagged) {	
				square.color = COLORS.BLOW_UP);
			}
		}
	}
};

//MORE WORK HERE TOO
GridFrame.prototype.uncover = function(origin) {
    var toUncover = new Array();

    toUncover.push(origin);
    
    var bombsAround;
    var square;

    while (!toUncover.isEmpty()) {
        square = toUncover.pop();
        if (!square.flagged) {
            square.setProcessing(true);
            square.setCovered(false);
            bombsAround = this.countNeighboringBombs(square);

            if (bombsAround > 0) {
                square.color = COLORS.ALERT);
                square.setBombText(bombsAround);
            } else {
                square.colors = COLORS.CLEARED);
                this.addNeighbors(square, toUncover);
            }

            squaresLeft--;
        }
    }
};


