'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../models');
var passport = require('../config/passport');

//Routes for user signup, if the signup is successful log the user in, otherwise throw an error
router.get('/signup', function (req, res) {
  res.render('signup');
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.get('/mypub', function (req, res) {
  res.render('mypub');
});

router.post('/signup', function (req, res) {
  console.log(req.body);
  db.User.create({
    email: req.body.email,
    password: req.body.password
  }).then(function () {
    res.redirect(307, "/users/login");
  }).catch(function (err) {
    console.log(err);
    res.status(422).json(err.errors[0].message);
  });
});

//Routing for logins
router.post('/login', passport.authenticate('local'), function (req, res) {
  res.json("/users/mypub");
});

// Route for logging user out
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// Route for getting some data about our user to be used client side
router.get('/user_data', function (req, res) {
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

//Routing for user logins
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require('../config/middleware/isAuthenticated');

router.get("/", function (req, res) {
  // If the user already has an account send them their mypub page,
  //otherwise redirect them to the signup page
  if (req.user) {
    res.redirect('mypub');
  }
  res.render('signup');
});

router.get('/login', function (req, res) {
  // If the user already has an account send them to their mypub page
  if (req.user) {
    res.redirect('mypub');
  }
  res.render('signup');
});

// Here we add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route
// they will be redirected to the signup page
router.get('/mypub', isAuthenticated, function (req, res) {
  res.render('signup');
});

module.exports = router;