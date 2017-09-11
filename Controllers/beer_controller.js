var express = require('express');

var router = express.Router();

//Importing the models to use for database functions
var user = require('../models/user.js');


//Create all the required routes and logic
router.get('/', function(req, res) {
  user.all(function(data) {
    varhbsObject = {
      users: data
    };
    console.log(hbsObject);
  });
});

router.post('/', function(req, res) {
  user.create([
      'username', 'favorites'
  ], [req.body.username, req.body.favorites
  ], function() {
    res.redirect('/');
  });
});

//Export routes for app.js to use
module.exports = router;