var inquirer = require("inquirer");
var Word = require("./word.js");
var wordArr = require("./wordlist.js");

const GUESS_LIMIT = 14;

var numGuesses;
var selWord = "";
// randomly pick word function.
const pickWordId = () => Math.floor(Math.random() * wordArr.length);

function replayGame(gameresultMessage) {

    console.log(gameresultMessage);
    inquirer.prompt([
        {
            type: "confirm",
            message: "Do you want to play another game:",
            name: "confirm",
            default: true
        }
    ]).then(function (response) {
        // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
        if (response.confirm) {
            newGame();
        }
    });
}

function pickLetter() {
    console.log("\n" + selWord.toString());
    if (selWord.isCompleted()) {
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
        } else {
            // guess wrong letter.
            console.log("INCORRECT!!!");
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
    console.log(wordId + " " + wordArr[wordId]);

    selWord = new Word(wordArr[wordId]);
    numGuesses = GUESS_LIMIT;
    pickLetter();
}


newGame();