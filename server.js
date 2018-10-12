var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to mongo
 mongoose.connect('mongodb://admin:admin1@ds125673.mlab.com:25673/support-app-test',{useNewUrlParser: true},(err)=>{
   console.log('mongo db connection',err);
 });

// Configure Passport authenticated session persistence.


passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  
  });
})
// Connect to mongo !!!! USES MY mLAB info, so replace URI with your own development db. 
//mongoose.connect("mongodb://ncirone:nRsoQloNthstY1@ds227853.mlab.com:27853/support_group_dev", { useNewUrlParser: true });

// Create a dummy admin user with username 'john'
/*var john = new User(
  {
    username: 'john',
    email: 'jack@secret.com',
    role: 'admin',
    parentId: null,
    childId: null,
    profileId: null,
  }
);
let tom = new User({
    username: 'tom',
    email: 'tom@secret.com',
    role: 'child',
    parentId: null,
    childId: null,
    profileId: null,
})

let mike = new User({
  username: 'mike',
  email: 'mike@secret.com',
  role: 'child',
  parentId: null,
  childId: null,
  profileId: null,
})

let ray = new User({
  username: 'ray',
  email: 'ray@secret.com',
  role: 'child',
  parentId: null,
  childId: null,
  profileId: null,
})

let kim = new User({
  username: 'kim',
  email: 'kim@secret.com',
  role: 'child',
  parentId: null,
  childId: null,
  profileId: null,
})

let katie = new User({
  username: 'katie',
  email: 'katie@secret.com',
  role: 'child',
  parentId: null,
  childId: null,
  profileId: null,
})*/


//Register john with password 'secret'
/*User.register(john, 'secret', function(err) {
  if (err) {
    console.log('error while user register!', err);

  } else {
    console.log('user registered!');
  }
});*/

/*
User.register(tom, 'secret', function(err) {
  if (err) {
    console.log('error while user register!', err);

  } else {
    console.log('user registered!');
  }
});

User.register(mike, 'secret', function(err) {
  if (err) {
    console.log('error while user register!', err);

  } else {
    console.log('user registered!');
  }
});
User.register(ray, 'secret', function(err) {
  if (err) {
    console.log('error while user register!', err);

  } else {
    console.log('user registered!');
  }
});
User.register(kim, 'secret', function(err) {
  if (err) {
    console.log('error while user register!', err);

  } else {
    console.log('user registered!');
  }
});
User.register(katie, 'secret', function(err) {
  if (err) {
    console.log('error while user register!', err);

  } else {
    console.log('user registered!');
  }
});
*/


require('./routes')(app);

app.listen(app.get('port'), function(){
  console.log("Express Server Listening on Port " + app.get('port'))
});