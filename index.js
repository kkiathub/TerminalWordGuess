var inquirer = require("inquirer");
var Word = require("./word.js");
var wordArr = require("./wordlist.js");

const GUESS_LIMIT = 12;

const LOG_GREEN = "\x1b[32m%s\x1b[0m";
const LOG_RED = "\x1b[31m%s\x1b[0m";

var numGuesses;
var selWord = "";
// randomly pick word function.
const pickWordId = () => Math.floor(Math.random() * wordArr.length);

function replayGame(gameresultMessage, logColor) {
    // Prompt asking if you want to play another game.
    console.log(logColor, gameresultMessage);
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
        replayGame("You got it!", LOG_GREEN);
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
            console.log(LOG_GREEN, "CORRECT!!!");
        } else {
            // guess wrong letter.
            console.log(LOG_RED, "INCORRECT!!!");
            numGuesses--;
            if (numGuesses === 0) {
                replayGame("Game Over!", LOG_RED);
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