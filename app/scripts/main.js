requirejs.config({
    paths: {
        app: "app",
        utilities: "utilities",
        sudoku: "sudoku",
        underscore: "../../bower_components/underscore/underscore",
        jquery: "../../bower_components/jquery/dist/jquery"
    },
    packages: [

    ]
});

require(['jquery','underscore','sudoku'],function($,_,sudoku){
  console.log(sudoku.printBoard(sudoku.generateBoard("easy")));
});
