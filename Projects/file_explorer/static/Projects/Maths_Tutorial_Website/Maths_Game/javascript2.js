////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

// Initialize variables
var timeremaing = 15;


// Function to generate question and answer
function generateLevel(){
    // Generate question and answers
    var number1 = Math.round(Math.random() * 10);
    var number2 = Math.round(Math.random() * 10);
    var question = number1 + " x " + number2;
    var answer = number1 * number2;
    var answers = [ answer, Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10)].sort();
        
    // Update question and answer elements
    document.getElementById('currentQuestion').innerHTML = question;
    for(i = 0; i < 4; i++){
        var choiceBoxID = 'choice' + (i+1);
        document.getElementById(choiceBoxID).innerHTML = answers[i];
    }
}


// Function to update game over box
function gameOverFunction(){
    // Fetch score
    var score = document.getElementById('scoreValue').innerHTML;
    
    // Display game over
    document.getElementById('gameOver').style.display = "inline-block";
    document.getElementById('gameOver').innerHTML += "<p>Game Over</p><p>Your Score " + score + "</p>";
}


///////////////////////////////////////////////////////
///////////////////////////////////////////////////////


// Timer for game
function gameTimer(){
    
    // Define interval to check game time
    action = setInterval(function(){
        
        // Decrease game time
        timeremaing -= 1;
        document.getElementById('gameTimeText').innerHTML = timeremaing;
        
        // Check if timeout
        if(timeremaing == 0){
            // Stop counter
            stopGameTimer();
            
            // Update display
            ManageDisplay('gameOver', 'block');
            document.getElementById('gameOver').innerHTML = "<p>game over!</p><p>your score is " + score + "</p>";
            ManageDisplay('gameTime', 'none');
            ManageDisplay('correct', 'none');
            ManageDisplay('wrong', 'none');
            playing = false;
            document.getElementById('startResetText').innerHTML = "Start Game";
           
           }
        
    }, 1000)
    
}


// Stop count down
function stopGameTimer(){
    clearInterval(action);
}

// Start game function
function startGame() {
    
    // Initiate variables
    var playing = 1;
    var score = 0;
    timeLeft = 60;
    
    // Change core styles
    console.log('Setting score to 0');
    document.getElementById('scoreValue').innerHTML = 0;
    console.log('Update countdown box visibilty to 1');
    document.getElementById('gameTime').style.display = "inline-block";
    console.log('Updated innerHTML of startReset to to reset');
    document.getElementById('startResetText').innerHTML = "Reset";

    // Start timer
    gameTimer();
    
    // Generate level
    generateLevel();
    
}


////////////////////////////////////////////////////////
////////////////////////////////////////////////////////


// Function to handle the answer box
function answerBox(boxID) {
    // Fetch answer
    var currentScore = document.getElementById('scoreValue').innerHTML;
    var Var1 = document.getElementById('currentQuestion').innerHTML.split("")[0];
    var Var2 = document.getElementById('currentQuestion').innerHTML.split("").pop();
    var answer = Var1 * Var2;
    var myAnswer = document.getElementById(boxID).innerHTML;
    
    // Check answer
    if(myAnswer == answer && currentScore >= 0){
        // Change style: correct
        document.getElementById(boxID).style = correct;

        // Increase score
        var score = parseInt(currentScore) + 1;
        document.getElementById('scoreValue').innerHTML = score;

        // Reset time
        document.getElementById('gameTime').innerHTML.value = 60;

        // Generate new level
        generateLevel();

    } else{
        // Change style: correct
        document.getElementById(boxID).style = wrong;

        // Decrease score
        var currentScore = document.getElementById('scoreValue').innerHTML;
        var score = parseInt(currentScore) - 1;
        document.getElementById('scoreValue').innerHTML = score;
    }
    
    // Print game over from loosing lives
    if(currentScore < 0){
        document.getElementById('gameOver').style.display = "inline-block";
        document.getElementById('gameOver').innerHTML += "<p>Game Over</p><p>Your lost your lives</p>";
    }
}


