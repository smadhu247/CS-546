const express = require('express');
const router = express.Router();
const json_data = require('../data');
const data = json_data.data;

router.get('/people', async (req, res) => {
    try {
      const userList = await data.getPeople();
      res.json(userList);
    } catch (e) {
      res.status(500).send();
    }
});

router.get('/work', async (req, res) => {
    try {
      const userList = await data.getWork();
      res.json(userList);
    } catch (e) {
      res.status(500).send();
    }
});

router.get('/people/:id', async (req, res) => {
  try {
    const post = await data.getPersonById(req.params.id);
    res.json(post);
  } catch (e) {
    res.status(404).json({ message: 'Person not found' });
  }
});

router.get('/work/:id', async (req, res) => {
    try {
      const post = await data.getWorkById(req.params.id);
      res.json(post);
    } catch (e) {
      res.status(404).json({ message: 'Work not found' });
    }
});

module.exports = router;
