const axios = require("axios");

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data; // this will be the array of people objects
}

async function getPersonById(id) {
    
    if(!id) throw "id parameter does not exist";
    if(typeof id != "string") throw "id parameter is not of type string";
    if(id.trim().length == 0) throw "id parameter is empty";

    id = id.trim();

    let data = await getPeople();    
    let id_found = false;

    for (let i in data) {
        let search_id = data[i]["id"].trim();
        if (search_id == id) {
            id_found = true;
            return data[i];
        }
    }
    
    if(!id_found) throw "person not found";
}

async function sameEmail(emailDomain) {

    if(!emailDomain) throw "email parameter does not exist";
    if(typeof emailDomain != "string") throw "email parameter is not of type string";
    if(emailDomain.trim().length == 0) throw "email parameter is empty";
    if(!emailDomain.includes(".")) throw "email does not contain ."

    emailDomain = emailDomain.trim();

    for (let i = emailDomain.length - 1; i > 0; i--) {
        if (emailDomain.charAt(i) == '.') {
            if (emailDomain.charAt(i+1).length == 0 || emailDomain.charAt(i+2).length == 0) {
                throw "email does not contain two characters after ."
            }
            if (!isNaN(emailDomain.charAt(i+1)) || !isNaN(emailDomain.charAt(i+2))) {
                throw "email contains numbers after ."
            }
        }
    }

    emailDomain = emailDomain.toLowerCase();
    let people_arr = [];

    let data = await getPeople();    

    for (let i in data) {
        let search_email = data[i]["email"].trim();
        let amp_index = search_email.indexOf('@');
        search_email = search_email.substring(amp_index + 1).toLowerCase();
        if (search_email == emailDomain) {
            people_arr.push(data[i]);
        }
    }
    
    if(people_arr.length < 2) throw "not enough people with email domain";
    return people_arr;

}

async function manipulateIp() {

    let data = await getPeople();   
    let ips_array = [];

    let return_obj = {};

    for (let i in data) {
        let ip = data[i]["ip_address"].trim();

        //Source: https://stackoverflow.com/questions/30912663/sort-a-string-alphabetically-using-a-function
        //Creares an array of the string, sorts array, then joins it back together
        ip = ip.split('').sort().join('');

        ip = ip.replaceAll('.', '')
        ips_array.push(ip);
    }

    let new_ips_array = [];

    let sum = 0;
    for (let i = 0; i < ips_array.length; i++) {
        ips_array[i] = parseInt(ips_array[i]);
        sum = sum + parseInt(ips_array[i]);
        new_ips_array[i] = parseInt(ips_array[i]);
    }
    let avg = (sum / ips_array.length);

    new_ips_array.sort(function(a, b) {return b - a;});

    let high_index = ips_array.indexOf(new_ips_array[0]);
    let low_index = ips_array.indexOf(new_ips_array[new_ips_array.length - 1]);
    
    let high_obj = {};
    let low_obj = {};

    high_obj.firstName = data[high_index]["first_name"];
    high_obj.lastName = data[high_index]["last_name"];
    low_obj.firstName = data[low_index]["first_name"];
    low_obj.lastName = data[low_index]["last_name"];

    return_obj.highest = high_obj;
    return_obj.lowest = low_obj;
    return_obj.average = Math.floor(avg);

    return return_obj;
}

// Do i need to specify the month for the errors?
async function sameBirthday(month, day) {

    if(!month) throw "month parameter does not exist";
    if(!day) throw "month parameter does not exist";
    if (typeof month == "string") {
        month = month.trim();
        if(typeof parseInt(month) != "number") throw "month parameter is not a number";
        if(month.length == 0) throw "month parameter does not exist";
        month = parseInt(month);
    }
    if (typeof day == "string") {
        day = day.trim();
        if(typeof parseInt(day) != "number") throw "day parameter is not a number";
        if(day.length == 0) throw "day parameter does not exist";
        day = parseInt(day);
    }

    if(typeof month != "number") throw "month parameter is not a number";
    if(typeof day != "number") throw "day parameter is not a number";
    if (month > 12 || month < 1) throw "month is not valid";
    if (day < 1) throw "day is not valid";
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        if (day > 31) throw "day is not valid";
    }
    if (month == 4 || month == 6 || month == 9 || month == 11) {
        if (day > 30) throw "day is not valid";
    }
    if (month == 2) {
        if (day > 28) throw "day is not valid";
    }

    let people_arr = [];

    let data = await getPeople();
    
    month = month.toString();
    day = day.toString();

    if (month < 10) {
        month = "0" + month.toString();
    }
    if (day < 10) {
        day = "0" + day.toString();
    }

    let birthday_string = month + "/" +  day;

    for (let i in data) {
        let search_birthday = data[i]["date_of_birth"].trim();
        search_birthday = search_birthday.substring(0,5);

        if (search_birthday.includes(birthday_string)) {
            let name = data[i]["first_name"] + " " + data[i]["last_name"]
            people_arr.push(name);
        }
    }

    if (people_arr.length == 0) throw "no one has that birthday"    
        
    return people_arr;

}

module.exports = {
    getPersonById,
    sameEmail,
    manipulateIp,
    sameBirthday
}