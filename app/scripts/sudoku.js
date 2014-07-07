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
			onComplete: function(board) { },
			difficulty: "easy",
      html: true
		}, options);

    var createBoard = function createBoard($elem)
    {
      var board = generateBoard(DIFFICULTY[options.difficulty]);
      if (options.html)
        $elem.html(boardToHtml(board));
      options.onComplete(board);
    };

    var generateBoard = function generateBoard(difficulty)
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
      board = shuffleBoard(board);
      board = clearBoard(board, difficulty);
      return board;
    };

    var boardToHtml = function boardToHtml(board)
    {
      //var boardSquares = getSquares(board);
      return templates.sudokuBoard({"squares":board});
    };

    var shuffleBoard = function shuffleBoard(board)
    {
      for (var times = 0; times < 50; times++)
        {
          var n1 = Math.ceil(Math.random() * 9);
          var n2 = n1;
          while(n1 == n2) {
            n2 = Math.ceil(Math.random() * 9);
          }

          for (var i = 0; i < board.length; i++)
            {
              for (var j = 0; j < board[i].length; j++)
                {
                  if (board[i][j] == n1)
                      board[i][j] = n2;
                  else if (board[i][j] == n2)
                      board[i][j] = n1;
                }
            }
        }
        return board;
    };

    var clearBoard = function clearBoard(board, difficulty)
    {
      var difficultyArray = getDifficultyArray(difficulty);
      for (var i = 0; i < 9; i++)
        {
          for (var j = 0; j < 9; j++)
            {
              if (!utilities.contains(difficultyArray,Math.floor((i*9 + i/9 + j)+ 1)))
                board[i][j] = "";
            }
        }
      return board;
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
