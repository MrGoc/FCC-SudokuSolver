"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    let myRes = solver.validate(req.body.puzzle);
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
