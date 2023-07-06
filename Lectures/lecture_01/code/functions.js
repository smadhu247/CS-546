function myGlobalFunction() {
  console.log("I'm a global function");
}

myGlobalFunction();

function printThisMessage(message) {
  console.log("We've received a message!");
  console.log(message);
}

printThisMessage('Hello, CS-546');

let doubleUpAnonymous = function (x) {
  return x * 2;
};

console.log(doubleUpAnonymous(5));

let doubleUp = (x) => {
  return x * 2;
};

console.log(doubleUp(10));

let addToTheNumber = (num) => {
  let numToAdd = num;

  return (addThisMuch) => {
    return numToAdd + addThisMuch;
  };
};

let addToTwelve = addToTheNumber(12);
console.log(addToTwelve); //addToTwelve is now equal to function addThisMuch 
console.log(addToTwelve(8)); //taking function addThisMuch, passing 8 

function printSquaresUntil(num) {
  for (let i = 2; i < num; i++) {
    let num = i * i;
    console.log(`the square of ${i} is ${num}`);
  }
}

printSquaresUntil(12);

function haveAnInnerFunction() {
  function myInnerFunction() {
    return "Hello, I'm an inner function!";
  }

  if (true) {
    console.log(myInnerFunction());
  }
}

haveAnInnerFunction();

//myInnerFunction(); can't be called because it's an inner function

function demonstrateVarVersusLet() {
  // Say you want to do some basic counts, like count the number of odds and then
  // the number of event numbers from 0 to 12

  // Change this between "odd", "even", and "both";
  const whatDoICount = 'both';
  const howManyToCount = 12;

  if (whatDoICount === 'odd' || whatDoICount === 'both') {
    // CHANGE THIS BETWEEN `var` and `let` to see difference!
    var count; 
    for (let i = 0; i < howManyToCount; i++) {
      if (i % 2 === 1) {
        if (count === undefined) {
          count = 0;
        }

        count = count + 1;
      }

      console.log(`at index ${i} there are ${count} odd numbers`);
    }
  }

  if (whatDoICount === 'even' || whatDoICount === 'both') {
    // CHANGE THIS BETWEEN `var` and `let` to see difference!
    var count;
    for (let i = 0; i < howManyToCount; i++) {
      if (i % 2 === 0) {
        if (count === undefined) {
          count = 0;
        }

        count = count + 1;
      }

      console.log(`at index ${i} there are ${count} even numbers`);
    }
  }
}

demonstrateVarVersusLet();
