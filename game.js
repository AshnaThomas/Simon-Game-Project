var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var highScore = 0;

//handler function when any button is clicked
$(".btn").click(function() {

  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

});

//press any key to start the game
$(document).keydown(function() {
  if (!started) {

    nextSequence();
    started = true;
  }
})

// a function to call when any key is pressed for 1st time in keyboard
function nextSequence() {

  userClickedPattern = [];
  //updating level of the game
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); //choose a randon number btw 0-3
  var randomChosenColor = buttonColors[randomNumber]; //choose random color with the randomNumber

  gamePattern.push(randomChosenColor); //insert the random chosen color to new array
  playSound(randomChosenColor);

}

// a function to play sound corresponding to the button clicked
function playSound(name) {

  $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100); // give flash animation the chosen color

  //add audio to the Chosen Color
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// a function to add animation to button clicked by adding and removing a class
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100)
}

//a function to check the random generated sequence and user clicked sequence
function checkAnswer(currentLevel) {

  //only continue the game if the values are same
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if(gamePattern.length === userClickedPattern.length){

      var yourScore = level;
      $(".your-score").text("Your Score:"+yourScore);

      console.log(highScore);
      console.log(yourScore);
      if(highScore<yourScore)
      {
        highScore = yourScore;
        $(".high-score").text("High Score:"+highScore);
      }

      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }

  // executes when the user clicks the wrong pattern
  else {

    if(highScore<(level-1))
    {
      highScore = level-1;
    }

    $(".high-score").text("High Score:"+highScore);

    new Audio("sounds/wrong.mp3").play();

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key To Restart");

    startOver();
  }
}

// this function is called when the user clicked pattern is wrong and game ends
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
  yourScore = 0;
  $(".your-score").text("Your Score:"+yourScore);
}
