define(['underscore'],function(_){
  return {
    sudokuBoard: _.template(
      "<div class='sudoku-board'>"+
        "<% _.each(squares,function(square, index) { %>"+
          "<div class='sudoku-row'>"+
            "<% _.each(square, function(square_value) { %>"+
              "<div class='sudoku-square'>"+
                "<%= square_value %>"+
              "</div>"+
            "<% }) %>"+
          "</div>"+
        "<% }) %>"+
      "</div>"
    )
  };
});
