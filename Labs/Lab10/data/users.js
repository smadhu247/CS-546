const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const bcrypt = require('bcrypt');
const saltRounds = 16;

async function createUser(username, password) {

    if(!username) throw "username parameter not provided";
    if(!password) throw "password parameter not provided";

    if(typeof username != "string") throw "username parameter is not a string";
    if(typeof password != "string") throw "password parameter is not a string";
    username = username.toLowerCase();
    username = username.trim();

    if(username.length < 4) throw "username must be at least 4 characters long";
    if(password.length < 6) throw "password must be at least 6 characters long";

    // source: https://www.codegrepper.com/code-examples/javascript/how+to+check+if+string+contains+space+in+javascript
    if(/\s/.test(username)) throw "username should not contain spaces"
    if(/\s/.test(password)) throw "password should not contain spaces"

    // source: https://www.w3schools.blog/alphanumeric-validation-javascript-js
    var alphaNumerics = /^[0-9a-zA-Z]+$/;
    if(!username.match(alphaNumerics)) throw "username can only contain alphanumeric characters";

    const usersCollection = await users();
    const user = await usersCollection.findOne({ username: username });
    if (user !== null) throw 'there already a user with that username';

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let newUser = {
        username: username,
        password: hashedPassword
    };

    const insertInfo = await usersCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw 'could not add user to the database';

    let obj = {userInserted: true}
    return obj;

}

async function checkUser(username, password) {

    if(!username) throw "username parameter not provided";
    if(!password) throw "password parameter not provided";

    if(typeof username != "string") throw "username parameter is not a string";
    if(typeof password != "string") throw "password parameter is not a string";
    username = username.toLowerCase();
    username = username.trim();

    if(username.length < 4) throw "username must be at least 4 characters long";
    if(password.length < 6) throw "password must be at least 6 characters long";

    // source: https://www.codegrepper.com/code-examples/javascript/how+to+check+if+string+contains+space+in+javascript
    if(/\s/.test(username)) throw "username should not contain spaces"
    if(/\s/.test(password)) throw "password should not contain spaces"

    // source: https://www.w3schools.blog/alphanumeric-validation-javascript-js
    var alphaNumerics = /^[0-9a-zA-Z]+$/;
    if(!username.match(alphaNumerics)) throw "username can only contain alphanumeric characters";

    const usersCollection = await users();
    const user = await usersCollection.findOne({ username: username });
    if (user === null) throw "Either the username or password is invalid";

    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    let compare = false;

    try {
        compare = await bcrypt.compare(user.password, hashedPassword);
    } catch (e) {
        throw "error in hashed password";
    }
  
    if (compare) {
        return {authenticated: true};
    } 
    else {
        throw "Either the username or password is invalid";
    }

}

module.exports = {
    checkUser,
    createUser
}