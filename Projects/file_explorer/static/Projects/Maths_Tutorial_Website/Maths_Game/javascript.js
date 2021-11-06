// Initialize variables
var playing = false;
var score;
var action;
var timeremaining;
var answer;


// Timer for game
function startCountDown(){

    // Run counter
    action = setInterval(function() {
        timeremaing -= 1;
        document.getElementById('gameTimeText').innerHTML = timeremaing;
        
        if(timeremaing == 0){
            // Stop counter
            stopCountDown();
            
            // Update display
            ManageDisplay('gameOver', 'block');
            document.getElementById('gameOver').innerHTML = "<p>game over!</p><p>your score is " + score + "</p>";
            ManageDisplay('gameTime', 'none');
            ManageDisplay('correct', 'none');
            ManageDisplay('wrong', 'none');
            playing = false;
            document.getElementById('startResetText').innerHTML = "Start Game";
        }
    }, 1000);
}


// Stop countdown
function stopCountDown() {
    clearInterval(action);
}


// Manage displays
function ManageDisplay(elementID, newElementDisplay){
    document.getElementById(elementID).style.display = newElementDisplay;
};


// Generate levels
function generateLevel(){

    // Generate question and answers
    var number1 = (Math.round(Math.random() * 9) + 1);
    var number2 = (Math.round(Math.random() * 9) + 1);
    var question = number1 + "x" + number2;
    answer = number1 * number2;
        
    // Update question and answer elements
    document.getElementById('currentQuestion').innerHTML = question;
    var ansPos =  (Math.round(Math.random() * 3) + 1);
    document.getElementById("choice" + ansPos).innerHTML = answer;
    
    // Add wrong answers
    var wrongAnswers = [answer];
    for(i = 1; i < 5; i++){
        if(i != ansPos) {
            
            // Generate random answer not in array
            var wrongAnswer = (Math.round(Math.random() * 9) + 1) * (Math.round(Math.random() * 9) + 1)
            while(wrongAnswers.indexOf(wrongAnswer) > -1) {
                var wrongAnswer = (Math.round(Math.random() * 9) + 1) * (Math.round(Math.random() * 9) + 1);
            }
            var choiceBoxID = 'choice' + i;
            document.getElementById(choiceBoxID).innerHTML = wrongAnswer;
            wrongAnswers[i] = wrongAnswer;
        }
    }
}


///////////////////////////////////////////
///////////////////////////////////////////


// Start & reset the game
document.getElementById('startReset').onclick = function() {
    
    // Check if playing
    if(playing == true){

       // Reload
        location.reload();

       } else{

           // Set playing to true
           playing = true;
           ManageDisplay('gameOver', 'none')

           // Set score to 0 if not playing
           score = 0;
           document.getElementById('scoreValue').innerHTML = score;


           // Display the timer box
           ManageDisplay('gameTime', 'block');
           timeremaing = 15;
           document.getElementById('gameTimeText').innerHTML = timeremaing;

           // Change start to reset
           document.getElementById('startResetText').innerHTML = "Reset Game";

           // Start countdown
           startCountDown();
           
           // Generate question and answers
           generateLevel();
       }

}


// Handle answer box events
for(i = 1; i < 5; i++){
    
    // Fetch box
    document.getElementById('choice'+ i).onclick = function() {
    
    // Check if playing
    if(playing == true){
        if(this.innerHTML == answer) {
            
            // Increase score
            score += 1;
            document.getElementById('scoreValue').innerHTML = score;
            
            // Display correct box for 2s
            ManageDisplay('correct', 'block');
            setTimeout(function(){
                ManageDisplay('correct', 'hide');
            }, 20);

            // Hide wrong box
            ManageDisplay('wrong', 'none');
            
            // Generate next level
            generateLevel();
            
        } else{
            // Decrease score
            score -= 1;
            document.getElementById('scoreValue').innerHTML = score;

            // Display wrong box
            ManageDisplay('correct', 'none');
            setTimeout(function(){
                ManageDisplay('wrong', 'block');
            }, 20);
            
            if(score == -1){
                // stopcountDown
                stopCountDown();
                
                // Update display
                ManageDisplay('gameOver', 'block');
                document.getElementById('gameOver').innerHTML = "<p>game over!</p><p>no lives left</p>";
                ManageDisplay('gameTime', 'none');
                ManageDisplay('correct', 'none');
                ManageDisplay('wrong', 'none');
            }
            }
        }
    }
}



