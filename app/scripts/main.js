requirejs.config({
    paths: {
        app: "app",
        utilities: "utilities",
        sudoku: "sudoku",
        templates: "templates",
        underscore: "../../bower_components/underscore/underscore",
        jquery: "../../bower_components/jquery/dist/jquery"
    },
    packages: [

    ]
});

require(['jquery','underscore','sudoku','templates'],function($,_,sudoku,templates){
  $('#sudokuBoard').html(sudoku.init());
});
