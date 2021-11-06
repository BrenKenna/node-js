// Set global vars
var playing = false;
var score;
var livesLeft;
var fruits = [ 'apple', 'banana', 'blackberry',
              'grapes', 'mango','pineapple',
              'strawberry', 'tomato', 'watermelon'
             ];
var fruitStep;
var action;


// Run game
$(function(){

    // click on start / reset button
    $('#startReset').click(function(){
        
        // If playing?
        if(playing == true){
    
            // Reload page
            location.reload();
    
        }else{
    
            // Initialize game
            $("#gameOver").hide();
            playing = true;
            score = 0;

            // Update score & game control divs
            $("#scoreBox").html("Score: " + score);
            $("#startReset").html("Reset Game");

            // Display trials left
            $("#trialsLeft").show();
            livesLeft = 3;
            addHearts();
            
            // Start fruit
            startAction();
        }
      
  });


    // Handle mouseover events on fruit
    $("#fruit1").mouseover(function() {

        // Increase score
        score++;
        $("#scoreBox").html("Score: " + score);

        // Play audio
        $("#slice_sound")[0].play();

        // Clear interval on fruit
        clearInterval(action);

        // Hide with animation
        $("#fruit1").hide("explode", 500);

        // Send new fruit
        setTimeout(startAction, 500);
    });


    // Append heart images to the lives div
    function addHearts(){
    $("#trialsLeft").empty();
    for(i = 0; i < livesLeft; i++){
    $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    };
    }; 


    // Start sending fruits
    function startAction(){

    // Create random fruit
    $("#fruit1").show();
    chooseFruit();

    // Set random position of fruit
    $("#fruit1").css({
    'left': Math.round(Math.random() * 550),
    'top': -65
    });

    // Define random step the fruit
    fruitStep = Math.round(Math.random() * 5) + 1;

    // Increase fruits top property at 10ms intervals
    action = setInterval(function(){

    // Add to the top property
    $("#fruit1").css('top', $("#fruit1").position().top + fruitStep);

    // Handle img passing container
    if( $("#fruit1").position().top > $("#fruitContainer").height() ){

    // Handle Lives
    if( livesLeft > 1 ){
    // Generate New fruit
    $("#fruit1").show();
    chooseFruit();

    // Set random position of fruit
    $("#fruit1").css({
    'left': Math.round(Math.random() * 550),
    'top': -65
    });

    // Define random step the fruit
    fruitStep = Math.round(Math.random() * 5) + 1;

    // Reduce lives
    livesLeft --;
    addHearts();

    // Handle no lives left
    }else{

        // Game Over
        playing = false;
        $("#startReset").html("Start Game");
        $("#gameOver").show();
        $("#gameOver").html('<p>game over!</p><p>your score is ' + score + ' </p>');
        $("#trialsLeft").hide();

        // Clear interval
        stopAction(action);
        }
    }

    }, 15);
    };


    // Choose fruit
    function chooseFruit(){
        // Fetch random fruit
        var randFruit = Math.round(Math.random() * (fruits.length-1));
        $("#fruit1").attr('src', 'images/' + fruits[randFruit] + '.png');
        console.log("Fruit = " + fruits[randFruit] + ", Index = " + randFruit);
    };


    // Stop dropping fruit
    function stopAction(){
    clearInterval(action);
    $("#fruit").hide();
    };

});