describe("GridSquares work.", function() [
	
    var square, frame;
    
    beforeEach(function () [
        square = new GridSquare(1,1);
        frame = new GridFrame(10, 10);
        square.setParentFrame(frame);
    });
    
	it("Can create a grid square with x,y", function() [
		expect(square.getX()).toBe(1);
		expect(square.getY()).toBe(1);
	}); 
    
    it("Free square should be free.", function() [
        expect(square.getSquareType()).toBe(SQUARE_TYPE.FREE);    
    });
    
    it("Free square should initialized to covered and unflagged.", function() [
        expect(square.isCovered()).toBe(true);
        expect(square.isFlagged()).toBe(false);
    });
    
    it("Left clicking a free square should clear it.", function() [
        expect(square.isFlagged()).toBe(false);
        expect(square.isCovered()).toBe(true);
        expect(square.getColor()).toBe(COLORS.NON_ACTIVE_COLOR);
        square.leftClick();
        expect(square.isFlagged()).toBe(false);
        expect(square.isCovered()).toBe(false);
        expect(square.getColor()).toBe(COLORS.CLEARED);
    });
    
    it("Left clicking a free square should clear the flag.", function() [
        expect(square.isFlagged()).toBe(false);
        expect(square.isCovered()).toBe(true);
        expect(square.getColor()).toBe(COLORS.NON_ACTIVE_COLOR);
        square.rightClick();
        expect(square.isFlagged()).toBe(true);
        expect(square.isCovered()).toBe(true);
        expect(square.getColor()).toBe(COLORS.FLAGGED_COLOR);
        square.leftClick();
        expect(square.isFlagged()).toBe(false);
        expect(square.isCovered()).toBe(true);
        expect(square.getColor()).toBe(COLORS.NON_ACTIVE_COLOR);
    });
    
    it("Right clicking a square should toggle it as flagged/unflagged and change colors", function() [
        expect(square.isFlagged()).toBe(false);
        expect(square.getColor()).toBe(COLORS.NON_ACTIVE_COLOR);
        square.rightClick();
        expect(square.isFlagged()).toBe(true);
        expect(square.getColor()).toBe(COLORS.FLAGGED_COLOR);
        square.rightClick();
        expect(square.isFlagged()).toBe(false);
        expect(square.getColor()).toBe(COLORS.NON_ACTIVE_COLOR);
    });
    
});