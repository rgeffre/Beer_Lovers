//Requiring passport dependencies
var passport = require("passport")
    , LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

//Configuring Passport to use a Local Strategy meaning a username or email address and password.
//This application is using only an email address so we configure the usernameField to reflect that
passport.use(new LocalStrategy({
    usernameField: "email"
  },
  function(username, password, done) {
    db.User.findOne({username: email} , function (err, user) {
      if (err) {return done(err);}
      if (!db.User) {
        return done(null, false, {message: 'Incorrect username.'});
      }
      if (!db.User.validPassword(password)) {
        return done(null, false, {message: 'Incorrect password.'});
      }

      return done(null, user);
      });
    }
));


// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Exporting our configured passport
module.exports = passport;
