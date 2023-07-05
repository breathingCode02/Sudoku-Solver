document.addEventListener("DOMContentLoaded", function () {

  var solveButton = document.getElementById("solve-button");   // Get the solve button

  solveButton.addEventListener("click", solveSudoku);    // Add event listener to the solve button


  var generateProblemButton = document.getElementById("generate-problem-button");    // Get the generate problem button

  
  generateProblemButton.addEventListener("click", generateProblem); // Add event listener to the generate problem button

  var difficultySelect = document.getElementById('Deficulty');
  var selectedDifficulty = difficultySelect.value;

    difficultySelect.addEventListener('change', function() {
        selectedDifficulty = difficultySelect.value;
    });


  var inputCells = document.querySelectorAll("#sudoku-grid input");

  inputCells.forEach(function (cell) {
    cell.addEventListener("input", function () {
      var Array = getInputValues();
      if (!isValidSudoku(Array)) {
        alert("Invalid Input!!");
        return;
      }
      checkSolution();
    });
  });

  function getInputValues() {
    var inputs = document.querySelectorAll("#sudoku-grid input");
    var values = [];

    inputs.forEach(function (input) {
      values.push(input.value === "" ? "0" : input.value);
    });

    return convertTo2DArray(values);
  }

  // Function to convert a 1D array to a 2D array

  function convertTo2DArray(arr) {
    var result = [];
    var row = [];

    for (var i = 0; i < arr.length; i++) {
      row.push(arr[i]);
      if (row.length === 9) {
        result.push(row);
        row = [];
      }
    }

    return result;
  }

  //check win
  function checkSolution() {
    var sudokuGrid = document.getElementById("sudoku-grid");
    var inputs = sudokuGrid.getElementsByTagName("input");
    var sudokuArray = getInputValues();
    if (isSudokuSolved(sudokuArray)) {
      alert("Congratulations!! YOU WIN!!");
    }
  }

  function isSudokuSolved(sudokuArray) {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (sudokuArray[i][j] === "0") {
          return false;
        }
      }
    }
    return true;
  }
  
  // Function to solve the Sudoku problem
  function solveSudoku() {

    // Get the Sudoku grid
    var sudokuGrid = document.getElementById("sudoku-grid");

    // Get all input elements in the Sudoku grid
    var inputs = sudokuGrid.getElementsByTagName("input");

    // Convert the input elements into a 2D array
    var sudokuArray = [];

    const inputElements = document.querySelectorAll('#sudoku-grid input');

    for (var i = 0; i < inputs.length; i++) {
      var row = Math.floor(i / 9);
      if (!sudokuArray[row]) {
        sudokuArray[row] = [];
      }
      sudokuArray[row].push(inputs[i].value === "" ? "0" : inputs[i].value);
    }


    // Validate the Sudoku problem

    if (!isValidSudoku(sudokuArray)) {
      alert("Invalid Sudoku problem!!");
      return;
    }

    // Solve the Sudoku problem
    var solvedSudokuArray = solve(sudokuArray);

    // Check if the Sudoku problem has a solution

    if (!solvedSudokuArray) {
      alert("Invalid Sudoku problem or no solution exists!!");
      return;
    }


    // Update the input elements with the solved Sudoku values

    for (var i = 0; i < inputs.length; i++) {
      var row = Math.floor(i / 9);
      var col = i % 9;
      inputs[i].value = solvedSudokuArray[row][col];
    }
  }

  // Function to generate a random Sudoku problem

  function generateProblem() {

    // Get the Sudoku grid
    var sudokuGrid = document.getElementById("sudoku-grid");

    // Get all input elements in the Sudoku grid
    var inputs = sudokuGrid.getElementsByTagName("input");

    // Clear the input values

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }

    // Generate a random Sudoku problem
    var randomSudokuArray = generateRandomSudoku();

    // Update the input elements with the generated Sudoku values

    for (var i = 0; i < inputs.length; i++) {
      var row = Math.floor(i / 9);
      var col = i % 9;
      inputs[i].value = randomSudokuArray[row][col];
    }
  }

  // Function to validate a Sudoku problem

  function isValidSudoku(sudokuArray) {

    // Validate rows

    for (var i = 0; i < 9; i++) {
      var row = sudokuArray[i];
      if (!isValidSet(row)) {
        return false;
      }
    }

    // Validate columns

    for (var j = 0; j < 9; j++) {
      var column = [];
      for (var i = 0; i < 9; i++) {
        column.push(sudokuArray[i][j]);
      }
      if (!isValidSet(column)) {
        return false;
      }
    }

    // Validate 3x3 subgrids

    for (var i = 0; i < 9; i += 3) {
      for (var j = 0; j < 9; j += 3) {
        var subgrid = [];
        for (var k = i; k < i + 3; k++) {
          for (var l = j; l < j + 3; l++) {
            subgrid.push(sudokuArray[k][l]);
          }
        }
        if (!isValidSet(subgrid)) {
          return false;
        }
      }
    }

    return true;
  }

  // Function to validate a set of Sudoku values (row, column, or subgrid)

  function isValidSet(set) {
    var digits = new Set();
    for (var i = 0; i < set.length; i++) {
      var value = set[i];
      if (digits.has(value)) {
        return false;
      }
      if (value !== "0") {
        digits.add(value);
      }
    }
    return true;
  }

  // Function to solve a Sudoku problem

  function solve(sudokuArray) {
    var emptyCell = findEmptyCell(sudokuArray);
    if (!emptyCell) {
      return sudokuArray;
    }

    var row = emptyCell[0];
    var col = emptyCell[1];

    for (var num = 1; num <= 9; num++) {
      if (isValidMove(sudokuArray, row, col, num)) {
        sudokuArray[row][col] = num.toString();
        if (solve(sudokuArray)) {
          return sudokuArray;
        }
        sudokuArray[row][col] = "0";
      }
    }

    return null;
  }

  // Function to find an empty cell in the Sudoku grid

  function findEmptyCell(sudokuArray) {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (sudokuArray[i][j] === "0") {
          return [i, j];
        }
      }
    }
    return null;
  }

  // Function to check if a move is valid in the Sudoku grid

  function isValidMove(sudokuArray, row, col, num) {

    // Check if the number already exists in the row

    for (var i = 0; i < 9; i++) {
      if (sudokuArray[row][i] === num.toString()) {
        return false;
      }
    }

    // Check if the number already exists in the column

    for (var j = 0; j < 9; j++) {
      if (sudokuArray[j][col] === num.toString()) {
        return false;
      }
    }

    // Check if the number already exists in the 3x3 subgrid

    var subgridRow = Math.floor(row / 3) * 3;
    var subgridCol = Math.floor(col / 3) * 3;
    for (var i = subgridRow; i < subgridRow + 3; i++) {
      for (var j = subgridCol; j < subgridCol + 3; j++) {
        if (sudokuArray[i][j] === num.toString()) {
          return false;
        }
      }
    }

    return true;
  }


  // Function to generate a random Sudoku problem


  function generateRandomSudoku() {
    var sudokuArray = [];
    for (var i = 0; i < 9; i++) {
      sudokuArray.push([]);
      for (var j = 0; j < 9; j++) {
        sudokuArray[i].push("0");
      }
    }

    fillSudoku(sudokuArray); // Fill the Sudoku grid with random numbers
    removeCells(sudokuArray); // Remove some cells to create a problem

    return sudokuArray;
  }

  // Function to fill the Sudoku grid with random numbers

  function fillSudoku(grid) {
    solve(grid); // Solve the empty grid to generate a solution
  }

  // Function to remove some cells from the Sudoku grid

  function removeCells(grid) {

    if(selectedDifficulty=="Easy"){
    var numCellsToRemove = Math.floor(Math.random() * 20) + 20; // Randomly choose the number of cells to remove (between 30 and 59) Deficulty level depends on it
    }
    if(selectedDifficulty=="Medium"){
      var numCellsToRemove = Math.floor(Math.random() * 30) + 30; // Randomly choose the number of cells to remove (between 30 and 59) Deficulty level depends on it
    }
    if(selectedDifficulty=="Expert"){
      var numCellsToRemove = Math.floor(Math.random() * 36) + 40; // Randomly choose the number of cells to remove (between 30 and 59) Deficulty level depends on it
      }
    var cellsRemoved = 0;

    while (cellsRemoved < numCellsToRemove) {
      var row = Math.floor(Math.random() * 9); // Randomly choose a row
      var col = Math.floor(Math.random() * 9); // Randomly choose a column

      if (grid[row][col] !== "0") {
        grid[row][col] = ""; // Set the cell value to (blank)
        cellsRemoved++;
      }
    }
  }

});
