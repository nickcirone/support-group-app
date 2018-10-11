var path = require('path');
var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

// Create a new Express application.
var app = express();
app.set('port', process.env.PORT || 3001);

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

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
//app.use(app.router);

// Configure the local strategy for use by Passport.
var User = require('./models/users');
passport.use(new Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to mongo
mongoose.connect("mongodb://ncirone:nRsoQloNthstY1@ds227853.mlab.com:27853/support_group_dev", { useNewUrlParser: true });

// Configure Passport authenticated session persistence.

/*
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});
*/

require('./routes')(app);

// Define routes.
/*
app.get('/',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res) {
    res.render('home', { user: req.user });
  });

app.get('/login',
  function(req, res){
    res.render('login');
  });

app.get('/admin',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('admin', {user: req.user});
  });
  
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    if (req.user.role === 'admin') {
      res.redirect('/admin');
    } else {
      res.redirect('/');
    }
  });
  
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

*/

app.listen(app.get('port'), function(){
  console.log("Express Server Listening on Port " + app.get('port'))
});