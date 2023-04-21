const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

suite("Unit Tests", () => {
  test("Logic handles a valid puzzle string of 81 characters", function () {
    assert.equal(
      solver.validate(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
      ),
      ""
    );
    assert.equal(
      solver.validate(
        "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3"
      ),
      ""
    );
  });
  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function () {
    assert.equal(
      solver.validate(
        "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.A...5.2.......4..8916..85.72...3"
      ),
      "Invalid characters in puzzle"
    );
    assert.equal(
      solver.validate(
        "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.A...5.2../....4..8916..85.72...3"
      ),
      "Invalid characters in puzzle"
    );
  });
  test("Logic handles a puzzle string that is not 81 characters in length", function () {
    assert.equal(
      solver.validate(
        "1.5..2.84..63.12.7.2..5.9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
      ),
      "Expected puzzle to be 81 characters long"
    );
    assert.equal(
      solver.validate(
        "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.....4..8916..85.72...3"
      ),
      "Expected puzzle to be 81 characters long"
    );
  });
  test("Logic handles a valid row placement", function () {
    assert.equal(
      solver.checkRowPlacement(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        "B",
        "1",
        9
      ),
      true
    );
  });
  test("Logic handles an invalid row placement", function () {
    assert.equal(
      solver.checkRowPlacement(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        "B",
        "1",
        6
      ),
      false
    );
  });
  test("Logic handles a valid column placement", function () {
    assert.equal(
      solver.checkColPlacement(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        "B",
        "1",
        9
      ),
      true
    );
  });
  test("Logic handles an invalid column placement", function () {
    assert.equal(
      solver.checkColPlacement(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        "C",
        "3",
        6
      ),
      false
    );
  });
  test("Logic handles a valid region (3x3 grid) placement", function () {
    assert.equal(
      solver.checkRegionPlacement(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        "B",
        "1",
        9
      ),
      true
    );
  });
  test("Logic handles an invalid region (3x3 grid) placement", function () {
    assert.equal(
      solver.checkRegionPlacement(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        "C",
        "3",
        6
      ),
      false
    );
  });
  test("Valid puzzle strings pass the solver", function () {
    assert.property(
      solver.solve(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
      ),
      "solution"
    );
  });
  test("Invalid puzzle strings fail the solver", function () {
    assert.property(
      solver.solve(
        "1.5..2.84..63.12.7.2..55....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
      ),
      "error"
    );
  });
  test("Solver returns the expected solution for an incomplete puzzle", function () {
    let myRes = solver.solve(
      "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3"
    );
    assert.equal(
      myRes.solution,
      "568913724342687519197254386685479231219538467734162895926345178473891652851726943"
    );
  });
});
