function makeArrays(objects) {

    if (!objects) throw "input not supplied or undefined";
    if (!Array.isArray(objects)) throw "input supplied is not an array";
    if (objects.length <= 0) throw "input array is empty";
    if (objects.length < 2) throw "input array has less than two objects";

    for (let i in objects) {
        if (typeof objects[i] != "object") throw "some element in the array is not an object";
        if (Object.keys(objects[i]).length == 0) throw "some object in the array is empty";
    }

    let arr = [];
    let result;

    for (let i in objects) {
        result = Object.entries(objects[i]);
        arr[i] = result;
    }
    return arr.flat(1);
}

function isDeepEqual(obj1, obj2) {

    if (!obj1) throw "input not supplied or undefined";
    if (!obj2) throw "input not supplied or undefined";
    if (typeof obj1 != "object" || Array.isArray(obj1) || typeof obj1 == "number" || 
    typeof obj1 == "string") throw "input is not an object";
    if (typeof obj2 != "object" || Array.isArray(obj2) || typeof obj2 == "number" ||
    typeof obj2 == "string") throw "input is not an object";

    for (let [key, value] of Object.entries(obj1)) {
        let isobj = false;

        if (typeof obj1[key] == "string") {
            obj1[key] = obj1[key].trim();
        }

        if (typeof obj2[key] == "string") {
            obj2[key] = obj2[key].trim();
        }
        
        if (typeof obj1[key] == "object" && typeof obj2[key] == "object") {
            isobj = true;
        }

        if (isobj) {
            let new_obj = isDeepEqual(obj1[key], obj2[key]);
            if (!new_obj) {
                return false;
            }
        }

        if (!isobj) {
            if (obj1[key] != obj2[key]) {
                return false;
            }
        }
    }
    return true;
}


function computeObject(object, func) {

    if (!object) throw "input not supplied or undefined";
    if (typeof object != "object" || Array.isArray(object) || typeof object == "number" || 
        typeof object == "string") throw "input is not an object";
    if (!func) throw "input not supplied or undefined";
    if (typeof func != "function") throw "input is not a function";

    for (let [key, value] of Object.entries(object)) {
        if (typeof value != "number") throw "some element in the object is not a number";
    }

    let myobj = {};
    let arr_vals = [];
    let arr_keys = [];
    let i = 0;
    for (let [key, value] of Object.entries(object)) {
        arr_keys[i] = key;
        arr_vals[i] = value;
        i++;
    }

    //Source for how to apply an arrow function on an array
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
    let mapped_array = arr_vals.map(func)

    for (let i in arr_vals) {
        myobj[arr_keys[i]] = mapped_array[i];
    }

    return myobj;

}


module.exports = {
    makeArrays, 
    isDeepEqual, 
    computeObject
}