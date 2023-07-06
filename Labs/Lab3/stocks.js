const axios = require("axios");

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data; // this will be the array of people objects
}

async function getStocks(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    return data; // this will be the array of stock objects
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

async function listShareholders(stockName) {
    if(!stockName) throw "stockName parameter does not exist";
    if(typeof stockName != "string") throw "stockName parameter is not of type string";
    if(stockName.trim().length == 0) throw "stockName parameter is empty";

    stockName = stockName.trim();
   
    let stocks = await getStocks(); 
    
    let stock_found = false;
    let stockholder_obj = {};
    let people_arr = [];

    for (let i in stocks) {
        let search_name = stocks[i]["stock_name"].trim();
        if (search_name == stockName) {
            stock_found = true;
            stockholder_obj.id = stocks[i]["id"];
            stockholder_obj.stock_name = stocks[i]["stock_name"];
            for (let j in stocks[i]["shareholders"]) {
                let person_obj = {};
                let id = stocks[i]["shareholders"][j]["userId"];
                let person = await getPersonById(id);
                person_obj.first_name = person["first_name"];
                person_obj.last_name = person["last_name"];
                person_obj.number_of_shares = stocks[i]["shareholders"][j]["number_of_shares"];
                people_arr.push(person_obj);
            }
        }
    }
    
    if(!stock_found) throw "stock not found";

    stockholder_obj.shareholders = people_arr;

    return stockholder_obj;

}

async function totalShares(stockName) {
    if(!stockName) throw "stockName parameter does not exist";
    if(typeof stockName != "string") throw "stockName parameter is not of type string";
    if(stockName.trim().length == 0) throw "stockName parameter is empty";

    stockName = stockName.trim();

    let shareholders_obj = {};
    try{
        shareholders_obj = await listShareholders(stockName);
    }catch(e){
        return e;
    }
   
    let num_shareholder = shareholders_obj["shareholders"].length;
    
    let num_shares = 0;
    for (let i in shareholders_obj["shareholders"]) {
        num_shares = num_shares + parseInt(shareholders_obj["shareholders"][i]["number_of_shares"]);
    }

    if (num_shareholder == 0) {
        return stockName + " currently has no shareholders."
    }
    if (num_shareholder == 1) {
        return stockName + ", has 1 shareholder that owns a total of " + num_shares + " shares."
    }
    if (num_shareholder > 1) {
        return stockName + ", has " + num_shareholder + " shareholders that own a total of " + num_shares + " shares."
    }
    
}

async function listStocks(firstName, lastName) {
    if(!firstName) throw "firstName parameter does not exist";
    if(typeof firstName != "string") throw "firstName parameter is not of type string";
    if(firstName.trim().length == 0) throw "firstName parameter is empty";
    if(!lastName) throw "lastName parameter does not exist";
    if(typeof lastName != "string") throw "lastName parameter is not of type string";
    if(lastName.trim().length == 0) throw "lastName parameter is empty";

    firstName = firstName.trim();
    lastName = lastName.trim();

    let people = await getPeople(); 
    let person_found = false;
    let id = "";

    for (let i in people) {
        let first_name_json = people[i]["first_name"].trim();
        let last_name_json = people[i]["last_name"].trim();
        if (firstName == first_name_json && lastName == last_name_json) {
            person_found = true;
            id = people[i]["id"]
        }
    }
    
    if(!person_found) throw "person not found";

    let stocks = await getStocks(); 
    let stocks_arr = [];

    for (let i in stocks) {
        for (let j in stocks[i]["shareholders"]) {
            if (stocks[i]["shareholders"][j]["userId"] == id) {
                let stock_obj = {};
                stock_obj.stock_name = stocks[i]["stock_name"];
                stock_obj.number_of_shares = stocks[i]["shareholders"][j]["number_of_shares"];
                stocks_arr.push(stock_obj);
            }
        }
    }

    if(stocks_arr.length == 0) throw "person does not own any shares";

    return stocks_arr;
    
}

async function getStockById(id) {
    if(!id) throw "id parameter does not exist";
    if(typeof id != "string") throw "id parameter is not of type string";
    if(id.trim().length == 0) throw "id parameter is empty";

    id = id.trim();

    let stocks = await getStocks();    
    let id_found = false;

    for (let i in stocks) {
        let search_id = stocks[i]["id"].trim();
        if (search_id == id) {
            id_found = true;
            return stocks[i];
        }
    }
    
    if(!id_found) throw "stock not found";
    
}

module.exports = {
    listShareholders,
    totalShares,
    listStocks,
    getStockById
}