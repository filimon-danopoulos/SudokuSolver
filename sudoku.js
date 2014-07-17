(function() {
    "use strict";    
    module.exports = Sudoku;    
    
    function Sudoku(sudokuString) {
        if(!(this instanceof Sudoku)) {
            throw "Tried to call a constructor as a function."
        }
        if (!sudokuString) {
            throw "Missing argument.";
        }
        this.cells = Sudoku.parseString(sudokuString);
    }
    
    Sudoku.prototype.solve = function() {
        var emptyIndeces = [],
            testValue = 1,
            counter = 0, 
            currentIndex,
            hasEmptyCells;
            
        this.cells.forEach(function(x, pos) {
            if (!x) {
                emptyIndeces.push(pos);
            }
        });
        
        do {
            hasEmptyCells = this.hasEmptyCells();
            currentIndex = emptyIndeces[counter];
            this.cells[currentIndex] = testValue;  
            if (this.isValidSudoku()) {
                counter++;
                currentIndex = emptyIndeces[counter];
                testValue = 1;
            } else {
                while (this.cells[currentIndex] === 9) {
                    this.cells[currentIndex] = 0;
                    counter--;
                    currentIndex = emptyIndeces[counter];
                }
                testValue = this.cells[currentIndex] + 1;
            }
        } while (hasEmptyCells || !this.isValidSudoku()) 
    };
    
    Sudoku.prototype.asString = function() {
        var outputString = "";
        for (var i = 1, iMax = this.cells.length; i <= iMax; i++) {
            outputString += this.cells[i-1] + (i%9 === 0 ? "\n" : " ");
        }
        return outputString.slice(0,-1);
    };
    
    Sudoku.prototype.hasEmptyCells = function() {
        return this.cells.some(function(x) {
            return !x;
        });
    };
    
    Sudoku.prototype.isValidSudoku = function() {
        for (var i = 0; i < 9; i++) {
            if (!this.checkRow(i) || !this.checkColumn(i) || !this.checkBlock(i)) {
                return false;
            }
        }
        return true;
    };
    
    Sudoku.prototype.checkRow = function(row) {
        return Sudoku.isValidCollection(this.getRow(row));
    };
    
    Sudoku.prototype.checkColumn = function(column) {
        return Sudoku.isValidCollection(this.getColumn(column));
    };
    Sudoku.prototype.checkBlock = function(block) {
        return Sudoku.isValidCollection(this.getBlock(block));
    };
    Sudoku.prototype.getRow = function(row) {
        if (row < 0 || row > 8) {
            throw "Argument out of range.";
        }
        var start = row*9;
        return this.cells.slice(start, start+9)
    };
    Sudoku.prototype.getColumn = function(column) {
        if (column < 0 || column > 8) {
            throw "Argument out of range.";
        }
        return this.cells.filter(function(x, pos) {
            return pos%9 === column;    
        });    
    };
    Sudoku.prototype.getBlock = function(block) {
        if (block < 0 || block > 8) {
            throw "Argument out of range.";
        }
        var index = Math.floor(block/3)*27 + (block%3)*3;
        return [1,1,7,1,1,7,1,1,7].map(function (inc) {
            var result = this.cells[index];
            index += inc;
            return result;
        }.bind(this));
        
    };
    Sudoku.isValidCollection = function(collection) {
       var values = collection.filter(function(x) {
            return x !== 0;
        });
        return !values.some(function(x, pos, self) {
            return self.indexOf(x) !== pos;
        }) && !values.some(function(x) {
            return x > 9 || x < 0;
        });
    };
    Sudoku.parseString = function(sudokuString) {
        var rows = sudokuString.split('\n'),
            digitTest = /^[0-9]$/g;
        if (rows.length !== 9) {
            throw "Invalid sudoku string, to few rows.";
        }
        return rows.map(function(x) {
            var cells = x.split(' ');
            if (cells.length !== 9) {
                throw "Invalid sudoku string, to few cells on a row.";
            }
            return cells
                .map(function(x) {
                    var num = parseInt(x, 10);
                    if (isNaN(x)) {
                        throw "Invalid sudoku string, non-numeric character.";
                    }
                    return +x;
                });
        }).reduce(function(total, next) {
            return total.concat(next);
        }, []);
    };
})();
