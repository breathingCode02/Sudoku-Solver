// Get the clear button and add a click event listener

document.getElementById("clear-button").addEventListener("click", clearSudoku);

function clearSudoku() {
    
    // Get all the input elements inside the Sudoku grid
    const inputs = document.querySelectorAll("#sudoku-grid input");

    // Clear the input values
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}
