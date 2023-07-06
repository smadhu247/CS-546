const axios = require("axios");

//How does the program quit / does it have to quit?
 
async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    return data; // this will be the array of people objects
}

async function getWork(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
    return data; // this will be the array of work objects
}

async function getPersonById(id) {
    
    // should we have these checks?
    if(!id) throw "id parameter does not exist";
    if(typeof id != "string") throw "id parameter is not of type string";
    if(id.trim().length == 0) throw "id parameter is empty";
    id = id.trim();

    let data = await getPeople();    
    let id_found = false;

    for (let i in data) {
        let search_id = data[i]["id"].toString();
        if (search_id == id) {
            id_found = true;
            return data[i];
        }
    }
    
    // should we have these checks?
    if(!id_found) throw "person not found";
}

async function getWorkById(id) {
    
    // should we have these checks?
    if(!id) throw "id parameter does not exist";
    if(typeof id != "string") throw "id parameter is not of type string";
    if(id.trim().length == 0) throw "id parameter is empty";
    id = id.trim();

    let data = await getWork();    
    let id_found = false;

    for (let i in data) {
        let search_id = data[i]["id"].toString();
        if (search_id == id) {
            id_found = true;
            return data[i];
        }
    }
    
    // should we have these checks?
    if(!id_found) throw "work not found";
}

module.exports = {
    getPeople, 
    getWork,
    getPersonById,
    getWorkById
}