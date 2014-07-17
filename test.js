(function() {
    "use strict";
    var Sudoku = require("./sudoku"),
        tests = {}, 
        testSudokuString = 
           "4 0 0 7 0 0 0 0 8\n"+
           "0 3 0 0 6 0 9 0 7\n"+
           "0 0 0 0 0 2 0 0 0\n"+
           "0 0 0 6 7 0 0 2 0\n"+
           "0 7 0 0 0 0 0 9 0\n"+
           "0 2 0 0 3 4 0 0 0\n"+
           "0 0 0 4 0 0 0 0 0\n"+
           "1 0 4 0 2 0 0 3 0\n"+
           "9 0 0 0 0 8 0 0 5";
                    
    tests.parseValidStringTest = {
        description: "A valid string parses to an array and each element should be the same.",
        run: function() {
            var result = Sudoku.parseString(testSudokuString),
                expected = [
                    4,0,0,7,0,0,0,0,8,0,3,0,0,6,0,9,0,7,0,0,0,0,0,2,0,0,0,
                    0,0,0,6,7,0,0,2,0,0,7,0,0,0,0,0,9,0,0,2,0,0,3,4,0,0,0,
                    0,0,0,4,0,0,0,0,0,1,0,4,0,2,0,0,3,0,9,0,0,0,0,8,0,0,5
                ];
            return result.every(function(x, pos) {
                return expected[pos] === x;
            });
        }
    };
    tests.parseInvalidRowsTest = {
        description: "If too few rows are supplied an exception should be thrown.",
        run: shouldThrow(function() {
            Sudoku.parseString(testSudokuString.slice(0, -"\n9 0 0 0 0 8 0 0 5".length));
        })
    };
    tests.parseInvalidCellsTest = {
        description: "If too few cells are supplied in a row an exception should be thrown.",
        run: shouldThrow(function() {            
            new Sudoku(testSudokuString.slice(0, -2));
        })
    };
    tests.parseNonNumericTest = {
        description: "If any cell is not a number an exception should be thrown.",
        run: shouldThrow(function() {
            new Sudoku(testSudokuString.replace(/0/, 'a'));  
        })
    };
    tests.constructorArgumentTest = {
        description: "If no argument is passed to the constructor it should throw an exception.",
        run: shouldThrow(function() {
            new Sudoku();
        })
    };
    tests.constructorWithoutNewTest = {
        description: "If the constructor is called without new an exception should be thrown.",
        run: shouldThrow(function() {
            Sudoku(testSudoku);
        })
    };
    tests.getRowSmallArgumentTest = {
        description: "If the argument is less than zero an exception should be thrown.",
        run: shouldThrow(function() {
            var testSudoku = new Sudoku(testSudokuString);
            testSudoku.getRow(-1);
        })
    };
    tests.getRowLargeArgumentTest = {
        description: "If the argument is larger than eight an exception should be thrown.",
        run: shouldThrow(function() {
            var testSudoku = new Sudoku(testSudokuString);
            testSudoku.getRow(9);
        })
    };
    tests.getRowTest = {
        description: "Each row should correspond to the right index.",
        run: function() {
            var testSudoku = new Sudoku(testSudokuString),
                rows = [
                    [4,0,0, 7,0,0, 0,0,8],
                    [0,3,0, 0,6,0, 9,0,7],
                    [0,0,0, 0,0,2, 0,0,0],
                    
                    [0,0,0, 6,7,0, 0,2,0],
                    [0,7,0, 0,0,0, 0,9,0],
                    [0,2,0, 0,3,4, 0,0,0],
                    
                    [0,0,0, 4,0,0, 0,0,0],
                    [1,0,4, 0,2,0, 0,3,0],
                    [9,0,0, 0,0,8, 0,0,5]
                ];
            return rows.every(function(x, posX) {
                return testSudoku.getRow(posX).every(function(y, posY) {
                    return x[posY] === y;
                });
            });
        }
    };
    tests.getColumnSmallArgumentTest = {
        description: "If the argument is less than zero an exception should be thrown.",
        run: shouldThrow(function() {
            var testSudoku = new Sudoku(testSudokuString);
            testSudoku.getColumn(-1);
        })
    };
    tests.getColumnLargeArgumentTest = {
        description: "If the argument is larger than eight an exception should be thrown.",
        run: shouldThrow(function() {
            var testSudoku = new Sudoku(testSudokuString);
            testSudoku.getColumn(9);
        })
    };
    tests.getColumnTest = {
        description: "Each column should correspond to the right index.", 
        run: function() {
            var testSudoku = new Sudoku(testSudokuString),
                columns = [
                    [4,0,0, 0,0,0, 0,1,9],
                    [0,3,0, 0,7,2, 0,0,0],
                    [0,0,0, 0,0,0, 0,4,0],
                    
                    [7,0,0, 6,0,0, 4,0,0],
                    [0,6,0, 7,0,3, 0,2,0],
                    [0,0,2, 0,0,4, 0,0,8],
                    
                    [0,9,0, 0,0,0, 0,0,0],
                    [0,0,0, 2,9,0, 0,3,0],
                    [8,7,0, 0,0,0, 0,0,5]
                ];
            return columns.every(function(x, posX) {
                return testSudoku.getColumn(posX).every(function(y, posY) {
                    return x[posY] === y;
                });
            });
        }
    };
    tests.getBlockSmallArgumentTest = {
        description: "If the argument is less than zero an exception should be thrown.",
        run: shouldThrow(function() {
            var testSudoku = new Sudoku(testSudokuString);
            testSudoku.getBlock(-1);
        })
    };
    tests.getBlockLargeArgumentTest = {
        description: "If the argument is larger than eight an exception should be thrown.",
        run: shouldThrow(function() {
            var testSudoku = new Sudoku(testSudokuString);
            testSudoku.getBlock(9);
        })
    };
    tests.getBlockTest = {
        description: "Each block should correspond the the right index",
        run: function() {
            var testSudoku = new Sudoku(testSudokuString),
                blocks = [
                    [4,0,0, 0,3,0, 0,0,0], 
                    [7,0,0, 0,6,0, 0,0,2], 
                    [0,0,8, 9,0,7, 0,0,0],
                    
                    [0,0,0, 0,7,0, 0,2,0], 
                    [6,7,0, 0,0,0, 0,3,4], 
                    [0,2,0, 0,9,0, 0,0,0],
                    
                    [0,0,0, 1,0,4, 9,0,0], 
                    [4,0,0, 0,2,0, 0,0,8], 
                    [0,0,0, 0,3,0, 0,0,5]
                ];
            return blocks.every(function(x, posX) {
                return testSudoku.getBlock(posX).every(function(y, posY) {
                    return x[posY] === y;
                });
            });
        }
    }
    tests.isValidCollectionOnlyZeroesTest = {
        description: "A collection with only zeroes should be valid.",
        run: function() {   
            return Sudoku.isValidCollection([0,0,0, 0,0,0, 0,0,0]);
        }
    };
    tests.isValidCollectioValidAndZeroesTest = {
        description: "A collection with no other repeated values than zero should be valid.",
        run: function() {
            return Sudoku.isValidCollection([4,0,0, 7,0,0, 0,0,8]);
        }
    };
    tests.isValidCollectionOneToNineTest = {
        description: "A collection with the values one to nine should be valid.",
        run: shouldBeTruthy(function() {
            return Sudoku.isValidCollection([1,2,3, 4,5,6, 7,8,9]);
        })
    };
    tests.isValidCollectionRepeatedValueTest = {
        description: "A collection with a non-zero element repeated more than once should not be valid.",
        run: function() {
            return !Sudoku.isValidCollection([1,1,0, 0,0,0, 0,0,0]);
        }
    };
    tests.isValidCollectionLargerThanNineInputTest = {
        description: "A collection with a value larger than nine should be invalid.",
        run: function() {
            return !Sudoku.isValidCollection([0,100,0, 0,0,0, 0,0,0]);
        }
    };
    tests.isValidCollectionLessThanZeroInputTest = {
        description: "A collection with a value less than zero should be invalid.",
        run: function() {
            return !Sudoku.isValidCollection([0,-100,0, 0,0,0, 0,0,0]);
        }
    };
    tests.asStringTest = {
        description: "A sudoku's string representation should be the same as the original string",
        run: shouldBeTruthy(function() {
            var sudoku = new Sudoku(testSudokuString);
            return sudoku.asString() === testSudokuString;
        })
    };
    
    function shouldBeTruthy(test, args, scope) {
        args = args || [];
        scope = scope || null;
        return function() {
            return !!test.apply(scope, args);
        };
    } 
    function shouldThrow(test, args, scope) {
        return function() {
            try {
                args = args || [];
                scope = scope || null;
                test.apply(scope, args);
                return false;
            } catch (ex) {
                return true;
            }
        };
    };
    
    (function() {
        var test,
            pass, 
            numberOfFailures = 0,
            totalTests = 0,
            ignorePassed = process.argv.length === 3 && process.argv[2] === "--ignore-passed";
            
            
        for (var prop in tests) {
            if (tests.hasOwnProperty(prop)) {
                totalTests++;
                test = tests[prop];
                pass = test.run();
                if (!pass) {
                    numberOfFailures++;
                }
                if ((!ignorePassed && pass) || !pass) {                     
                    console.log((pass ? "[PASS] " : "> [FAIL] ")+prop+": "+(test.description || "No description."));
                }
            }
        }
        console.log("[RESULT] "+numberOfFailures+"/"+totalTests+" failed tests.");
    })();
})();
