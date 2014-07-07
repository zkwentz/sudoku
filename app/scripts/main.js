requirejs.config({
    paths: {
        utilities: "utilities",
        'jquery.zw.sudoku': "jquery.zw.sudoku",
        templates: "templates",
        underscore: "../../bower_components/underscore/underscore",
        jquery: "../../bower_components/jquery/dist/jquery"
    },
    packages: [

    ]
});

require(['jquery','underscore','jquery.zw.sudoku','templates'],function($,_,sudoku,templates){
  var $sudokuBoard = $('#sudokuBoard');

  // TODO: use modernizr to change event selector to touch or click based
  //       on device
  $(document).on('click','#pauseGame:not(.is-paused)',function(e){
    $('.flippable').removeClass('is-flipped');
  })
  .on('click','.difficulty-option',function(e){
    var $this       = $(this),
        difficulty  = $this.data('difficulty');
    $sudokuBoard.zw_sudoku({
      difficulty: difficulty,
      onInitialized: function() {
        $('#difficultyLabel').html(difficulty);
        $('.flippable').addClass('is-flipped')
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
  .on('click','#newGame',function(e){
    var $this = $(this);
    $sudokuBoard.trigger('new');
    //$('.flippable').removeClass('is-flipped');
  })
  .on('click','#pauseGame',function(e){
    var $this = $(this);
    $('#sudokuBoard').trigger('pause');
  })
  .on('click','#restartGame',function(e){
    $sudokuBoard.trigger('restart');
  })
  .on('click','#solveGame',function(e){
    $sudokuBoard.trigger('solve');
  })

  $('.is-paused').on('click','.empty',function(e){
    e.preventDefault();
  });
});
