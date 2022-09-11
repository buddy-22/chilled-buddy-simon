var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var hint = 3;
$(".hint").text("HINT x " + hint);

$(".start-game").click(function(){
    $(".rules-h").slideUp();
    $("#game-area").removeAttr('id','game-area');
    
});

$(".start-game1").click(function(){
    startGame();
    $(".hint").removeClass("no-dis");
});

$(".hint").click(function(){

    if(hint>0){
        playSequence();
        hint--;
        $(".hint").text("HINT x " + hint);
        }else{
        $(".hint").css("color","red");

        setTimeout(function(){
            $(".hint").css("color","#011F3F");
        },300);
    }
    console.log("vdfvjb");
})

$(document).keypress(function(event){
    if(level == 0){
    startGame();
    }
})

function startGame(){
    $(".start-game1").slideUp();
    $("h1").html("Your level <span style = 'display: block;'>" + level +"</span>");
    setTimeout(function(){
        nextSequence();  
    },900);
}


function nextSequence(){
    level++;
    $("h1").html("Your level <span style = 'display: block;'>" + level +"</span>");


    var randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber);
    var randomChooosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChooosenColor);

    playSequence();
}

function playSequence(){
    for(let i=0 ; i<gamePattern.length ; i++){
        setTimeout(function(){
            playSound(gamePattern[i]);
        },i*500);
    }
}

function checkAnswer(index){
    if(gamePattern[index] == userClickedPattern[index]){

    }else{
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },150);

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        level = -1;
        $("h1").text("Game Over Restart to play again");
        $("h1").css("color","red");
    }

    if(gamePattern.length == userClickedPattern.length && level > 0){
        userClickedPattern = [];
        setTimeout(function(){
            nextSequence();
        },700);
        
    } 

}

// $("#" + randomChooosenColor).click(function(){
//     console.log("working");
    
// });

$(".btn").click(function (){
    if(level > 0){
        var userChoosenColor = $(this).attr("id");
        userClickedPattern.push(userChoosenColor);
    
        playSound(userChoosenColor);
        var index = userClickedPattern.length - 1;
        checkAnswer(index);
    }
    
});


function playSound(color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();

    $("#" + color).addClass("pressed");
    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    },150);
}