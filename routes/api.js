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
    if (!coordinate || !value) {
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

    let myRes = solver.validate(puzzle);
    res.json(myRes);
  });

  app.route("/api/solve").post((req, res) => {
    let puzzle = req.body.puzzle;
    let myRes = solver.validate(puzzle);
    if (myRes !== "") {
      res.json({ error: myRes });
    } else {
      myRes = solver.solve(puzzle);
      res.json({ solution: myRes });
    }
  });
};
