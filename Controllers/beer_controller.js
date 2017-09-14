//Requiring dependencies
var express = require('express');
var router = express.Router();
var passport = ('../config/passport');
var request = require('request');

//Importing the models to use for database functions
var user = require('../models/user.js');

//Creating routes to render pages

router.get('/', function(req, res) {
  request('http://api.brewerydb.com/v2/events?key=0d40d88d9c4811140db6bf54d6d5f282&year=2017', function (error, response, body) {
    
    var result =JSON.parse(body)
    var results = result.data
  res.render('index',{results});
  });
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
<<<<<<< HEAD
  res.render('search')
})
=======
  res.render('search');
});

//executed when a user searches for beer
router.get('/searchBeer', function (req, res) {
  // console.log(req.body);
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
    if (withBreweries === 'Y') {
      res.render('search', {
        beer: true,
        venue: false,
        body: jbody,
        breweries: jbody.breweries
      });
    } else {
      res.render('search', {
        beer: true,
        venue: false,
        body: jbody,
        breweries: ""
      });         
    }
  });
});

//executed when a user searches for beer
router.get('/searchVenue', function (req, res) {
  //city
  var venueLocality = req.query.locality;
  //state
  var venueRegion = req.query.region;
  //postal code
  var venuePostalCode = req.query.postalCode;

  var query = "https://api.brewerydb.com/v2/locations?key=0d40d88d9c4811140db6bf54d6d5f282";
  if (venuePostalCode) {
      query += "&postalCode=" + venuePostalCode;
  } else {

    if (venueLocality) {
      query += "&locality=" + venueLocality.split(' ').join('+');
    };
    if (venueRegion) {
      query += "&region=" + venueRegion.split(' ').join('+');
    };
  };
  
  console.log(query);
  request(query, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
    var jbody = JSON.parse(body);
    console.log('body:', jbody);
      res.render('search', {
        beer: false,
        venue: true,
        body: jbody,
        breweries: jbody.breweries
      });
  });
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
>>>>>>> 4ada9e5f29e10585b0484e4f688ed8a3aaee820e


//Export routes for app.js to use
module.exports = router;