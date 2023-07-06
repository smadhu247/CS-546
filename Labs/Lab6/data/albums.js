const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const { ObjectId, ConnectionClosedEvent } = require('mongodb');
const bandFile = require('./bands');

async function create(bandId, title, releaseDate, tracks, rating) {

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
        const band = await bandFile.get(bandId.toString());
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

    let id = new ObjectId();

    let newAlbum = {
        _id: id,
        title: title, 
        releaseDate: releaseDate, 
        tracks: tracks_array, 
        rating: rating
    };

    const bandsCollection = await bands();
    await bandsCollection.updateOne({ _id: ObjectId(bandId) }, { $addToSet: { albums: newAlbum } })
    const updatedBand = await bandFile.get(bandId);
    let newoverallrating = 0;
    if (updatedBand.albums.length > 0) {
        let newRating = 0;
        for(let i = 0; i < updatedBand.albums.length; i++) {
            newRating = newRating + updatedBand.albums[i].rating;
        } 
    
        newoverallrating = newRating / updatedBand.albums.length;
        newoverallrating = parseFloat(newoverallrating.toFixed(1));
    }

    await bandsCollection.updateOne({ _id: ObjectId(bandId) }, { $set: { overallRating: newoverallrating } })

    return newAlbum;
}


async function getAll(bandId) {
    if(!bandId) throw "bandId parameter not provided";
    if(typeof bandId != "string") throw "bandId parameter is not a string";
    bandId = bandId.trim();
    if(bandId.length == 0) throw "bandId parameter is empty";

    if(!ObjectId.isValid(bandId)) throw "bandId provided is not a valid ObjectId";

    const bandCollection = await bands();
    const band = await bandCollection.findOne({ _id: ObjectId(bandId) });
    if (band === null) throw 'No band with that id';

    for (let i = 0; i < band.albums.length; i++) {
        band.albums[i]._id = band.albums[i]._id.toString();
    }
    return band.albums;

}

async function get(albumId) {
    if(!albumId) throw "albumId parameter not provided";
    if(typeof albumId != "string") throw "albumId parameter is not a string";
    albumId = albumId.trim();
    if(albumId.length == 0) throw "albumId parameter is empty";

    if(!ObjectId.isValid(albumId)) throw "albumId provided is not a valid ObjectId";

    const bandCollection = await bands();
    const bandList = await bandCollection.find({ }).toArray();

    let album;

    const albums_list = await bandCollection
    .find({'albums._id': ObjectId(albumId) })
    .project({"albums": 1, "_id": 0}).toArray();


    for (let i = 0; i < albums_list[0].albums.length; i++) {
        if (albums_list[0].albums[i]._id.toString() == albumId) {
            album = albums_list[0].albums[i];
        }
    }

    if (album === null) throw 'No band with that id';
    album._id =  album._id.toString();
    return album;
}

async function remove(albumId) {

    if(!albumId) throw "albumId parameter not provided";
    if(typeof albumId != "string") throw "albumId parameter is not a string";
    albumId = albumId.trim();
    if(albumId.length == 0) throw "albumId parameter is empty";

    if(!ObjectId.isValid(albumId)) throw "albumId provided is not a valid ObjectId";

    const bandCollection = await bands();
    const bandList = await bandCollection.find({ }).toArray();

    const albums_list = await bandCollection
    .find({'albums._id': ObjectId(albumId) })
    .project({"albums": 1}).toArray();

    let band_id;

    for (let i = 0; i < albums_list[0].albums.length; i++) {
        if (albums_list[0].albums[i]._id.toString() == albumId) {
            album = albums_list[0].albums[i];
            band_id = albums_list[0]._id.toString();
            await bandCollection.updateOne({ _id: ObjectId(band_id) }, { $pull: { albums: album } })
        }
    }   

    const band = await bandFile.get(band_id);

    let newoverallrating = 0;
    if( band.albums.length > 0) {
        let newRating = 0;
        for(let i = 0; i < band.albums.length; i++) {
            newRating = newRating + band.albums[i].rating;
        } 

        newoverallrating = newRating / band.albums.length;
        newoverallrating = parseFloat(newoverallrating.toFixed(1));
    }

    await bandCollection.updateOne({ _id: ObjectId(band_id) }, { $set: { overallRating: newoverallrating } })

    band._id =  band._id.toString();
    return band;

}

module.exports = {
    create,
    getAll, 
    get,
    remove
}