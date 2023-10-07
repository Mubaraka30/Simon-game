let buttonColours = ["red","blue","green","yellow"];
let randomChosenColour;
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;


$(document).ready(function(){
  $(document).on("touchstart keypress", function(){
    if(!started){
     $("#level-title").text("Level - " + level);
     nextSequence();
    }
   started = true;
 })
})




$(".btn").click(function(){
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});



function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("right");

    if(userClickedPattern.length === gamePattern.length){

      setTimeout(function(){
        nextSequence();
      },1000);
    }

  }else{
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();

    let audio2 = new Audio("sounds/wrong.mp3");
    audio2.play();
  }
}



function nextSequence(){

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level - " + level);

  let randomNum = Math.floor(Math.random() * 4);

  randomChosenColour =  buttonColours[randomNum];
  gamePattern.push(randomChosenColour);

  let animateButton = $("#" + randomChosenColour);
  animateButton.fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);  
  
  
}


function playSound(name){
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed")
  },100);
}


function startOver(){
    level = 0;
    gamePattern=[];
    started = false;
}

