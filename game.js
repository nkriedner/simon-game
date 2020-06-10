var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Create a random color and show-animate it to user
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(300)
    .fadeIn(300);
  playSound(randomChosenColor);
  console.log(gamePattern);
}

// Play the sound of the colored buttons
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Add animation to user clicks
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  window.setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 200);
}

// When user clicks on a button add color of button to userClickedPattern array
$(".btn").click(function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Start the nextSequence function on keyboard click
$(document).keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});
// Start the nextSequence function on h1 click
$("h1").click(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  console.log(currentLevel);
  console.log(userClickedPattern[currentLevel]);
  console.log(gamePattern[currentLevel]);
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  started = false;
  level = 0;
}
