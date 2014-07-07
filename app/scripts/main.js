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
  $(document).on('click touch','#pauseGame:not(.is-paused)',function(e){
    $('.flippable').removeClass('is-flipped');
  })
  .on('click touch','.difficulty-option',function(e){
    var $this       = $(this),
        difficulty  = $this.data('difficulty');
    $('#sudokuBoard').sudoku({
      difficulty: difficulty,
      onInit: function() {
        $('#difficultyLabel').html(difficulty);
        $('.flippable').addClass('is-flipped');
      },
      onPause: function() {
        console.log('paused');
      },
      onRestart: function() {
        console.log('restarted');
      },
      onSolve: function() {
        console.log('solved');
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
