describe("GridSquares work.", function() {
	var square = new GridSquare(1,1);
    var frame = new GridFrame(10, 10);
    square.setParentFrame(frame);
    
	it("Can create a grid square with x,y", function() {
		expect(square.getX()).toBe(1);
		expect(square.getY()).toBe(1);
	});    
});