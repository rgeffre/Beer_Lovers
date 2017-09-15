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


//Export routes for app.js to use
module.exports = router;