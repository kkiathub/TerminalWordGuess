var Letter = require("./letter.js");

var Word = function(word) {
    this.letterArr = [];
    for(var i=0; i< word.length; i++) {
        this.letterArr.push( new Letter(word[i]) );
    }
} 

Word.prototype.toString = function() {
    var outStr = "";
    for(var i=0; i<this.letterArr.length; i++) {
        outStr += this.letterArr[i].getChar();
    }
    return outStr;
}

Word.prototype.check = function(newchar) {
    var found = false;
    for(var i=0; i<this.letterArr.length; i++) {
        if ( this.letterArr[i].guess(newchar) )
            found = true;
    }
    return found;
}

Word.prototype.isCompleted = function() {
    for(var i=0; i<this.letterArr.length; i++) {
        if ( !this.letterArr[i].isGuessed) {
            return false;
        }
    }
    return true; 
}

module.exports = Word;