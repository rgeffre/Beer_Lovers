//Requiring dependencies
var express = require('express');
var router = express.Router();
var passport = ('../config/passport');
var request = require('request');

//Importing the models to use for database functions
var user = require('../models/user.js');

//Creating routes to render pages

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/blog', function(req, res) {
  res.render('blog');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/mypub', function(req, res) {
  res.render('mypub');
});

router.get('/search', function(req, res) {
  res.render('search');
});

//executed when a user searches for beer
router.get('/searchBeer', function (req, res) {
  console.log(req.body);
  var beerName = req.query.beerName;
  var beerType = req.query.beerType;
  var withBreweries = req.query.displayBrewery;

  var query = "https://api.brewerydb.com/v2/beers?key=0d40d88d9c4811140db6bf54d6d5f282&name=";
  query += beerName.split(' ').join('+');
  query += "*&withBreweries=" + withBreweries;

  console.log(query);
  request(query, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
    var jbody = JSON.parse(body);
    console.log('body:', jbody);
    res.render('search', { body: jbody });
  });
});

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });


router.get('/signup', function(req, res) {
  res.render('signup');
});

router.post("/signup", function(req, res) {
  console.log(req.body);
  db.User.create({
    email: req.body.email,
    password: req.body.password
  }).then(function() {
    res.redirect(307, "/login");
  }).catch(function(err) {
    console.log(err);
    res.json(err);
    // res.status(422).json(err.errors[0].message);
  });
});

// Route for logging user out
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/user_data", function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  }
  else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});


//Export routes for app.js to use
module.exports = router;