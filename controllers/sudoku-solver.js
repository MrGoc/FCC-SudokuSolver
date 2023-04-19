function convertPuzzleStringToGrid(puzzleString) {
  let myPuzzle = puzzleString.replaceAll(".", 0);
  let grid = [];
  let row = [];
  for (let i = 0; i < puzzleString.length; i++) {
    row.push(+myPuzzle[i]); // convert element to number
    if (row.length === 9) {
      grid.push(row);
      row = [];
    }
  }
  return grid;
}

const xAxisValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const yAxisValues = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

class SudokuSolver {
  xAxis() {
    return xAxisValues;
  }
  yAxis() {
    return yAxisValues;
  }

  validate(puzzleString) {
    if (!puzzleString) return "Required field missing";
    else if (puzzleString.length !== 81)
      return "Expected puzzle to be 81 characters long";
    else if ((puzzleString.match(/[\d\.]/g) || []).length !== 81)
      return "Invalid characters in puzzle";
    else return "";
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let myRow = yAxisValues.indexOf(row);
    //let myCol = xAxisValues.indexOf(+column);
    let grid = convertPuzzleStringToGrid(puzzleString);
    for (let i = 0; grid[myRow].length; i++) {
      if (grid[myRow][i] === +value) return false;
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let myCol = xAxisValues.indexOf(+column);
    let grid = convertPuzzleStringToGrid(puzzleString);
    for (let i = 0; grid.length; i++) {
      if (grid[i][myCol] === +value) return false;
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let myRow = Math.floor(yAxisValues.indexOf(row) / 3) * 3;
    let myCol = Math.floor(xAxisValues.indexOf(+column) / 3) * 3;
    let grid = convertPuzzleStringToGrid(puzzleString);

    for (var r = 0; r < 3; r++) {
      for (var c = 0; c < 3; c++) {
        if (grid[myRow + r][myCol + c] === value) return false;
      }
    }
    return true;
  }

  solve(puzzleString) {
    let grid = convertPuzzleStringToGrid(puzzleString);
    return puzzleString;
  }
}

module.exports = SudokuSolver;

/*
function solveSudoku(board) {
  // Pronađi prazno polje na ploči
  let emptyCell = findEmptyCell(board);
  // Ako nema praznih ćelija, vraćamo true jer smo završili
  if (!emptyCell) {
    return true;
  }
  let row = emptyCell[0];
  let col = emptyCell[1];
  // Pokušajemo popuniti prazno polje
  for (let num = 1; num <= 9; num++) {
    // Ako možemo popuniti prazno polje s brojem num, probamo
    if (isValid(board, row, col, num)) {
      board[row][col] = num;
      // Rekurzivno nastavljamo tražiti rješenje
      if (solveSudoku(board)) {
        return true;
      }
      // Ako nismo pronašli rješenje, poništavamo trenutni pokušaj
      board[row][col] = 0;
    }
  }
  // Ako nismo pronašli rješenje nakon pokušaja s svim brojevima od 1 do 9, vraćamo false
  return false;
}

function findEmptyCell(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return [row, col];
      }
    }
  }
  // Ako nema praznih ćelija, vraćamo null
  return null;
}

function isValid(board, row, col, num) {
  // Provjeravamo je li num već u retku
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) {
      return false;
    }
  }
  // Provjeravamo je li num već u stupcu
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) {
      return false;
    }
  }
  // Provjeravamo je li num već u kvadrantu 3x3
  let startRow = Math.floor(row / 3) * 3;
  let startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === num) {
        return false;
      }
    }
  }
  // Ako je sve u redu, vraćamo true
  return true;
}


*/
