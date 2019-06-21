var inquirer = require("inquirer");
var Word = require("./word.js");
var wordArr = require("./wordlist.js");

const GUESS_LIMIT = 12;

var numGuesses;
var selWord = "";
// randomly pick word function.
const pickWordId = () => Math.floor(Math.random() * wordArr.length);

function replayGame(gameresultMessage) {
    // Prompt asking if you want to play another game.
    console.log(gameresultMessage);
    inquirer.prompt([
        {
            type: "confirm",
            message: "Do you want to play another game:",
            name: "confirm",
            default: true
        }
    ]).then(function (response) {
        // If the response confirms, we play another game.
        if (response.confirm) {
            newGame();
        }
    });
}

function pickLetter() {
    console.log("\n" + selWord.toString());
    if (selWord.isCompleted()) {
        // got all letters, you win!
        replayGame("You got it!");
        return;
    }
    inquirer.prompt([
        {
            name: "letter",
            message: "Guess a letter :"
        }

    ]).then(function (data) {
        if (selWord.check(data.letter)) {
            // guess it right.
            console.log("\x1b[32m%s\x1b[0m", "CORRECT!!!");
        } else {
            // guess wrong letter.
            console.log("\x1b[31m%s\x1b[0m", "INCORRECT!!!");
            numGuesses--;
            if (numGuesses === 0) {
                replayGame("Game Over!");
                return;
            }
            console.log(numGuesses + " guesses remaining...")
        }
        pickLetter();

    });
}

function newGame() {
    var wordId = pickWordId();
    // console.log(wordId + " " + wordArr[wordId]);

    selWord = new Word(wordArr[wordId]);
    numGuesses = GUESS_LIMIT;
    pickLetter();
}


newGame();