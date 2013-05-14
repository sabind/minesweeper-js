if (typeof String.prototype.contains === 'undefined') { 
    String.prototype.contains = function(it) { return this.indexOf(it) != -1; }; 
}

var CLICKS = {
    RIGHT: {
        value: 0,
        name: "right",
        code: "r"
    },
    LEFT: {
        value: 1,
        name: "left",
        code: "l"
    }
};
Object.freeze(CLICKS);

var Click = function(y, x, type) {
    this.y = y;
    this.x = x;
    this.type = type;
};

describe("A grid frame should have stuff in it", function() {
    
    var frame, clicks;
    var testGridStandard = [  
            [ "LE", "E", "E", "E", "E" ],
            [ "E", "E", "E", "E", "E" ],
    		[ "E", "LE", "LB", "E", "E" ],
    		[ "E", "E", "E", "E", "E" ],
    		[ "E", "E", "E", "E", "E" ],
    ];
    var testGridStandardInitialBombs = 1;
    
    beforeEach(function () {
        frame = {
            gridSquare2DArray: new Array(),
            initialBombs: 0,
            FRAME_WIDTH: 5,
            FRAME_HEIGHT: 5,
            clicks: new Array(),
            numActiveBombs: 0,
            prototype: new GridFrame(5, 5),
            generateTestFrame: function(grid, frame) {
                var i = 0;
                var j;
                var newGrid = new Array();
                grid.forEach(function(row) {
                    j = 0;
                    newGrid.push(new Array());
                    row.forEach(function (square) {
                        if (square.contains("E"))
                    	{
                			newGrid[i][j] = new GridSquare(i,j);
                			newGrid[i][j].setParentFrame(frame.prototype);
                		}
                		else if (square.contains("B"))
                		{
                			frame.numActiveBombs++;
                			newGrid[i][j] = new BombSquare(i,j);
                			newGrid[i][j].setParentFrame(frame.prototype);
                		}
                		if (square.contains("L"))
                			frame.clicks.push(new Click(i, j, CLICKS.LEFT));
                		if (square.contains("R"))
                			frame.clicks.add(new Click(i, j, CLICKS.RIGHT));
                		j++;    
                    });
                	i++;    
                });
                frame.prototype.setGrid(newGrid, frame.numActiveBombs);    
            },
            uncover: function(y, x) {
                this.prototype.gridSquare2DArray[y][x].uncover();    
            },
            clickAll: function()
            {
                this.clicks.forEach(function (click) {
                    if (click.type == CLICKS.LEFT)
                        this.prototype.gridSquare2DArray[click.y][click.x].leftClick();
                    else if (click.type == CLICKS.RIGHT)
                        this.prototype.gridSquare2DArray[click.y][click.x].rightClick(); 
                });
            },
            click: function(index) {
                var click = this.clicks[index];
                if (click.type == CLICKS.LEFT)
                    this.prototype.gridSquare2DArray[click.y][click.x].leftClick();
                else if (click.type == CLICKS.RIGHT)
                    this.prototype.gridSquare2DArray[click.y][click.x].rightClick();
            },
        };
        
        frame.generateTestFrame(testGridStandard, frame);     
    });
    
    it("decremeneting flagged bombs works", function() {
        frame.prototype.decrementFlaggedBombs();
        expect(frame.prototype.getNumActiveBombs()).toBe(testGridStandardInitialBombs - 1);
    });
    
    it("incrementing flagged bombs works", function() {
        frame.prototype.incrementFlaggedBombs();
        expect(frame.prototype.getNumActiveBombs()).toBe(testGridStandardInitialBombs + 1);
    });
    
    it("decremeneting bad flags works", function() {
        frame.prototype.decrementBadFlags();
        expect(frame.prototype.getNumBadFlags()).toBe(-1);
    });
    
    it("incrementing bad flags works", function() {
        frame.prototype.incrementBadFlags();
        expect(frame.prototype.getNumBadFlags()).toBe(1);
    });
    
    it("uncoverDoesNotFailWhenCalledOutsideGridRangeTopLeft", function() {
        frame.prototype.coordinatesAreInGrid(-1, -1);
    });
    
    it("uncoverDoesNotFailWhenCalledOutsideGridRangeTopRight", function() {
        frame.prototype.coordinatesAreInGrid(-1, frame.FRAME_WIDTH);
    });
    
    it("uncoverDoesNotFailWhenCalledOutsideGridRangeBottomRight", function() {
        frame.prototype.coordinatesAreInGrid(frame.FRAME_HEIGHT, frame.FRAME_WIDTH);
    });
    
    it("uncoverDoesNotFailWhenCalledOutsideGridRangeBottomLeft", function() {
        frame.prototype.coordinatesAreInGrid(frame.FRAME_HEIGHT, -1);
    });
    
    it("uncoverDoesNotFailWhenCalledOutsideGridRangeBottom", function() {
        frame.prototype.coordinatesAreInGrid(frame.FRAME_HEIGHT, 0);
    });
    
    it("uncoverDoesNotFailWhenCalledOutsideGridRangeTop", function() {
        frame.prototype.coordinatesAreInGrid(-1, 0);
    });
    
    it("uncoverDoesNotFailWhenCalledOutsideGridRangeLeft", function() {
        frame.prototype.coordinatesAreInGrid(0, -1);
    });
    
    it("uncoverDoesNotFailWhenCalledOutsideGridRangeRight", function() {
        frame.prototype.coordinatesAreInGrid(0, frame.FRAME_WIDTH + 1);
    });
    
    it("uncoveringEmptySquareNotNearBombShouldUncoverAdditionalSquares", function() {
        frame.click(0);
        expect(COLORS.CLEARED).toBe(frame.prototype.gridSquare2DArray[0][0].color);
    	expect(COLORS.CLEARED).toBe(frame.prototype.gridSquare2DArray[4][4].color);
    });
    
    it("uncoveringEmptySquareNearBombShouldNotUncoverAdditionalSquares", function() {
        frame.click(1);
        expect(COLORS.CLEARED).toBe(frame.prototype.gridSquare2DArray[0][0].color);
    	expect(COLORS.NON_ACTIVE_COLOR).toBe(frame.prototype.gridSquare2DArray[0][0].color);
    });
    
    it("uncoveringABombShouldMakeItExplode", function() {
        frame.click(2);
        expect(COLORS.BLOW_UP).toBe(frame.prototype.gridSquare2DArray[2][2].color);
    });
    
    id("", function() {
            
    });
});
/*

@Test
public void taggingAllBombsShouldWinGame()
{
    String[][] winGrid = {
            { "LE", "E", "E", "E", "E" },
            { "E", "E", "E", "E", "E" },
            { "E", "LE", "RB", "E", "E" },
            { "E", "E", "E", "E", "E" },
            { "E", "E", "E", "E", "E" },
    };

    GridFrameTestDouble winFrame = new GridFrameTestDouble(winGrid, FRAME_HEIGHT, FRAME_WIDTH);

    winFrame.clickAll();

    assertTrue(winFrame.isGameWon());
}

@Test
public void notTaggingAllBombsShouldNotGame()
{
    String[][] loseGrid = {
            { "LE", "E", "E", "E", "E" },
            { "E", "E", "E", "E", "E" },
            { "E", "LE", "RB", "E", "E" },
            { "E", "E", "E", "E", "E" },
            { "E", "E", "E", "E", "B" },
    };

    GridFrameTestDouble loseFrame = new GridFrameTestDouble(loseGrid, FRAME_HEIGHT, FRAME_WIDTH);

    loseFrame.clickAll();

    assertFalse(loseFrame.isGameWon());
}

@Test
public void checkToMakeSureFlagIsClearedInCaseOfMassUncover()
{
    String[][] tooManyFlagsGrid = {
            { "RE", "LE", "E", "E", "E" },
            { "E", "E", "E", "E", "E" },
            { "E", "LE", "RB", "E", "E" },
            { "E", "E", "E", "E", "E" },
            { "E", "E", "E", "E", "RB" },
    };

    GridFrameTestDouble tooManyFlagsFrame = new GridFrameTestDouble(tooManyFlagsGrid, FRAME_HEIGHT, FRAME_WIDTH);

    tooManyFlagsFrame.clickAll();

    assertFalse(tooManyFlagsFrame.isGameWon());
}

@Test
public void oneClickWin()
{
    String[][] oneClickWinGrid = {
            { "LE", "E", "E", "E", "E" },
            { "E", "E", "E", "E", "E" },
            { "E", "E", "B", "E", "E" },
            { "E", "E", "E", "E", "E" },
            { "E", "E", "E", "E", "B" },
    };

    GridFrameTestDouble oneClickWinFrame = new GridFrameTestDouble(oneClickWinGrid, FRAME_HEIGHT, FRAME_WIDTH);

    oneClickWinFrame.clickAll();

    assertTrue(oneClickWinFrame.isGameWon());
}

@Test
public void NotAllFlaggedAndWin()
{
    String[][] oneClickWinGrid = {
            { "LE", "E", "E", "E", "E" },
            { "E", "E", "E", "E", "E" },
            { "E", "E", "RB", "E", "E" },
            { "E", "E", "E", "E", "E" },
            { "E", "E", "E", "E", "B" },
    };

    GridFrameTestDouble oneClickWinFrame = new GridFrameTestDouble(oneClickWinGrid, FRAME_HEIGHT, FRAME_WIDTH);

    oneClickWinFrame.clickAll();

    assertTrue(oneClickWinFrame.isGameWon());
}

*/