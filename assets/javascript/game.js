
//global variable
var answerChoices = ["TAXI", "BACK", "KITTEN", "NEXT", "UNICORN", "PRINCE", "REPORT", "JOKER", "POPCORN", "UFO"];
var totalGuesses = 9;       // number of tries
var userGuesses = [];       // letters the user guessed
var computerPick;           // array number the machine choose randomly
var wordGuessed = [];       // This will be the word we actually build to match the current word
var guessesLeft = 0;        // How many tries the player has left
var finishedGame = false;   // Flag for 'press any key to try again'     
var wins = 0;               //wins
var losses = 0;             //losses

// start the game
function startGame() {
    guessesLeft = totalGuesses;

    //grab a random number from the xmenCharacters array  (number of words)
    computerPick = Math.floor(Math.random() * (answerChoices.length));

    if(answerChoices[computerPick] == answerChoices[0]) {
        $('.clue').text("Yellow car in New York City");
    }else if(answerChoices[computerPick] == answerChoices[1]) {
        $('.clue').text("Front and _ _ _ _");
    }else if(answerChoices[computerPick] == answerChoices[2]) {
        $('.clue').text("Cute little baby cat");
    }else if(answerChoices[computerPick] == answerChoices[3]) {
        $('.clue').text("Immediately following in order");
    }else if(answerChoices[computerPick] == answerChoices[4]) {
        $('.clue').text("Fantasy horned horse");  
    }else if(answerChoices[computerPick] == answerChoices[5]) {
        $('.clue').text("Son of a King, charming");  
    }else if(answerChoices[computerPick] == answerChoices[6]) {
        $('.clue').text("_ card, a list of grades");  
    }else if(answerChoices[computerPick] == answerChoices[7]) {
        $('.clue').text("Clown, or jester playing card");  
    }else if(answerChoices[computerPick] == answerChoices[8]) {
        $('.clue').text("Popular cinema snack");       
    }else if(answerChoices[computerPick] == answerChoices[9]) {
        $('.clue').text("Alien spaceship");                                
    }else($('.clue').text("neither of these")); 

    // Clear out arrays
    userGuesses = [];
    wordGuessed = [];

    //build the word with blanks
    for (var i = 0; i < answerChoices[computerPick].length; i++) {
        wordGuessed.push("_");
    }   

    //gamewin, gameover, title 
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    //refresh the screen
    refreshScreen();
};

//  Updates the display on the HTML Page
function refreshScreen() {
    document.getElementById("gameWins").innerText = wins;
    document.getElementById("gameLosses").innerText = losses;

    var guessingWordText = "";
    for (var i = 0; i < wordGuessed.length; i++) {
        guessingWordText += wordGuessed[i];
    }

    //update guesses, word, and letters entered
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("guessesLeft").innerText = guessesLeft;
    document.getElementById("userGuesses").innerText = userGuesses;
};

//compare letters entered to the character you're trying to guess
function evaluateGuess(letter) {
    var positions = [];

    for (var i = 0; i < answerChoices[computerPick].length; i++) {
        if(answerChoices[computerPick][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        guessesLeft--;
    } else {
        for(var i = 0; i < positions.length; i++) {
            wordGuessed[positions[i]] = letter;
        }
    }
};

//check if all letters have been entered.
function checkWin() {
    if(wordGuessed.indexOf("_") === -1) {
        var winSound = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/win.mp3');
        winSound.play()
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        finishedGame = true;
        
    }
};

//check if the user is out of guesses
function checkLoss()
{
    if(guessesLeft <= 0) {
        var loseSound = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/lose.mp3');
        loseSound.play()
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        losses++;
        finishedGame = true;

    }
}

//guessing
function makeGuess(letter) {
    if (guessesLeft > 0) {
        // Make sure we didn't use this letter
        if (userGuesses.indexOf(letter) === -1) {
            userGuesses.push(letter);
            evaluateGuess(letter);
        
        }
    
    }

};



// Event listener
document.onkeydown = function(event) {
    //if the game is finished, restart it.
    if(finishedGame) {
        startGame();
        finishedGame = false;
    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            var keySound = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/bad.mp3');
            keySound.play();
            makeGuess(event.key.toUpperCase());
            checkWin();
            checkLoss();
            refreshScreen();
        }
    }

};