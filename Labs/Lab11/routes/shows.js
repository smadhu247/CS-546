const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    return res.render('shows/index', {title: "Show Finder"});
});

module.exports = router;