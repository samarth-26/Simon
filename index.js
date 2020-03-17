var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0; //starting level of game

//detecting keyboard key press for first time
$(document).keydown(function() {
    setTimeout(function() {
        if (!started) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    }, 1019);

});

// Handling user Clicks
$(".btn").click(function(event) {

    var userChoosenColour = $(event.target).attr("id");

    userClickedPattern.push(userChoosenColour);

    animatePress(userChoosenColour);
    playSound(userChoosenColour);
    checkAnwser(userClickedPattern.length - 1);

})

//Comparing game pattern with user's pattern of clicks
function checkAnwser(currentIndex) {

    if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    } else {

        playSound("wrong");


        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


//For generating next sequence 
function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChoosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChoosenColour);


    $("#" + randomChoosenColour).fadeOut(100).fadeIn(100); //button blinks
    playSound(randomChoosenColour);
    animatePress(randomChoosenColour);

}


//playing sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


//For animating user clicks and keyboard press 
function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function() {
        $("." + currentColour).removeClass("pressed");
    }, 100);

}



function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}