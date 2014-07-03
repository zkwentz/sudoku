define(function(){
  return {
    printBoard: function printBoard(board)
      {
        var boardString = "";
        for (var i = 0; i < board.length; i++)
          {
            if (i % 3 == 0 || i == 0)
              boardString += "-------------\n";
            var rowString = "";
            for (var j = 0; j < board[i].length; j++)
              {
                if (j % 3 == 0 || j == 0)
                  rowString += "|";
                rowString += board[i][j];
              }
            rowString += "|";
            boardString += rowString + "\n";
          }
        boardString += "-------------\n";
        return boardString;
      },
    generateBoard: function generateBoard()
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
    },
    shuffleBoard: function shuffleBoard(board)
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
    }
  };
});
