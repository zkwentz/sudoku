requirejs.config({
    paths: {
        app: "app",
        utilities: "utilities",
        sudoku: "sudoku",
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
    },
    packages: [

    ]
});

require(['jquery','sudoku'],function($,sudoku){
  console.log(sudoku.printBoard(sudoku.generateBoard("hard")));
});
