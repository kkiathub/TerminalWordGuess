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
    // if this is a space or already guessed, return false.
    if (this.isGuessed)
        return false;

    if (newchar.toLowerCase() === this.char.toLowerCase()) 
        this.isGuessed = true;
    return this.isGuessed;
}

// Exporting our letter constructor. We will require it in word.js
module.exports = Letter;