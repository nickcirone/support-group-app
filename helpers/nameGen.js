// Creates a random name from the adjectives and nouns in the lists below
//

function randomNG(list) {
    var i = Math.floor(Math.random() * list.length);
    return list[i];
}
var numbers = [];

for(var i = 1; i < 100; i++){
    numbers.push(i);
}

var SillyId = require('sillyid')
var sid = new SillyId()

module.exports = function() {
    var name = sid.generate() + randomNG(numbers);
    return name.toString();
}
