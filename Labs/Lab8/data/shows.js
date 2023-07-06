const axios = require('axios');

async function getShowData(search_term){

    if (!search_term) throw "No search term supplied";
    if (typeof search_term != "string") throw "Type of search term is not a string";
    search_term = search_term.trim();
    if(search_term.length == 0) throw "Search term is empty";

    const { data } = await axios.get('http://api.tvmaze.com/search/shows?q=' + search_term);
    return data; 
}

async function getShowDataById(search_id){

    if (!search_id) throw "No search id supplied";
    if (typeof search_id != "string") throw "Type of search id is not a string";
    search_id = search_id.trim();
    if(search_id.length == 0) throw "Search id is empty";

    const { data } = await axios.get('http://api.tvmaze.com/shows/' + search_id);
    return data;
}

module.exports = {
    getShowData,
    getShowDataById
};
