//Requiring dependencies
var express = require('express');
var router = express.Router();
var passport = ('../config/passport');

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