define(['jquery','templates'],function($,templates){
  'use strict';

  if (!$.zw) {
      $.zw = {};
  };

  $.zw.sudoku = function (el, options) {
      var base = this;

      base.$el = $(el);
      base.el = el;

      base.$el.data("zw.sudoku", base);

      base.init = function init() {
        base.options = $.extend({},
        $.zw.sudoku.defaultOptions, options);

        base.handleUserInput();
        base.subscribeToEvents();
        if (base.options.generate)
          base.newBoard();
        base.options.onInitialized();
      };

      base.newBoard = function newBoard() {
        var difficulty = $.zw.sudoku.DIFFICULTY[base.options.difficulty];
        base.solvedBoard = base.shuffleBoard(base.generateBoard());
        base.clearedBoard = base.clearBoard(base.solvedBoard, difficulty);
        base.$el.html(base.boardToHtml(base.clearedBoard));
        base.startTimer();
        base.workingBoard = base.clearedBoard;
        base.options.onNew();
      }

      /* Timed games */
      base.startTimer = function startTimer() {

      }

      base.pauseTimer = function pauseTimer() {

      }

      base.pauseGame = function pauseGame() {
        base.pauseTimer();
        base.options.onPause();
      }

      base.restartGame = function restartGame() {
        base.$el.html(base.boardToHtml(base.clearedBoard));
        base.options.onRestart();
      }

      base.checkGame = function checkGame() {
        base.$el.html(base.boardToHtml(base.workingBoard));
        // TODO: Add some difference function between solved and current board
        base.options.onCheck();
      }

      base.generateBoard = function generateBoard() {
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
      }

      base.shuffleBoard = function shuffleBoard(board)
      {
        // TODO: This generates an obvious pattern with an offset,
        //       a better shuffle is needed.
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

      base.getShuffledArray = function getShuffledArray(arrayToShuffle)
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

      base.getDifficultyArray = function getDifficultyArray(difficulty)
      {
        var difficultyArray = [];

        for (var i = 1; i <= 81; i++) {
           difficultyArray.push(i);
        }
        return base.getShuffledArray(difficultyArray).slice(0,difficulty);
      };

      base.clearBoard = function clearBoard(board, difficulty)
      {
        var clearedBoard = new Array(board.length);
        var difficultyArray = base.getDifficultyArray(difficulty);
        for (var i = 0; i < 9; i++)
          {
            clearedBoard[i] = new Array(board[i].length)
            for (var j = 0; j < 9; j++)
              {
                if ($.inArray(Math.floor((i*9 + i/9 + j)+ 1),difficultyArray) !== -1)
                  clearedBoard[i][j] = board[i][j];
                else
                  clearedBoard[i][j] = "";
              }
          }
        return clearedBoard;
      };

      base.handleUserInput = function handleUserInput() {
        // TODO: Keep track of user input in matrix for solve comparison
        base.$el.on('input','.sudoku-square',function(e){
          var $this = $(this);
          $this.removeClass('has-error');
          var $enteredValue = $this.html();
          if ($enteredValue.length > 1)
            {
              //shake box
            }
          var cleanedInput = $enteredValue.slice(0,1);
          base.workingBoard[$this.data('row')][$this.data('column')] = parseInt(cleanedInput);
          $this.html(cleanedInput);
        })
        .on('keydown','.sudoku-square',function(e){
          var $this = $(this);
          $this.removeClass('has-error');
          // Allow: backspace, delete, tab, escape, enter and .
          if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
               // Allow: Ctrl+A
              (e.keyCode == 65 && e.ctrlKey === true) ||
               // Allow: home, end, left, right
              (e.keyCode >= 35 && e.keyCode <= 39)) {
                   // let it happen, don't do anything

                   if (e.keyCode === 8)
                   {
                     $(this).html("");
                     base.workingBoard[$this.data('row')][$this.data('column')] = "";
                   }
                   return;
          }
          // Ensure that it is a number and stop the keypress (1-9)
          if ((e.shiftKey || (e.keyCode < 49 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
              e.preventDefault();
          }
        });
      }

      base.boardToHtml = function boardToHtml(currentBoard)
      {
        //var boardSquares = getSquares(board);
        return templates.sudokuBoard({"rows":currentBoard, "solution":base.solvedBoard});
      };

      base.subscribeToEvents = function subscribeToEvents() {
        base.$el.bind('new', function(e) {
          base.newBoard();
        });
        base.$el.bind('pause', function(e) {
          base.pauseGame();
        });
        base.$el.bind('restart', function(e) {
          base.restartGame();
        });
        base.$el.bind('check', function(e) {
          base.checkGame();
        });
      }

      base.init();
  };

  $.zw.sudoku.DIFFICULTY = {
    "easy": 50,
    "medium": 35,
    "hard": 20
  };

  $.zw.sudoku.defaultOptions = {
      difficulty: "easy",
      generate: true,
      onInitialized: function() {},
      onNew: function() {},
      onPause: function() {},
      onRestart: function() {},
      onCheck: function() {}
  };

  $.fn.zw_sudoku = function
      (options) {
      return this.each(function () {
          (new $.zw.sudoku(this, options));
      });
  };
});


  /*$.fn.sudoku = function(options) {

    getSquares: function getSquares(board)
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
    },
});*/
