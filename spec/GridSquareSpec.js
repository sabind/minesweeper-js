describe("GridSquares work.", function() {
	var square = new GridSquare(1,1);
	it("Can create a grid square with x,y", function() {
		expect(square.getX()).toBe(1);
		expect(square.getY()).toBe(1);
	});

	it("Can not be created with negative values", function() {
		//Exceptions
	)};
});