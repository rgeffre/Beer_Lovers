//Requiring dependencies
var express = require('express');
var router = express.Router();
var passport = ('../config/passport');

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

router.put('/:id', function(req, res) {
  var condition = "id = " + req.params.id;

  console.log('condition', condition);
});

//Export routes for app.js to use
module.exports = router;