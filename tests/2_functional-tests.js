const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  test("Solve a puzzle with valid puzzle string: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post("/api/solve")
      .type("form")
      .send({
        puzzle:
          "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "solution",
          "object in body should contain solution"
        );
        assert.equal(
          res.body.solution,
          "568913724342687519197254386685479231219538467734162895926345178473891652851726943",
          "solution is incorrect"
        );
        done();
      });
  });
  test("Solve a puzzle with missing puzzle string: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post("/api/solve")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "error",
          "object in body should contain error"
        );
        assert.equal(
          res.body.error,
          "Required field missing",
          "error is incorrect"
        );
        done();
      });
  });
  test("Solve a puzzle with invalid characters: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post("/api/solve")
      .type("form")
      .send({
        puzzle:
          "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.A...5.2.......4..8916..85.72...3",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "error",
          "object in body should contain error"
        );
        assert.equal(
          res.body.error,
          "Invalid characters in puzzle",
          "error is incorrect"
        );
        done();
      });
  });
  test("Solve a puzzle with incorrect length: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post("/api/solve")
      .type("form")
      .send({
        puzzle:
          "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.A...5.2.....4..8916..85.72...3",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "error",
          "object in body should contain error"
        );
        assert.equal(
          res.body.error,
          "Expected puzzle to be 81 characters long",
          "error is incorrect"
        );
        done();
      });
  });
  test("Solve a puzzle that cannot be solved: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post("/api/solve")
      .type("form")
      .send({
        puzzle:
          "6..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "error",
          "object in body should contain error"
        );
        assert.equal(
          res.body.error,
          "Puzzle cannot be solved",
          "error is incorrect"
        );
        done();
      });
  });
  test("Check a puzzle placement with all fields: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .type("form")
      .send({
        puzzle:
          "6..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3",
        coordinate: "C1",
        value: 1,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "valid",
          "object in body should contain valid"
        );
        assert.equal(res.body.valid, true, "valid property is incorrect");
        done();
      });
  });
  test("Check a puzzle placement with single placement conflict: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .type("form")
      .send({
        puzzle:
          "6..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3",
        coordinate: "C1",
        value: 4,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "valid",
          "object in body should contain valid"
        );
        assert.property(
          res.body,
          "conflict",
          "object in body should contain conflict"
        );
        assert.equal(res.body.valid, false, "valid property is incorrect");
        assert.isArray(
          res.body.conflict,
          "conflict property in body should be an array"
        );
        assert.equal(
          res.body.conflict.length,
          1,
          "conflict should contain one element"
        );
        assert.equal(
          res.body.conflict[0],
          "column",
          "conflict should contain element column"
        );
        done();
      });
  });
  test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .type("form")
      .send({
        puzzle:
          "6..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3",
        coordinate: "C1",
        value: 3,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "valid",
          "object in body should contain valid"
        );
        assert.property(
          res.body,
          "conflict",
          "object in body should contain conflict"
        );
        assert.equal(res.body.valid, false, "valid property is incorrect");
        assert.isArray(
          res.body.conflict,
          "conflict property in body should be an array"
        );
        assert.equal(
          res.body.conflict.length,
          2,
          "conflict should contain 2 elements"
        );
        assert.equal(
          res.body.conflict[0],
          "column",
          "conflict should contain element column"
        );
        assert.equal(
          res.body.conflict[1],
          "region",
          "conflict should contain element region"
        );
        done();
      });
  });
  test("Check a puzzle placement with all placement conflicts: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .type("form")
      .send({
        puzzle:
          "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3",
        coordinate: "C1",
        value: 5,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "valid",
          "object in body should contain valid"
        );
        assert.property(
          res.body,
          "conflict",
          "object in body should contain conflict"
        );
        assert.equal(res.body.valid, false, "valid property is incorrect");
        assert.isArray(
          res.body.conflict,
          "conflict property in body should be an array"
        );
        assert.equal(
          res.body.conflict.length,
          3,
          "conflict should contain 3 elements"
        );
        assert.equal(
          res.body.conflict[0],
          "row",
          "conflict should contain element row"
        );
        assert.equal(
          res.body.conflict[1],
          "column",
          "conflict should contain element column"
        );
        assert.equal(
          res.body.conflict[2],
          "region",
          "conflict should contain element region"
        );
        done();
      });
  });
  test("Check a puzzle placement with missing required fields: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .type("form")
      .send({
        puzzle:
          "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3",
        value: 5,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "error",
          "object in body should contain error"
        );
        assert.equal(
          res.body.error,
          "Required field(s) missing",
          "error property is incorrect"
        );
        done();
      });
  });
  test("Check a puzzle placement with invalid characters: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .type("form")
      .send({
        puzzle:
          "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.A...5.2.......4..8916..85.72...3",
        coordinate: "C1",
        value: 5,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "error",
          "object in body should contain error"
        );
        assert.equal(
          res.body.error,
          "Invalid characters in puzzle",
          "error property is incorrect"
        );
        done();
      });
  });
  test("Check a puzzle placement with incorrect length: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .type("form")
      .send({
        puzzle:
          "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4...5.2.......4..8916..85.72...3",
        coordinate: "C1",
        value: 5,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "error",
          "object in body should contain error"
        );
        assert.equal(
          res.body.error,
          "Expected puzzle to be 81 characters long",
          "error property is incorrect"
        );
        done();
      });
  });
  test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .type("form")
      .send({
        puzzle:
          "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3",
        coordinate: "S1",
        value: 5,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "error",
          "object in body should contain error"
        );
        assert.equal(
          res.body.error,
          "Invalid coordinate",
          "error property is incorrect"
        );
        done();
      });
  });
  test("Check a puzzle placement with invalid placement value: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .type("form")
      .send({
        puzzle:
          "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3",
        coordinate: "C1",
        value: 10,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "error",
          "object in body should contain error"
        );
        assert.equal(
          res.body.error,
          "Invalid value",
          "error property is incorrect"
        );
        done();
      });
  });
});
