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
    
    beforeEach(function () {
        frame = {
            gridSquare2DArray: new Array(),
            initialBombs: 0,
            FRAME_WIDTH: 5,
            FRAME_HEIGHT: 5,
            clicks: new Array(),
            numActiveBombs: 0,
            prototype: new GridFrame(),
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
                			newGrid[i][j].setParentFrame(frame);
                		}
                		else if (square.contains("B"))
                		{
                			frame.numActiveBombs++;
                			newGrid[i][j] = new BombSquare(i,j);
                			newGrid[i][j].setParentFrame(frame);
                		}
                		if (square.contains("L"))
                			clicks.push(new Click(i, j, CLICKS.LEFT));
                		if (square.contains("R"))
                			clicks.add(new Click(i, j, CLICKS.RIGHT));
                		j++;    
                    });
                	i++;    
                });
                frame.setGrid(newGrid);    
            },
            clickAll: function()
            {
                this.clicks.forEach(function (click) {
                    if (click.type == CLICKS.LEFT)
                        this.gridSquare2DArray[click.y][click.x].leftClick();
                    else if (click.type == CLICKS.RIGHT)
                        this.gridSquare2DArray[click.y][click.x].rightClick(); 
                });
            },
            click: function(index) {
                var click = clicks[index];
                if (click.type == CLICKS.LEFT)
                    this.gridSquare2DArray[click.y][click.x].leftClick();
                else if (click.type == CLICKS.RIGHT)
                    this.gridSquare2DArray[click.y][click.x].rightClick();
            },
        };
        
        spyOn(frame, 'leftClick');
        spyOn(frame, 'rightClick');      
    });
    
    it("decremeneting bombs works", function() {
        frame.decrementFlaggedBombs();
        assertEquals(initialNumBombs - 1, frame.numActiveBombs());
    });
    
});

/*
@Test
public void incrementFlaggedBombsTest()
{
    frame.incrementFlaggedBombs();
    assertEquals(initialNumBombs + 1, frame.numActiveBombs());
}

@Test
public void decrementBadFlagsTest()
{
    frame.decrementBadFlags();
    assertEquals(-1, frame.numBadFlags());
}

@Test
public void incrementBadFlagsTest()
{
    frame.incrementBadFlags();
    assertEquals(1, frame.numBadFlags());
}

@Test 
public void uncoverDoesNotFailWhenCalledOutsideGridRangeTopLeft()
{
	frame.uncover(new GridSquare(-1, -1));
}

@Test
public void uncoverDoesNotFailWhenCalledOutsideGridRangeTopRight()
{
	frame.uncover(new GridSquare(-1, FRAME_WIDTH + 1));
}

@Test 
public void uncoverDoesNotFailWhenCalledOutsideGridRangeBottomRight()
{
	frame.uncover(new GridSquare(FRAME_HEIGHT + 1, FRAME_WIDTH + 1));
}

@Test 
public void uncoverDoesNotFailWhenCalledOutsideGridRangeBottomLeft()
{
	frame.uncover(new GridSquare(FRAME_HEIGHT + 1, -1));
}

@Test 
public void uncoverDoesNotFailWhenCalledOutsideGridRangeBottom()
{
	frame.uncover(new GridSquare(FRAME_HEIGHT + 1, FRAME_WIDTH));
}

@Test 
public void uncoverDoesNotFailWhenCalledOutsideGridRangeTop()
{
	frame.uncover(new GridSquare(-1, FRAME_WIDTH));
}

@Test 
public void uncoverDoesNotFailWhenCalledOutsideGridRangeLeft()
{
	frame.uncover(new GridSquare(FRAME_HEIGHT, -1));
}

@Test 
public void uncoverDoesNotFailWhenCalledOutsideGridRangeRight()
{
	frame.uncover(new GridSquare(FRAME_HEIGHT, FRAME_WIDTH + 1));
}

@Test public void uncoveringEmptySquareNotNearBombShouldUncoverAdditionalSquares()
{
	frame.click(0);
	assertEquals(GridSquare.CLEARED, frame.theGrid[0][0].getBackground());
	assertEquals(GridSquare.CLEARED, frame.theGrid[4][4].getBackground());
}

@Test public void uncoveringEmptySquareNearBombShouldNotUncoverAdditionalSquares()
{
	frame.click(1);
	assertEquals(GridSquare.ALERT, frame.theGrid[2][1].getBackground());
	assertEquals(GridSquare.NON_ACTIVE_COLOR, frame.theGrid[4][4].getBackground());
}

@Test public void uncoveringABombShouldMakeItExplode()
{
	frame.click(2);
	assertEquals(BombSquare.BLOW_UP, frame.theGrid[2][2].getBackground());
}

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

private class Click extends Point
{
	private static final long serialVersionUID = 7910437653391332778L;
	private static final int LEFT_CLICK = 1;
	private static final int RIGHT_CLICK = 2;
	
	int type;
	
	public Click (int x, int y, int type)
	{
		super(x, y);
		this.type = type;
	}

	public int getType() 
	{
		return type;
	}
}
*/