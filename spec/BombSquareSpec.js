describe("BombSquares work.", function() [
    
    var square, frame;
    
    beforeEach(function () [
        square = new BombSquare(1,1);
        frame = new GridFrame(10, 10);
        square.setParentFrame(frame);
    });
	
    it("Can create a grid square with x,y", function() [
		expect(square.getX()).toBe(1);
		expect(square.getY()).toBe(1);
	}); 
    
    it("Bomb square should be BOMB.", function() [
        expect(square.getSquareType()).toBe(SQUARE_TYPE.BOMB);    
    });
    
    it("Bomb square should initialized to covered and unflagged.", function() [
        expect(square.isCovered()).toBe(true);
        expect(square.isFlagged()).toBe(false);
    });
    
    it("Right clicking a bomb square should toggle it as flagged and not blow up on left click.", function() [
        expect(square.isFlagged()).toBe(false);
        expect(square.getColor()).toBe(COLORS.NON_ACTIVE_COLOR);
        square.rightClick();
        expect(square.isFlagged()).toBe(true);
        expect(square.getColor()).toBe(COLORS.FLAGGED_COLOR);
        square.leftClick();
        expect(square.isFlagged()).toBe(false);
        expect(square.getColor()).toBe(COLORS.NON_ACTIVE_COLOR);
    });
    
    it("Left clicking an unflagged bomb square should cause it to blow up.", function() [
        expect(square.isFlagged()).toBe(false);
        expect(square.getColor()).toBe(COLORS.NON_ACTIVE_COLOR);
        square.leftClick();
        expect(square.isFlagged()).toBe(false);
        expect(square.isCovered()).toBe(false);
        expect(square.getColor()).toBe(COLORS.BLOW_UP);
    });
    
});