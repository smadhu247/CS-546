const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');


const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

const session = require('express-session');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}))


app.use(async (req, res, next) => {
  if (!req.session.user) {
    console.log("[" + new Date().toUTCString() + "] " + req.method + " " + req.originalUrl + " (Non-Authenticated User)");
  } else {
    console.log("[" + new Date().toUTCString() + "] " + req.method + " " + req.originalUrl + " (Authenticated User)");
  }
  next();
});

app.use('/private', (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render('users/notloggedin', {title: "Not Logged in!"});
  } else {
    next();
  }
});

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});

