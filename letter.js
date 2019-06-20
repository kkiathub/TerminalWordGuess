// Constructor function for creating student objects
var Letter = function ( char ) {
    this.char = char;
    
    this.isGuessed = (char===" ")?true:false; 
};

Letter.prototype.getChar = function() {
    if (this.isGuessed)
        return this.char + " ";
    else
        return "_ ";
}

Letter.prototype.guess = function(newchar) {
    if (this.char===" ")
        return false;

    if (newchar === this.char) 
        this.isGuessed = true;
    return this.isGuessed;
}

// Exporting our letter constructor. We will require it in word.js
module.exports = Letter;