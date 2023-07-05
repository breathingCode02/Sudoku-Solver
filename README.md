# Sudoku-Solver
An implementation of backtracking algorithm to solve sudoku puzzle.

The code provided implements a Sudoku solver using a backtracking algorithm. Let's understand how the backtracking algorithm is used in the code:

1. The `solveSudoku()` function is the entry point for solving the Sudoku problem. It first validates the input Sudoku grid using the `isValidSudoku()` function.

2. If the Sudoku grid is valid, the `solve()` function is called to solve the Sudoku problem. This is where the backtracking algorithm is applied.

3. The `solve()` function takes the current state of the Sudoku grid as an argument. It searches for an empty cell (cell with value "0") using the `findEmptyCell()` function. If no empty cell is found, it means the Sudoku grid is solved, and the function returns the solved grid.

4. If an empty cell is found, the function tries numbers from 1 to 9 in that cell. It checks if the selected number is a valid move by calling the `isValidMove()` function. If the number is valid, it sets the cell value to that number and recursively calls the `solve()` function to solve the remaining grid.

5. If the recursive call returns a valid solution (i.e., the Sudoku is solved), the current grid is returned as the solution. Otherwise, if the recursive call does not find a valid solution, the cell value is reset to "0" (backtracking) and the loop continues to try the next number.

6. The backtracking continues until a valid solution is found or all possible combinations are exhausted.

In summary, the backtracking algorithm works by systematically trying different numbers in empty cells, recursively exploring each possibility until a valid solution is found. If an invalid move is detected, the algorithm backtracks and tries a different number, repeating the process until a solution is found or deemed impossible.

The backtracking approach allows the solver to efficiently explore the solution space, pruning branches that lead to invalid solutions, and significantly reducing the number of possibilities that need to be checked.
