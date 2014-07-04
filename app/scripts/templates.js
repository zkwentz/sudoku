define(['underscore'],function(_){
  return {
    squareTemplate: ""+
    "<table class='sudoku-square'>"
      "<tr class='top-row'>"+
        "<td><%= cell1 %></td>"+
        "<td><%= cell2 %></td>"+
        "<td><%= cell3 %></td>"+
      "</tr>"+
      "<tr class='middle-row'>"+
        "<td><%= cell5 %></td>"+
        "<td><%= cell6 %></td>"+
        "<td><%= cell7 %></td>"+
      "</tr>"+
      "<tr class='bottom-row'>"+
        "<td>7</td>"+
        "<td>8</td>"+
        "<td>9</td>"+
      "</tr>"+
    "</table>";
  };
});
