//Requiring dependencies
'use strict';
var express = require('express');
var router = express.Router();
var passport = ('../config/passport');
var request = require('request');

//Importing the models to use for database functions
var user = require('../models');

//Creating routes to render pages

router.get('/blog', function(req, res) {
  res.render('blog');
});

router.get('/', function(req, res) {
  request('http://api.brewerydb.com/v2/events?key=0d40d88d9c4811140db6bf54d6d5f282&year=2017', function (error, response, body) {

    var result = JSON.parse(body);
    var results = result.data;
    console.log(result.data);

    res.render('index',{results});
  })
});

//Export routes for app.js to use
module.exports = router;