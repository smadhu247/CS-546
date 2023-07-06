const mongoCollections = require("../config/mongoCollections");
const bands = mongoCollections.bands;
const { ObjectId } = require('mongodb');


async function create(name, genre, website, recordLabel, bandMembers, yearFormed) {
    if(!name) throw "name parameter not provided";
    if(!genre) throw "genre parameter not provided";
    if(!website) throw "website parameter not provided";
    if(!recordLabel) throw "recordLabel parameter not provided";
    if(!bandMembers) throw "bandMembers parameter not provided";
    if(!yearFormed) throw "yearFormed parameter not provided";
    
    if(typeof name != "string") throw "name parameter is not a string";
    if(typeof website != "string") throw "website parameter is not a string";
    if(typeof recordLabel != "string") throw "recordLabel parameter is not a string";

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

    for (let i = 0; i < genre.length; i++) {
        if (typeof genre[i] != "string") throw "element is not a string";
        else {
            genre[i] = genre[i].trim();
        }
    }

    for (let i = 0; i < bandMembers.length; i++) {
        if (typeof bandMembers[i] != "string") throw "element is not a string";
        else {
            bandMembers[i] = bandMembers[i].trim();
        }
    }

    if(typeof yearFormed != "number") throw "yearFormed is not a number";
    if(yearFormed < 1900 || yearFormed > 2022) throw "yearFormed is not a valid year";

    //create the band
    let newBand = {
        name: name,
        genre: genre,
        website: website,
        recordLabel: recordLabel,
        bandMembers: bandMembers,
        yearFormed: yearFormed,
    };

    const bandsCollection = await bands();

    const insertInfo = await bandsCollection.insertOne(newBand);
    if (insertInfo.insertedCount === 0) throw 'Could not add band';

    const newId = insertInfo.insertedId;
    const band = await this.get(newId.toString());

    band._id = newId.toString();

    return band;

}

async function getAll() {

    const bandCollection = await bands();
    const bandList = await bandCollection.find({ }).toArray();

    for(let i = 0; i < bandList.length; i++) {
        let id = bandList[i]._id.toString();
        bandList[i]._id = id;
    }

    return bandList;

}

async function get(id) {

    if(!id) throw "id parameter not provided";
    if(typeof id != "string") throw "id is not a string";
    id = id.trim();
    if(id.length == 0) throw "id is an empty string";

    if(!ObjectId.isValid(id)) throw "id provided is not a valid ObjectId";

    const bandCollection = await bands();
    const band = await bandCollection.findOne({ _id: ObjectId(id) });
    if (band === null) throw 'No band with that id';

    return band;

}

async function remove(id) {

    if(!id) throw "id parameter not provided";
    if(typeof id != "string") throw "id is not a string";
    id = id.trim();
    if(id.length == 0) throw "id is an empty string";

    if(!ObjectId.isValid(id)) throw "id provided is not a valid ObjectId";

    const bandCollection = await bands();

    const band = await this.get(id);
    let band_name = band.name;

    const deletionInfo = await bandCollection.deleteOne({ _id: ObjectId(id) });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete band with id of ${id}`;
    }

    return band_name + " has been successfully deleted!"; 

}

async function rename(id, newName) {

    if(!id) throw "id parameter not provided";
    if(typeof id != "string") throw "id is not a string";
    id = id.trim();
    if(id.length == 0) throw "id is an empty string";

    if(!ObjectId.isValid(id)) throw "id provided is not a valid ObjectId";

    if(!newName) throw "newName parameter not provided";
    if(typeof newName != "string") throw "newName is not a string";
    newName = newName.trim();
    if(newName.length == 0) throw "newName is an empty string";

    const bandCollection = await bands();

    const band = await this.get(id);

    if(newName == band.name) throw "new name can not match current name";

    const updatedBand = {
        name: newName,
        genre: band.genre,
        website: band.website,
        recordLabel: band.recordLabel,
        bandMembers: band.bandMembers,
        yearFormed: band.yearFormed,
    };

    const updatedInfo = await bandCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: updatedBand },
    );

    if (updatedInfo.modifiedCount === 0) throw 'could not update band successfully';

    const return_band = await this.get(id);
    return_band._id = id.toString();

    return return_band;

}

module.exports = {
    create, 
    getAll,
    get, 
    remove, 
    rename
}