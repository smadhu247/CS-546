function doesStringExist(string) {
    if (!string) throw "input not supplied or undefined";
}

function isStringEmpty(string) {
    let new_string = string.split(" ").join("");
    if (new_string.length <= 0) throw "input string is empty";
}

function isString(string) {
    if (typeof string != "string") throw "input not a string";
}


function camelCase(string) {

    doesStringExist(string);
    isString(string);
    isStringEmpty(string);

    string = string.trim();

    let end_string = "";
    let lower_string = "";
    for (let i = 0; i < string.length; i++) {
        lower_string = lower_string + string[i].toLowerCase();
    }

    let arr = lower_string.split(" ");

    for (let i = 0; i < arr.length; i++) {
        if (i == 0) {
            end_string = end_string + arr[i];
        }
        else {
            let val = arr[i][0].toUpperCase();
            let rest = arr[i].substring(1, arr[i].length);
            end_string = end_string + val + rest;
        }
    }

    return end_string;

}

function replaceChar(string) {

    doesStringExist(string);
    isString(string);
    isStringEmpty(string);

    string = string.trim();

    let target = string[0];
    let new_string = target;
    let replace_char = "*";
    for (let i = 1; i < string.length; i++) {

        if (string.charAt(i).toLowerCase() == target || string.charAt(i).toUpperCase() == target) {
            new_string = new_string + replace_char; 
            if (replace_char == "*") {
                replace_char = "$";
            }
            else {
                replace_char = "*";
            }
        }
        else {
            new_string = new_string + string[i];
        }
    }
    return new_string;

}

function mashUp(string1, string2) {

    doesStringExist(string1);
    doesStringExist(string2);
    isString(string1);
    isString(string2);
    isStringEmpty(string1);
    isStringEmpty(string2);
    if (string1.length < 2 || string2.length < 2) throw "string is not at least 2 characters";
    
    string1 = string1.trim();
    string2 = string2.trim();

    let newString = "";

    let string_one = string2[0] + string2[1];
    let string_two = string1.substring(2, string1.length);
    let string_three = string1[0]+ string1[1];
    let string_four = string2.substring(2, string1.length);

    newString = string_one + string_two + " " + string_three + string_four;
    
    return newString;
    
}

module.exports = {
    camelCase,
    replaceChar, 
    mashUp 
}