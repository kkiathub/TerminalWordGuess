var inquirer = require("inquirer");
var Word = require("./word.js");
var wordArr = require("./wordlist.js");

const GUESS_LIMIT = 14;

var numGuesses;
var selWord = "";
// randomly pick word function.
const pickWordId = () => Math.floor(Math.random() * wordArr.length);

function pickLetter() {
    console.log("\n" + selWord.toString());
    if (selWord.isCompleted()) {
        console.log("You got it!");
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
            console.log(numGuesses + " guesses remaining...")
        }
        pickLetter();

    });
}

function newGame() {
    var wordId = pickWordId();
    console.log(wordId);

    selWord = new Word(wordArr[wordId]);
    numGuesses = GUESS_LIMIT;
    pickLetter();

}



newGame();