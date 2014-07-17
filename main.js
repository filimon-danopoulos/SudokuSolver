(function() {
    "use strict";
    
    var Sudoku = require("./sudoku"),
        sudokuString = 
           "6 0 0 2 0 7 8 0 0\n"+
           "0 5 0 0 6 3 0 0 2\n"+
           "0 0 7 0 1 0 3 6 0\n"+
           "5 7 0 0 0 0 0 0 3\n"+
           "0 0 0 8 9 5 0 0 0\n"+
           "9 0 0 0 0 0 0 1 8\n"+
           "0 3 4 0 5 0 9 0 0\n"+
           "1 0 0 3 8 0 0 4 0\n"+
           "0 0 9 6 0 4 0 0 5",
        sudoku = new Sudoku(sudokuString);
    console.log(sudoku.asString());
    sudoku.solve();
    console.log(sudoku.asString());
})();
