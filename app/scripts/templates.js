define(['underscore'],function(_){
  return {
    sudokuBoard: _.template(
      "<div class='sudoku-board'>"+
        "<% _.each(rows,function(boardRow, row) { %>"+
          "<div class='sudoku-row'>"+
            "<% _.each(boardRow, function(boardSquare, column) { %>"+
              "<div data-row='<%= row %>' data-column='<%= column %>' class='sudoku-square "+
                  "<% if (boardSquare != solution[row][column] && boardSquare != ''){ %> has-error empty' contenteditable>"+
                  "<% } else if (boardSquare == '') { %>empty' contenteditable><% } else { %>'><% } %>"+
                "<%= boardSquare %>"+
              "</div>"+
            "<% }) %>"+
          "</div>"+
        "<% }) %>"+
      "</div>"
    )
  };
});
