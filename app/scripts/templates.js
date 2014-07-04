define(['underscore'],function(_){
  return {
    sudokuBoard: _.template(
      "<table class='sudoku-board'>"+
      "<tr>"+
      "<% _.each(squares,function(square,index) { %>"+
        "<% if (index % 3 == 0 && index > 0) { %>"+
          "</tr>"+
          "<tr>"+
        "<% } %>"+
        "<td>"+
          "<table class='sudoku-square'>"+
            "<tr class='top-row'>"+
              "<td><%= square[0] %></td>"+
              "<td><%= square[1] %></td>"+
              "<td><%= square[2] %></td>"+
            "</tr>"+
            "<tr class='middle-row'>"+
              "<td><%= square[3] %></td>"+
              "<td><%= square[4] %></td>"+
              "<td><%= square[5] %></td>"+
            "</tr>"+
            "<tr class='bottom-row'>"+
              "<td><%= square[6] %></td>"+
              "<td><%= square[7] %></td>"+
              "<td><%= square[8] %></td>"+
            "</tr>"+
          "</table>"+
        "</td>"+
      "<% }); %>"+
      "</table>"
    )
  };
});
