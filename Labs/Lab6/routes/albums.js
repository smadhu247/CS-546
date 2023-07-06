const express = require('express');
const router = express.Router();
const data = require('../data');
const albumData = data.albums;
const bandData = data.bands;
const { ObjectId } = require('mongodb');

async function errorCheck(bandId, title, releaseDate, tracks, rating) {
    if(!bandId) throw "bandId parameter not provided";
    if(!title) throw "title parameter not provided";
    if(!releaseDate) throw "releaseDate parameter not provided";
    if(!tracks) throw "tracks parameter not provided";
    if(!rating) throw "rating parameter not provided";

    if(typeof bandId != "string") throw "bandId parameter is not a string";
    if(typeof title != "string") throw "title parameter is not a string";
    if(typeof releaseDate != "string") throw "releaseDate parameter is not a string";

    bandId = bandId.trim();
    title = title.trim();
    releaseDate = releaseDate.trim();

    if(bandId.length == 0) throw "bandId parameter is empty";
    if(title.length == 0) throw "title parameter is empty";
    if(releaseDate.length == 0) throw "releaseDate parameter is empty";

    if(!ObjectId.isValid(bandId)) throw "bandId provided is not a valid ObjectId";

    try {
        const band = await bandData.get(bandId.toString());
    } catch (e) {
        throw e;
    }

    if(!Array.isArray(tracks)) throw "tracks is not an array";

    if(tracks.length < 3) throw "tracks does not have enough elements";

    let tracks_array = []
    for (let i = 0; i < tracks.length; i++) {
        if (typeof tracks[i] != "string") throw "element is not a string";
        tracks[i] = tracks[i].trim();
        if(tracks[i].length > 0) {
            tracks_array.push(tracks[i]);
        }
    }
    if(tracks_array.length < 3) throw "tracks_array does not have enough elements";

    let arr = releaseDate.split("/");
    if(arr.length < 3) throw "invalid releaseDate";
    if (arr[0].length!= 2 || arr[1].length != 2 || arr[2].length != 4) throw "invalid releaseDate";

    let year = parseInt(arr[2]);
    let month = parseInt(arr[0]);
    let day = parseInt(arr[1]);

    if(year < 1900 || year > 2023) throw "releaseDate is not a valid year";

    if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        if (day > 31 || day < 1) throw "invalid releaseDate";
    }
    if(month == 4 || month == 6 || month == 9 || month == 11) {
        if (day > 30 || day < 1) throw "invalid releaseDate";
    }
    if(month == 2) {
        if ((year / 4) % 1 != 0) {
            if (day > 28 || day < 1) throw "invalid releaseDate";
        }
        if ((year / 4) % 1 == 0) {
            if (day > 29 || day < 1) throw "invalid releaseDate";
        }
    }

    if (rating < 1 || rating > 5)  throw "invalid rating. must be between 1 and 5";
}

router.get('/:bandId', async (req, res) => {
    if(!ObjectId.isValid(req.params.bandId))  {
        return res.status(400).json({ error: "bandId provided is not a valid ObjectId" });
    }
    try {
      const albums = await albumData.getAll(req.params.bandId);
      if (albums.length <= 0) throw "no albums found";
      return res.status(200).json(albums);
    } catch (e) {
        return res.status(404).json({ error: 'Band not found or no albums found' });
    }
});

router.post('/:bandId', async (req, res) => {
    const albumDataBody = req.body;
    try {
        await errorCheck(req.params.bandId, albumDataBody.title, albumDataBody.releaseDate, 
            albumDataBody.tracks, albumDataBody.rating);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ error: e });
    }
    try {
        const { title, releaseDate, tracks, rating } = albumDataBody;
        const newAlbum = await albumData.create(req.params.bandId, title, releaseDate, tracks, rating);
    } catch (e) {
        return res.status(500).json({ error: e });
    }
    try {
        const band = await bandData.get(req.params.bandId);
        return res.status(200).json(band);
    } catch (e) {
        return res.status(404).json({ error: 'Band not found' });
    }

});

router.get('/album/:albumId', async (req, res) => {
    
    if(!ObjectId.isValid(req.params.albumId))  {
        return res.status(400).json({ error: "albumId provided is not a valid ObjectId" });
    }
    try {
      const album = await albumData.get(req.params.albumId);
      return res.status(200).json(album);
    } catch (e) {
        return res.status(404).json({ error: 'Album not found' });
    }
});

router.delete('/:albumId', async (req, res) => {
    if(!ObjectId.isValid(req.params.albumId))  {
        return res.status(400).json({ error: "albumId provided is not a valid ObjectId" });
    }
    try {
        const album = await albumData.remove(req.params.albumId);
        let obj = {
            albumId: req.params.albumId,
            deleted: true
        }
        return res.status(200).json(obj);
        } catch (e) {
            return res.status(404).json({ error: 'Album not found' });
    }
   
});

module.exports = router;