'use strict';

var express = require('express');
var router = express.Router();
var request = require('request');

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

module.exports = router;