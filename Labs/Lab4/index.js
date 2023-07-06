const bands = require("./data/bands");
const connection = require('./config/mongoConnection');

async function main() {

    let ledZeppelin_id;
    let theBeatles_id;

    try {
        const theBeatles = await bands.create("The Beatles", ["Psychedelic rock", "Classic Rock", "Blues"], "http://WWW.thebeatles.com", "EMI", 
        ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"], 1960);
        console.log(theBeatles);
        theBeatles_id = theBeatles._id;
    } catch(e) {
        console.log(e);
    }

    try {
        const ledZeppelin = await bands.create("Led Zeppelin", ["Progressive Rock", "Psychedelic rock"], "http://www.ledzeppelin.com", "AR", 
        ["Robert Plant", "Jimmy Page", "John Paul Jones", "John Bonham"], 1968);
        ledZeppelin_id = ledZeppelin._id;
    } catch(e) {
        console.log(e);
    }

    try {
        const allBands = await bands.getAll();
        console.log(allBands);
    } catch(e) {
        console.log(e);
    }

    try {
        const computerScienceRocks = await bands.create("Computer Science Rocks", ["Rock", "Alternative", "Pop"], "http://www.csrocks.com", "AR", 
        ["Sanjana Madhu", "Patrick Hill", "Sandeep Bhatt", "Philippe Meunier", "Reza Peyrovian"], 2022);
        console.log(computerScienceRocks);
    } catch(e) {
        console.log(e);
    }

    try {
        const renamedTheBeatles = await bands.rename(theBeatles_id, "The Bugs"); 
        console.log(renamedTheBeatles); 
    } catch(e) {
        console.log(e);
    }

    try {
        const removeLedZeppelin = await bands.remove(ledZeppelin_id); 
        console.log(removeLedZeppelin);
    } catch(e) {
        console.log(e);
    }

    try {
        const allBands2 = await bands.getAll();
        console.log(allBands2);
    } catch(e) {
        console.log(e);
    }

    try {
        const badBand = await bands.create(1, "http://www.thebeatles.com", "EMI", 
        ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"], 1960);
        console.log(badBand);
    } catch(e) {
        console.log(e);
    }

    try {
        const removeNonexistantBand = await bands.remove("507f1f77bcf86cd7994390nfwognbgoufeoirbwoenip12"); 
        console.log(removeNonexistantBand); 
    } catch(e) {
        console.log(e);
    }

    try {
        const renameNonexistantBand = await bands.rename("507f1f77bcf86cd7994390nfwognbgoufeoirbwoenip12", "The Worst Band"); 
        console.log(renameNonexistantBand);
    } catch(e) {
        console.log(e);
    } 

    try {
        const renameNonexistantBand2 = await bands.rename("507f1f77bcf86cd799439012", 12345); 
        console.log(renameNonexistantBand2);
    } catch(e) {
        console.log(e);
    }  

    try {
        const getNonexistantBand = await bands.get("507f1f77bcf86cd7994390nfwognbgoufeoirbwoenip12"); 
        console.log(getNonexistantBand); 
    } catch(e) {
        console.log(e);
    } 
    
    

    try {
        const badBand = await bands.create("Bad Band", ["Genre 1", "Genre2", 2], "http://www.aaaaa.com", "EMI", 
        ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"], 2022);
        console.log(badBand);
    } catch(e) {
        console.log(e);
    }

    try {
        const getNonexistantBand = await bands.get("      "); 
        console.log(getNonexistantBand); 
    } catch(e) {
        console.log(e);
    } 

     try {
        const renameNonexistantBand2 = await bands.rename("id", "    "); 
        console.log(renameNonexistantBand2);
    } catch(e) {
        console.log(e);
    }
    
    try {
        const renamedTheBeatles = await bands.rename(theBeatles_id, "The Bugs"); 
        console.log(renamedTheBeatles); 
    } catch(e) {
        console.log(e);
    }

    const db = await connection.connectToDb();
    await connection.closeConnection();
    console.log('Done!');
}

// main().catch((error) => {
//     console.log(error);
//   });

main();