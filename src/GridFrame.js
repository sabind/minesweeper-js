var GridFrame = function(rows, columns) {
	this.rows = rows;
	this.columns = columns;
	this.gridSquare2DArray = new Array();
    this.numActiveBombs = 0;
    this.totalBombs = 0;
    this.squaresLeft = rows * columns;
    this.badFlags = 0;

    var buildGrid = function(gridRows, gridColumns, gridSquare2DArray, frame) {
		var temp;

		for (var y = 0; y < gridRows; ++y)
		{
			gridSquare2DArray.push(new Array());
			for (var x = 0; x < gridColumns; ++x)
			{
				temp = GenerateSquare(y, x);
				temp.setParentFrame(frame);

                if (temp.getSquareType() === SQUARE_TYPE.BOMB) {
                    this.numActiveBombs++;
				}

				gridSquare2DArray[y].push(temp);
			}
		}

        this.totalBombs = this.numActiveBombs;
	};

	buildGrid(rows, columns, this.gridSquare2DArray, this);
};

GridFrame.prototype.setGrid = function(grid) {
    this.gridSquare2DArray = grid;
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
	this.gridSquare2DArray.forEach(function(row) {
        row.forEach(function (square) {
            if (square.getSquareType() === SQUARE_TYPE.BOMB && !square.flagged) {    
				square.color = COLORS.BLOW_UP;
			}    
        });
	});
};

//MORE WORK HERE TOO
GridFrame.prototype.uncover = function(origin) {
    var toUncover = new Array();

    toUncover.push(origin);
    
    var bombsAround;
    var square;

    while (!toUncover.length > 0) {
        square = toUncover.pop();
        if (!square.flagged) {
            square.setProcessing(true);
            square.setCovered(false);
            bombsAround = this.countNeighboringBombs(square);

            if (bombsAround > 0) {
                square.color = COLORS.ALERT;
                square.setBombText(bombsAround);
            } else {
                square.colors = COLORS.CLEARED;
                this.addNeighbors(square, toUncover);
            }

            this.squaresLeft--;
        }
    }
};

GridFrame.prototype.countNeighboringBombs = function(square) {
    var xCoordinate = square.getXCoordinate();
    var yCoordinate = square.getYCoordinate();
    
    var numBombs = 0;

    if (this.coordinatesAreInGrid(yCoordinate, xCoordinate - 1))
    {
        if (this.gridSquare2DArray[yCoordinate][xCoordinate - 1].getSquareType() === SQUARE_TYPE.BOMB)
            numBombs++;
    }
    if (this.coordinatesAreInGrid(yCoordinate, xCoordinate + 1))
    {
        if (this.gridSquare2DArray[yCoordinate][xCoordinate + 1].getSquareType() === SQUARE_TYPE.BOMB)
            numBombs++;
    }
    if (this.coordinatesAreInGrid(yCoordinate + 1, xCoordinate - 1))
    {
        if (this.gridSquare2DArray[yCoordinate + 1][xCoordinate - 1].getSquareType() === SQUARE_TYPE.BOMB)
            numBombs++;
    }
    if (this.coordinatesAreInGrid(yCoordinate + 1, xCoordinate + 1))
    {
        if (this.gridSquare2DArray[yCoordinate + 1][xCoordinate + 1].getSquareType() === SQUARE_TYPE.BOMB)
            numBombs++;
    }
    if (this.coordinatesAreInGrid(yCoordinate + 1, xCoordinate))
    {
        if (this.gridSquare2DArray[yCoordinate + 1][xCoordinate].getSquareType() === SQUARE_TYPE.BOMB)
            numBombs++;
    }
    if (this.coordinatesAreInGrid(yCoordinate - 1, xCoordinate - 1))
    {
        if (this.gridSquare2DArray[yCoordinate - 1][xCoordinate - 1].getSquareType() === SQUARE_TYPE.BOMB)
            numBombs++;
    }
    if (this.coordinatesAreInGrid(yCoordinate - 1, xCoordinate + 1))
    {
        if (this.gridSquare2DArray[yCoordinate - 1][xCoordinate + 1].getSquareType() === SQUARE_TYPE.BOMB)
            numBombs++;
    }
    if (this.coordinatesAreInGrid(yCoordinate - 1, xCoordinate))
    {
        if (this.gridSquare2DArray[yCoordinate - 1][xCoordinate].getSquareType() === SQUARE_TYPE.BOMB)
            numBombs++;
    }

    return numBombs;
};

