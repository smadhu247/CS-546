const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const { ObjectId } = require('mongodb');

async function errorCheck(username, password) {

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

}

router.get('/', async (req, res) => {
    if (req.session.user) {
        return res.redirect('/private');
    }
    else {
        try{
            return res.status(200).render('users/login', {title: "Login", error: false});
        } catch (e) {
            return res.render('users/error', {title: "Error", error: e});
        }
    }
});

router.get('/signup', async (req, res) => {
    if (req.session.user) {
        return res.redirect('/private');
    }
    else {
        try{
            return res.status(200).render('users/signup', {title: "Sign up",  error: false});
        } catch (e) {
            return res.render('users/error', {title: "Error", error: e});
        }
    }
});

router.post('/signup', async (req, res) => {
    const userDataBody = req.body;
    let user;

    try {
        await errorCheck(userDataBody.username, userDataBody.password);
    } catch (e) {
        return res.status(400).render('users/signup', {title: "Sign up", error: true, errorMessage: e});
    }

    try {
        user = await userData.createUser(userDataBody.username, userDataBody.password);
      } catch (e) {
        return res.status(400).render('users/signup', {title: "Sign up", error: true, errorMessage: e});
    }

    try {
        if(user.userInserted == true) {
            return res.redirect('/');
        }
    } catch (e) {
        return res.status(500).render('users/error', {title: "Error", error: "Internal Server Error"});
    }
});

router.post('/login', async (req, res) => {
    const userDataBody = req.body;
    
    try {
        await errorCheck(userDataBody.username, userDataBody.password);
    } catch (e) {
        return res.status(400).render('users/signup', {title: "Sign up", error: true, errorMessage: e});
    }

    try {
        const user = await userData.checkUser(userDataBody.username, userDataBody.password);
      } catch (e) {
        return res.status(400).render('users/signup', {title: "Sign up", error: true, errorMessage: e});
    }

    try {
        const user = await userData.checkUser(userDataBody.username, userDataBody.password);
        if(user.authenticated == true) {
            req.session.user = {username: userDataBody.username};
            return res.redirect('/private');
        }
    } catch (e) {
        return res.status(400).render('users/login', {title: "Login", error: true, errorMessage: e});
    }
});

router.get('/private', async (req, res) => {  
    try{
        return res.status(200).render('users/loggedin', {title: "Logged in!", username: req.session.user.username});
    } catch (e) {
        return res.render('users/error', {title: "Error", error: e});
    }
});

router.get('/logout', async (req, res) => {
    req.session.destroy();
    return res.status(200).render('users/loggedout', {title: "Logged Out!"});
});

module.exports = router;