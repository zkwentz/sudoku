define(['jquery','underscore','utilities','templates'],function($,_,utilities,templates){
  'use strict';

  $.fn.sudoku = function(options) {

    // Difficuly Settings
    var DIFFICULTY = {
      "easy": 50,
      "medium": 35,
      "hard": 20
    };

    // Options
		var options = $.extend({
			onInit: function() { },
			difficulty: "easy"
		}, options);

    var createBoard = function createBoard($elem)
    {
      var sudokuBoard = {};
      sudokuBoard.solved = shuffleBoard(generateBoard());
      sudokuBoard.cleared = clearBoard(sudokuBoard.solved, DIFFICULTY[options.difficulty]);
      sudokuBoard.solve = function() {$elem.html(solveBoard(sudokuBoard.solved));};
      sudokuBoard.restart = function() {$elem.html(solveBoard(sudokuBoard.cleared));};
      $elem.html(boardToHtml(sudokuBoard.cleared));
      $elem.data('sudoku',sudokuBoard);
      bindSquares($elem);
      options.onInit();
    };

    var bindSquares = function bindSquares($elem) {
      $elem.on('input','.sudoku-square',function(e){
        var $this = $(this);
        var $enteredValue = $this.html();
        if ($enteredValue.length > 1)
          {
            //shake box
          }
        $this.html($enteredValue.slice(0,1));
      })
      .on('keydown','.sudoku-square',function(e){
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything

                 if (e.keyCode === 8)
                   $(this).html("");
                 return;
        }
        // Ensure that it is a number and stop the keypress (1-9)
        if ((e.shiftKey || (e.keyCode < 49 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
      });
    }

    var solveBoard = function(solvedBoard)
    {
      return boardToHtml(solvedBoard);
    }

    var generateBoard = function generateBoard()
    {
      var n = 3;
      var board = new Array(n*n);
      for (var i = 0; i < n*n; i++)
        {
          board[i] = new Array(n*n);
          for (var j = 0; j < n*n; j++)
            {
              board[i][j] = Math.floor((i*n + i/n + j) % (n*n) + 1);
            }
        }
      return board;
    };

    var boardToHtml = function boardToHtml(board)
    {
      //var boardSquares = getSquares(board);
      return templates.sudokuBoard({"squares":board});
    };

    var shuffleBoard = function shuffleBoard(board)
    {
      var shuffledBoard = board;
      for (var times = 0; times < 50; times++)
        {
          var n1 = Math.ceil(Math.random() * 9);
          var n2 = n1;
          while(n1 == n2) {
            n2 = Math.ceil(Math.random() * 9);
          }

          for (var i = 0; i < shuffledBoard.length; i++)
            {
              for (var j = 0; j < shuffledBoard[i].length; j++)
                {
                  if (shuffledBoard[i][j] == n1)
                      shuffledBoard[i][j] = n2;
                  else if (shuffledBoard[i][j] == n2)
                      shuffledBoard[i][j] = n1;
                }
            }
        }
        return shuffledBoard;
    };

    var clearBoard = function clearBoard(board, difficulty)
    {
      var clearedBoard = new Array(board.length);
      var difficultyArray = getDifficultyArray(difficulty);
      for (var i = 0; i < 9; i++)
        {
          clearedBoard[i] = new Array(board[i].length)
          for (var j = 0; j < 9; j++)
            {
              if (utilities.contains(difficultyArray,Math.floor((i*9 + i/9 + j)+ 1)))
                clearedBoard[i][j] = board[i][j];
              else
                clearedBoard[i][j] = "";
            }
        }
      return clearedBoard;
    };

    var getDifficultyArray = function difficultyArray(difficulty)
    {
      var difficultyArray = [];

      for (var i = 1; i <= 81; i++) {
         difficultyArray.push(i);
      }
      return shuffleArray(difficultyArray).slice(0,difficulty);
    };

    var shuffleArray = function shuffleArray(arrayToShuffle)
    {
      var currentIndex = arrayToShuffle.length
        , temporaryValue
        , randomIndex
        ;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = arrayToShuffle[currentIndex];
        arrayToShuffle[currentIndex] = arrayToShuffle[randomIndex];
        arrayToShuffle[randomIndex] = temporaryValue;
      }

      return arrayToShuffle;
    };

		return this.each(function() {
			createBoard($(this));
		});
  }

    /*getSquares: function getSquares(board)
    {
      var boardSquares = new Array(9);
      for (var row = 0; row < board.length; row++)
        {
          for (var col = 0; col < board[row].length; col++)
            {
              var square = getSquare(row,col);
              if (_.isUndefined(boardSquares[square]))
                boardSquares[square] = new Array(9);
              boardSquares[square][((col + row) + (row * 2)) - (square * 3)] = board[row][col];
            }
        }
      return boardSquares;
    },
    getSquare: function getSquare(row, col)
    {
      var rowSection = getSection(row);
      var colSection = getSection(col);
      return (colSection + rowSection) + (rowSection * 2);
    },
    getSection: function getSection(rowOrCol)
    {
      if (rowOrCol < 3)
        return 0;
      else if (rowOrCol > 5)
        return 2;
      else
        return 1;
    },*/
});
