var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Create a new Express application.
var app = express();
app.set('port', process.env.PORT || 3001);

// Configure view engine to render EJS templates.
//app.engine('html',cons.swig)
//app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
//app.set('view engine', 'html');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Configure the local strategy for use by Passport.
var User = require('./models/users.js');
var Profile = require('./models/profile.js');
//var Picture = require('./models/picture.js');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to mongo !!!! USES MY (Nick's) mLAB info, so replace URI with your own development db. 
//mongoose.connect("mongodb://ncirone:nRsoQloNthstY1@ds227853.mlab.com:27853/support_group_dev", { useNewUrlParser: true });
mongoose.connect("mongodb://admin:admin1@ds035844.mlab.com:35844/support-app-test", { useNewUrlParser: true });

// Config: Decide whether you want to register dummy users / admin user upon server start
// Always change to false when deploying
const REGISTER_DUMMIES = true;
const REGISTER_ADMIN = true;

// Helper functions for registering Users 
var registerUser = require('./helpers/registerUser');

if (REGISTER_DUMMIES) {
  var dummyUsers = require('./dummyUsers');
  dummyUsers();
}

if (REGISTER_ADMIN) {
  var admin = new User(
    {
      username: 'admin',
      email: 'admin@admin.com',
      role: 'admin',
      parentId: null,
      childId: null,
      profileId: null,
    }
  );
  registerUser(admin, 'admin');
}

require('./routes')(app);

app.listen(app.get('port'), function(){
  console.log("Express Server Listening on Port " + app.get('port'))
});
