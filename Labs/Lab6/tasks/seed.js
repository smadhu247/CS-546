const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const bands = data.bands;
const albums = data.albums;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

    const theBeatles = await bands.create("The Beatles", ["Psychedelic rock", "Classic Rock", "Blues"], "http://WWW.thebeatles.com", "EMI", 
        ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"], 1960);
    theBeatles_id = theBeatles._id;

    const ledZeppelin = await bands.create("Led Zeppelin", ["Progressive Rock", "Psychedelic rock"], "http://www.ledzeppelin.com", "AR", 
        ["Robert Plant", "Jimmy Page", "John Paul Jones", "John Bonham"], 1968);
    ledZeppelin_id = ledZeppelin._id;

    const computerScienceRocks = await bands.create("Computer Science Rocks", ["Rock", "Alternative", "Pop"], "http://www.csrocks.com", "AR", 
        ["Sanjana Madhu", "Patrick Hill", "Sandeep Bhatt", "Philippe Meunier", "Reza Peyrovian"], 2022);
    computerScienceRocks_id = computerScienceRocks._id;

    await albums.create(theBeatles_id, "First Album", "01/01/2001", ["track1", "track2", "track3"], 1);
    await albums.create(theBeatles_id, "Second Album", "02/02/2002", ["track1", "track2", "track3"], 2);
    await albums.create(theBeatles_id, "Third Album", "03/03/2003", ["track1", "track2", "track3"], 4);

    await albums.create(ledZeppelin_id, "First Album", "01/01/2001", ["track1", "track2", "track3"], 1);
    await albums.create(ledZeppelin_id, "Second Album", "02/02/2002", ["track1", "track2", "track3"], 2);
    await albums.create(ledZeppelin_id, "Third Album", "03/03/2003", ["track1", "track2", "track3"], 3);

    await albums.create(computerScienceRocks_id, "First Album", "01/01/2001", ["track1", "track2", "track3"], 1);
    await albums.create(computerScienceRocks_id, "Second Album", "02/02/2002", ["track1", "track2", "track3"], 2);
    await albums.create(computerScienceRocks_id, "Third Album", "03/03/2003", ["track1", "track2", "track3"], 3);

    console.log('Done seeding database');

    await db.s.client.close();
}

main();
