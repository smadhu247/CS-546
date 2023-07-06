const questionOne = function questionOne(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        let square = arr[i] * arr[i];
        sum = sum + square;
    }
    return sum;
}

const questionTwo = function questionTwo(num) { 
    if (num < 1) {
        return 0;
    }
    if (num == 1) {
        return 1;
    }
    else {
        return questionTwo(num - 1) + questionTwo(num - 2);
    }
}

const questionThree = function questionThree(text) {
    let count = 0;
    for (let x of text) {
        if (x == 'a' || x == 'e' || x == 'i' || x == 'o' || x == 'u'
         || x == 'A' || x == 'E' || x == 'I' || x == 'O' || x == 'U' 
            ) {
            count++;
        }
    }
    return count;
}

const questionFour = function questionFour(num) {
    if (num < 0) {
        return NaN;
    }
    if (num == 0) {
        return 1;
    }
    while (num > 0) {
        return num * questionFour(num -1);
    }
}

module.exports = {
    firstName: "Sanjana", 
    lastName: "Madhu", 
    studentId: "10447590",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};