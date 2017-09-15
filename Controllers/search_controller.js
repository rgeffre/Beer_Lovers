'use strict';

var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/search', function(req, res) {
  res.render('search');
});

//executed when a user searches for beer
router.get('/searchBeer', function (req, res) {
  // console.log(req.body);
  var beerName = req.query.beerName.trim();
  var withBreweries = req.query.displayBrewery;
  if (beerName === '' || beerName === null) {
    res.render('search', {
      beer: true,
      venue: false,
      body: {data:[{name: "No Matches"}]},
      breweries: ""
    });
    return;
  };

  var query = "https://api.brewerydb.com/v2/beers?key=0d40d88d9c4811140db6bf54d6d5f282&name=";
  query += beerName.split(' ').join('+');
  query += "*&withBreweries=" + withBreweries;

  console.log(query);
  request(query, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    var jbody = JSON.parse(body);
    // console.log('body:', jbody);
    if (jbody.data) {
      if (withBreweries === 'Y') {
        // console.log("withBreweries=yes");
        res.render('search', {
          beer: true,
          venue: false,
          body: jbody,
          breweries: jbody.breweries
        });
      } else {
        // console.log("with brewery is no");
        res.render('search', {
          beer: true,
          venue: false,
          body: jbody,
          breweries: ""
        });
      }
    } else {
      res.render('search', {
        beer: true,
        venue: false,
        body: { data: [{ name: "No Matches" }] },
        breweries: ""
      });
      return;
    }
  });
});

//executed when a user searches for beer
router.get('/searchVenue', function (req, res) {
  //city
  var venueLocality = req.query.locality.trim();
  //state
  var venueRegion = req.query.region;
  //postal code
  var venuePostalCode = req.query.postalCode.trim();

  if (venueLocality || venueRegion || venuePostalCode) {

    var query = "https://api.brewerydb.com/v2/locations?key=0d40d88d9c4811140db6bf54d6d5f282";
    if (venuePostalCode) {
      query += "&postalCode=" + venuePostalCode;
    } else {

      if (venueLocality) {
        query += "&locality=" + venueLocality.split(' ').join('+');
      }
      if (venueRegion) {
        query += "&region=" + venueRegion.split(' ').join('+');
      }
    }

    // console.log(query);
    request(query, function(error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      var jbody = JSON.parse(body);
      // console.log('body:', jbody);
      res.render('search', {
        beer: false,
        venue: true,
        searchBody: jbody,
        breweries: ""
      });
    });

  } else {

    res.render('search', {
      beer: false,
      venue: true,
      searchBody: jbody,
      breweries: jbody.breweries
    });
  }
});

module.exports = router;