GridFrame.prototype.addNeighbors = function(square, toUncover) {
    var xCoordinate = square.getXCoordinate();
    var yCoordinate = square.getYCoordinate();

    if (this.coordinatesAreInGrid(yCoordinate, xCoordinate - 1) && this.gridSquare2DArray[yCoordinate][xCoordinate - 1].getSquareType() != SQUARE_TYPE.BOMB)
    {
        if (this.gridSquare2DArray[yCoordinate][xCoordinate - 1].isCovered() && !this.gridSquare2DArray[yCoordinate][xCoordinate - 1].isInProcessing())
        {
            toUncover.add(this.gridSquare2DArray[yCoordinate][xCoordinate - 1]);
            this.gridSquare2DArray[yCoordinate][xCoordinate - 1].startProcessing();
        }
    }
    if (this.coordinatesAreInGrid(yCoordinate, xCoordinate + 1) && this.gridSquare2DArray[yCoordinate][xCoordinate + 1].getSquareType() != SQUARE_TYPE.BOMB)
    {
        if (this.gridSquare2DArray[yCoordinate][xCoordinate + 1].isCovered() && !this.gridSquare2DArray[yCoordinate][xCoordinate + 1].isInProcessing())
        {
            toUncover.add(this.gridSquare2DArray[yCoordinate][xCoordinate + 1]);
            this.gridSquare2DArray[yCoordinate][xCoordinate + 1].startProcessing();
        }
    }
    if (this.coordinatesAreInGrid(yCoordinate + 1, xCoordinate - 1) && this.gridSquare2DArray[yCoordinate + 1][xCoordinate - 1].getSquareType() != SQUARE_TYPE.BOMB)
    {
        if (this.gridSquare2DArray[yCoordinate + 1][xCoordinate - 1].isCovered() && !this.gridSquare2DArray[yCoordinate + 1][xCoordinate - 1].isInProcessing())
        {
            toUncover.add(this.gridSquare2DArray[yCoordinate + 1][xCoordinate - 1]);
            this.gridSquare2DArray[yCoordinate + 1][xCoordinate - 1].startProcessing();
        }
    }
    if (this.coordinatesAreInGrid(yCoordinate + 1, xCoordinate + 1) && this.gridSquare2DArray[yCoordinate + 1][xCoordinate + 1].getSquareType() != SQUARE_TYPE.BOMB)
    {
        if (this.gridSquare2DArray[yCoordinate + 1][xCoordinate + 1].isCovered() && !this.gridSquare2DArray[yCoordinate + 1][xCoordinate + 1].isInProcessing())
        {
            toUncover.add(this.gridSquare2DArray[yCoordinate + 1][xCoordinate + 1]);
            this.gridSquare2DArray[yCoordinate + 1][xCoordinate + 1].startProcessing();
        }
    }
    if (this.coordinatesAreInGrid(yCoordinate + 1, xCoordinate) && this.gridSquare2DArray[yCoordinate + 1][xCoordinate].getSquareType() != SQUARE_TYPE.BOMB)
    {
        if (this.gridSquare2DArray[yCoordinate + 1][xCoordinate].isCovered() && !this.gridSquare2DArray[yCoordinate + 1][xCoordinate].isInProcessing())
        {
            toUncover.add(this.gridSquare2DArray[yCoordinate + 1][xCoordinate]);
            this.gridSquare2DArray[yCoordinate + 1][xCoordinate].startProcessing();
        }
    }
    if (this.coordinatesAreInGrid(yCoordinate - 1, xCoordinate - 1) && this.gridSquare2DArray[yCoordinate - 1][xCoordinate - 1].getSquareType() != SQUARE_TYPE.BOMB)
    {
        if (this.gridSquare2DArray[yCoordinate - 1][xCoordinate - 1].isCovered() && !this.gridSquare2DArray[yCoordinate - 1][xCoordinate - 1].isInProcessing())
        {
            toUncover.add(this.gridSquare2DArray[yCoordinate - 1][xCoordinate - 1]);
            this.gridSquare2DArray[yCoordinate - 1][xCoordinate - 1].startProcessing();
        }
    }
    if (this.coordinatesAreInGrid(yCoordinate - 1, xCoordinate + 1) && this.gridSquare2DArray[yCoordinate - 1][xCoordinate + 1].getSquareType() != SQUARE_TYPE.BOMB)
    {
        if (this.gridSquare2DArray[yCoordinate - 1][xCoordinate + 1].isCovered() && !this.gridSquare2DArray[yCoordinate - 1][xCoordinate + 1].isInProcessing())
        {
            toUncover.add(this.gridSquare2DArray[yCoordinate - 1][xCoordinate + 1]);
            this.gridSquare2DArray[yCoordinate - 1][xCoordinate + 1].startProcessing();
        }
    }
    if (this.coordinatesAreInGrid(yCoordinate - 1, xCoordinate) && this.gridSquare2DArray[yCoordinate - 1][xCoordinate].getSquareType() != SQUARE_TYPE.BOMB)
    {
        if (this.gridSquare2DArray[yCoordinate - 1][xCoordinate].isCovered() && !this.gridSquare2DArray[yCoordinate - 1][xCoordinate].isInProcessing())
        {
            toUncover.add(this.gridSquare2DArray[yCoordinate - 1][xCoordinate]);
            this.gridSquare2DArray[yCoordinate - 1][xCoordinate].startProcessing();
        }
    }
};

GridFrame.prototype.coordinatesAreInGrid = function(x, y) {
    return (y >= 0 && y < this.rows && x >= 0 && x < this.columns);
};