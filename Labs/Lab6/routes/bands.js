const express = require('express');
const router = express.Router();
const data = require('../data');
const bandData = data.bands;
const { ObjectId } = require('mongodb');

async function errorCheck(name, genre, website, recordLabel, bandMembers, yearFormed) {
    if (!name) throw 'You must provide band name';
    if (!genre) throw 'You must provide band genre';
    if (!website) throw 'You must provide band website';
    if (!recordLabel) throw 'You must provide band recordLabel';
    if (!bandMembers) throw 'You must provide band bandMembers';
    if (!yearFormed) throw 'You must provide band yearFormed';

    if (typeof name != "string") throw 'Band name must be a string';
    if (typeof website != "string") throw 'Band website must be a string';
    if (typeof recordLabel != "string") throw 'Band recordLabel must be a string';

    name = name.trim();
    website = website.trim();
    recordLabel = recordLabel.trim();

    if(name.length == 0) throw "name parameter is empty";
    if(website.length == 0) throw "website parameter is empty";
    if(recordLabel.length == 0) throw "recordLabel parameter is empty";
    
    if(website.substring(0,11).toLowerCase() != "http://www.") throw "invalid website";
    let new_website = website;
    new_website = new_website.split("").reverse().join("");
    if(new_website.substring(0,4).toLowerCase() != "moc.") throw "invalid website";
    if(website.length < 20) throw "invalid website";

    if(!Array.isArray(genre)) throw "genre is not an array";
    if(!Array.isArray(bandMembers)) throw "bandMembers is not an array";

    if(genre.length < 1 || bandMembers.length < 1) throw "arrays do not have enough elements";

    let genre_array = []
    for (let i = 0; i < genre.length; i++) {
        if (typeof genre[i] != "string") throw "element is not a string";
        genre[i] = genre[i].trim();
        if(genre[i].length > 0) {
            genre_array.push(genre[i]);
        }
    }
    if(genre_array.length < 1) throw "genre does not have enough elements";

    let bandMembers_array = []
    for (let i = 0; i < bandMembers.length; i++) {
        if (typeof bandMembers[i] != "string") throw "element is not a string";
        bandMembers[i] = bandMembers[i].trim();
        if(bandMembers[i].length > 0) {
            bandMembers_array.push(bandMembers[i]);
        }
    }
    if(bandMembers_array.length < 1) throw "bandMembers_array does not have enough elements";

    if(typeof yearFormed != "number") throw "yearFormed is not a number 1";
    if(yearFormed < 1900 || yearFormed > 2022) throw "yearFormed is not a valid year";
}

router.get('/', async (req, res) => {
    try {
      const bands = await bandData.getAll();
      let bands_array = [];
      for (let i in bands) {
        let obj = {
            "_id": bands[i]._id,
            "name": bands[i].name
        }
        bands_array.push(obj)
      }
      return res.json(bands_array);
    } catch (e) {
        return res.status(404).json({ error: 'Bands not found' });
    }
});

router.post('/', async (req, res) => {
    const bandDataBody = req.body;
    try {
        await errorCheck(bandDataBody.name, bandDataBody.genre, bandDataBody.website, 
            bandDataBody.recordLabel, bandDataBody.bandMembers, bandDataBody.yearFormed);
    } catch (e) {
        return res.status(400).json({ error: e });
    }

    try {
        const { name, genre, website, recordLabel, bandMembers, yearFormed } = bandDataBody;
        const newBand = await bandData.create(name, genre, website, recordLabel, bandMembers, yearFormed);      
        return res.status(200).json(newBand);
    } catch (e) {
        return res.status(500).json({ error: e });
    }

});

router.get('/:id', async (req, res) => {
    if(!ObjectId.isValid(req.params.id))  {
        return res.status(400).json({ error: "id provided is not a valid ObjectId" });
    }
    try {
      const band = await bandData.get(req.params.id);
      return res.status(200).json(band);
    } catch (e) {
        return res.status(404).json({ error: 'Band not found' });
    }
});

router.put('/:id', async (req, res) => {
    const bandDataBody = req.body;

    try {
        await errorCheck(bandDataBody.name, bandDataBody.genre, bandDataBody.website, 
            bandDataBody.recordLabel, bandDataBody.bandMembers, bandDataBody.yearFormed);
    } catch (e) {
        return res.status(400).json({ error: e });
    }

    if(!ObjectId.isValid(req.params.id))  {
        return res.status(400).json({ error: "id provided is not a valid ObjectId" });
    }

    try {
      const band = await bandData.get(req.params.id);
    } catch (e) {
        return res.status(404).json({ error: 'Band not found' });
    }

    try {
        const band = await bandData.get(req.params.id);
        const updatedBand = await bandData.update(req.params.id, bandDataBody.name, bandDataBody.genre, bandDataBody.website, 
            bandDataBody.recordLabel, bandDataBody.bandMembers, bandDataBody.yearFormed);
        updatedBand.albums = band.albums;
        updatedBand.overallRating = band.overallRating;
        return res.status(200).json(updatedBand);
      } catch (e) {
        return res.status(500).json({ error: e });
      }
});

router.delete('/:id', async (req, res) => {
    if(!ObjectId.isValid(req.params.id))  {
        return res.status(400).json({ error: "id provided is not a valid ObjectId" });
    } 
    try {
        const band = await bandData.get(req.params.id);
        await bandData.remove(req.params.id);
        let obj = {
            bandId: band._id.toString(),
            deleted: true
        }
        return res.status(200).json(obj);
        } catch (e) {
            return res.status(404).json({ error: 'Band not found' });
    }
});
  
module.exports = router;