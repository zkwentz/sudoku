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
  $(document).on('input','.sudoku-square',function(e){
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
  })
  .on('click touch','#pauseGame:not(.is-paused)',function(e){
    $('.flippable').removeClass('is-flipped');
  })
  .on('click touch','.difficulty-option',function(e){
    var $this       = $(this),
        difficulty  = $this.data('difficulty');
    $('#sudokuBoard').sudoku({
      difficulty: difficulty,
      onComplete: function(board) {
        $('#difficultyLabel').html(difficulty);
        $('.flippable').addClass('is-flipped');
      }
    });
  })
  .on('click touch','#newGame',function(e){
    var $this = $(this);
    $('.flippable').removeClass('is-flipped');
    //kill current sudoku board
  });

  $('.is-paused').on('click','.empty',function(e){
    e.preventDefault();
  });
});
