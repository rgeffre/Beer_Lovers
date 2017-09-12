var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
//requiring passport as it's been configured for this app
var passport = require('./config/passport');

//Configuring the port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require('./models');

//Configuring express app
var app = express();

// view engine setup
app.engine('handlebars', exphbs({defaultLayout: 'default'}));
app.set('view engine', 'handlebars');

//Configuring middleware parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'views')));

//Setting up sessions to track user login status
app.use(session({secret:"keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Import routes
var routes = require ('./controllers/beer_controller.js');

app.use('/', routes);


//Syncing the database and logging a success message
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });

});

module.exports = app;
