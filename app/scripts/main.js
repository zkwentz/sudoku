requirejs.config({
    paths: {
        app: "app",
        sudoku: "sudoku",
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
    },
    packages: [

    ]
});

require(['jquery','sudoku'],function($,sudoku){
  console.log(sudoku.printBoard(sudoku.shuffleBoard(sudoku.generateBoard())));
});
