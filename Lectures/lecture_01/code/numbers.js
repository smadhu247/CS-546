const x = 12;
const y = 25;

let multiplied = x * y;
let divided = y / x;
let subtracted = x - y;
let added = x + y;

console.log(multiplied, divided, subtracted, added);

let toThePowerOf = Math.pow(x, y);
console.log(toThePowerOf);

let multipliedString = multiplied.toString();
console.log(multipliedString); //300

console.log(multipliedString + 5); //3005

//console.log(multipliedString);
multipliedString = 'H';
console.log(parseInt(multipliedString) + 5);
