function doesArrayExist(array) {
    if (!array) throw "input not supplied or undefined";
}

function isArray(array) {
    if (!Array.isArray(array)) throw "input supplied is not an array";
}

function isArrayEmpty(array) {
    if (array.length <= 0) throw "input array is empty";
}

function isNumberArray(array) {
    for (let i in array) {
        if (typeof array[i] != "number") throw "some element in the array is not a number";
    }
}


function mean(array) {

    doesArrayExist(array);
    isArray(array);
    isArrayEmpty(array);
    isNumberArray(array);

    let sum = 0;
    let mean = 0;
    let len = array.length;
    for (let i = 0; i < len; i++) { 
        sum = sum + array[i];
    }
    mean = sum / len;
    return mean;
}


function medianSquared(array) {

    doesArrayExist(array);
    isArray(array);
    isArrayEmpty(array);
    isNumberArray(array);

    // .sort() found from source: https://www.w3schools.com/js/js_array_sort.asp
    array.sort(function(a, b){return a-b});
    let len = array.length;
    let medsq;

    //even number
    if (len % 2 == 0) {
        let len_one = array.length / 2;
        let len_two = (array.length / 2) - 1;

        let first_num = array[len_one];
        let sec_num = array[len_two];

        let arr = [first_num, sec_num];     
        medsq = mean(arr); 
        medsq = medsq * medsq;
    }

    //odd number 
    if (len % 2 == 1) {
        let mid_len = (array.length - 1) / 2;
        medsq = array[mid_len] * array[mid_len];
    }
    
    return medsq;
}

function maxElement(array) {

    doesArrayExist(array);
    isArray(array);
    isArrayEmpty(array);
    isNumberArray(array);

    let old_array = [];
    for (let i in array) {
        old_array[i] = array[i];
    }
    
    // sort in ascending order
    // https://www.w3schools.com/jsref/jsref_sort.asp
    let new_array = array.sort(function(a, b){return a-b});

    let max_elem = new_array[old_array.length - 1];
    let max_elem_str = max_elem.toString();

    let index = old_array.indexOf(max_elem);

    let myobj = {};
    myobj[max_elem_str]= index;
    
    return myobj;

}

function fill(end, value) {

    if (end <= 0) throw "input supplied is not a positive number greater than 0";
    if (!end) throw "input not supplied or undefined";
    if (typeof end != "number") throw "input supplied is not a number";
    if (end % 1 != 0) throw "input supplied is not a whole number";

    if (typeof value == "string") {
        value = value.trim();
    }
    
    let arr = [];
    if (!value) {
        for (let i = 0; i < end; i++) {
            arr[i] = i;
        }
    }
    else {
        for (let i = 0; i < end; i++) {
            arr[i] = value;
        }
    }
    
    return arr;
}

function countRepeating(array) {

    doesArrayExist(array);
    isArray(array);

    for (let i in array) {
        if (typeof array[i] == "string") {
            array[i] = array[i].trim();
        }
    }

    let myobj = {};

    for (let i = 0; i < array.length; i++) {
        if (array[i] in myobj) {
            let count = myobj[array[i]];
            count = count + 1;
            myobj[array[i]] = count;
        }
        else {
            myobj[array[i]] = 1;
        }
    }

    for (let i in myobj) {
        if (myobj[i] == 1) {
            delete myobj[i];
        }
    }

    return myobj;
}

function isEqual(arrayOne, arrayTwo) {

    doesArrayExist(arrayOne);
    doesArrayExist(arrayTwo);
    isArray(arrayOne);
    isArray(arrayTwo);

    if (arrayOne.length != arrayTwo.length) {
        return false;
    }

    // checks if the array is multidimensional
    // Source: https://stackoverflow.com/questions/23835612/test-if-array-is-multidimensional
    if (arrayOne.filter(Array.isArray).length > 0) {

        for (let i in arrayOne) {
            arrayOne.sort();
            arrayTwo.sort();

            for (let j in arrayOne[i]) {       
                let isNum = true;

                for (let k in arrayOne[j]) {
                    if (typeof arrayOne[k] == "string") {
                        arrayOne[k] = arrayOne[k].trim();
                        isNum = false;
                    }
                    if (typeof arrayTwo[k] == "string") {
                        arrayTwo[k] = arrayTwo[k].trim();
                        isNum = false;
                    }
                }

                if (isNum) {
                    arrayOne[i].sort(function(a, b){return a-b});
                    arrayTwo[i].sort(function(a, b){return a-b});
                }
                if(!isNum) {
                    arrayOne[i].sort();
                    arrayTwo[i].sort();
                }

                if (arrayOne[i][j] != arrayTwo[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    else {
        let isNum = true;

        for (let i in arrayOne) {
            if (typeof arrayOne[i] == "string") {
                isNum = false;
                arrayOne[i] = arrayOne[i].trim();
            }
            if (typeof arrayTwo[i] == "string") {
                isNum = false;
                arrayTwo[i] = arrayTwo[i].trim();
            }
        }
        if (isNum) {
            arrayOne.sort(function(a, b){return a-b});
            arrayTwo.sort(function(a, b){return a-b});
        }
        if(!isNum) {
            arrayOne.sort();
            arrayTwo.sort();
        }

        for (let i in arrayOne) {
            if (arrayOne[i] != arrayTwo[i]) {
                return false;
            }
        }
        return true;
    }
}

module.exports = {
    mean,
    medianSquared, 
    maxElement, 
    fill, 
    countRepeating, 
    isEqual
}