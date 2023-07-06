const express = require('express');
const router = express.Router();

const data = require('../data');
const showData = data.shows;

router.get('/', async (req, res) => {
    return res.render('shows/index', {title: "Show Finder"});
});


router.post('/searchshows', async (req, res) => {

    let search_term = req.body.showSearchTerm;

    if (!search_term) {
        return res.status(404).render('shows/error', { class: "input-error", inputError: true, title: "Error"});
    }

    if (typeof search_term != "string") {
        return res.status(404).render('shows/error', { class: "input-error", inputError: true, title: "Error"});
    }

    search_term = search_term.trim();
    if(search_term.length == 0)  {
        return res.status(400).render('shows/error', { class: "error", searchTermError: true, title: "Error"});
    }

    try {
        let show_data = await showData.getShowData(search_term);
        if(show_data.length == 0) {
            return res.status(400).render('shows/error', { class: "show-not-found", showNotFound: true, showTerm: search_term, title: "Error"});
        }
    
        let list_shows = [];
        if (show_data.length > 5) {
            for (let i = 0; i < 5; i++) {
                list_shows.push(show_data[i]); 

            }
        }
        if (show_data.length < 5) {
            for (let i = 0; i < show_data.length; i++) {
                list_shows.push(show_data[i]); 
            }
        }
    
        return res.render('shows/showTermSearch', {showSearchTerm: search_term, shows: list_shows, title: "Shows Found"});
      } catch (e) {
        return res.status(500).json({ error: e });
      }
});

router.get('/show/:id', async (req, res) => {    

    if (!req.params.id) {
        return res.status(404).render('shows/error', { class: "input-error", inputError: true, title: "Error"});
    }

    if (typeof req.params.id != "string") {
        return res.status(404).render('shows/error', { class: "input-error", inputError: true, title: "Error"});
    }

    req.params.id = req.params.id.trim();
    if(req.params.id.length == 0) {
        return res.status(404).render('shows/error', { class: "input-error", inputError: true, title: "Error"});
    }

    try {
        let show_data = await showData.getShowDataById(req.params.id);
        if(show_data.length == 0) {
            return res.status(404).render('shows/error', { class: "error-not-found", showByIdNotFound: true, title: "Error" });
        }
        let summary_str = show_data.summary.replace(/(<([^>]+)>)/gi, "");
        return res.render('shows/idSearch', {show: show_data, summary: summary_str, title: show_data.name});

      } catch (e) {
        return res.status(404).render('shows/error', { class: "error-not-found", showByIdNotFound: true, title: "Error"});
      }
    
});

module.exports = router;
