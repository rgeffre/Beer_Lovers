var express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
//requiring passport as it's been configured for this app
var passport = require('./config/passport');

//Configuring the port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require('./models');

//Configuring express app
var app = express();

//Configuring middleware applications, Passport,
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.engine('handlebars', exphbs({ defaultLayout: 'default' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

//Import controllers and routes
var main = require('./controllers/beer_controller.js');
var users = require('./controllers/user_controller.js');
var search = require('./controllers/search_controller.js');

app.use('/', main);
app.use('/users', users);
app.use('/search', search);

//Syncing the database and logging a success message
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });

});

module.exports = app;
