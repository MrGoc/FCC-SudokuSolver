"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    let coordinate = req.body.coordinate;
    let puzzle = req.body.puzzle;
    let value = req.body.value;
    let xAxis = solver.xAxis();
    let yAxis = solver.yAxis();
    if (!coordinate || !value || !puzzle) {
      res.json({ error: "Required field(s) missing" });
      return;
    }
    if (xAxis.indexOf(+value) === -1) {
      res.json({ error: "Invalid value" });
      return;
    }
    if (coordinate.length !== 2) {
      res.json({ error: "Invalid coordinate" });
      return;
    } else {
      if (
        xAxis.indexOf(+coordinate[1]) === -1 ||
        yAxis.indexOf(coordinate[0]) === -1
      ) {
        res.json({ error: "Invalid coordinate" });
        return;
      }
    }
    let row = coordinate[0];
    let col = +coordinate[1];
    let myRes = solver.validate(puzzle);
    if (myRes === "") {
      let rowOk = solver.checkRowPlacement(puzzle, row, col, value);
      let colOk = solver.checkColPlacement(puzzle, row, col, value);
      let boxOk = solver.checkRegionPlacement(puzzle, row, col, value);
      let conflict = [];
      if (rowOk && colOk && boxOk) myRes = { valid: true };
      else {
        if (!rowOk) conflict.push("row");
        if (!colOk) conflict.push("column");
        if (!boxOk) conflict.push("region");
        res.json({ valid: false, conflict: conflict });
      }
    } else res.json({ error: myRes });
  });

  app.route("/api/solve").post((req, res) => {
    let puzzle = req.body.puzzle;
    let myRes = solver.validate(puzzle);
    if (myRes !== "") {
      res.json({ error: myRes });
    } else {
      myRes = solver.solve(puzzle);
      res.json(myRes);
    }
  });
};
