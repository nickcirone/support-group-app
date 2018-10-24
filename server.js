var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Create a new Express application.
var app = express();
app.set('port', process.env.PORT || 3001);

// Configure view engine to render EJS templates.
//app.engine('html',cons.swig)
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
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
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to mongo !!!! USES MY mLAB info, so replace URI with your own development db. 
//mongoose.connect("mongodb://ncirone:nRsoQloNthstY1@ds227853.mlab.com:27853/support_group_dev", { useNewUrlParser: true });
mongoose.connect("mongodb://admin:admin1@ds125673.mlab.com:25673/support-app-test", { useNewUrlParser: true });

// Randomly generate ObjectIds for Profiles
var profileOneId = mongoose.Types.ObjectId();
var profileTwoId = mongoose.Types.ObjectId();
var profileThreeId = mongoose.Types.ObjectId();
var profileFourId = mongoose.Types.ObjectId();
var profileFiveId = mongoose.Types.ObjectId();
// Randomly generate ObjectIds for Users
var userOneId = mongoose.Types.ObjectId();
var userTwoId = mongoose.Types.ObjectId();
var userThreeId = mongoose.Types.ObjectId();
var userFourId = mongoose.Types.ObjectId();
var userFiveId = mongoose.Types.ObjectId();

// Helper function for registering Users 
function registerUser(user, pass) {
  User.register(user, pass, function(err) {
    if (err) {
      console.log('error while user ' + user.username + ' register!', err);
    } else {
      console.log('user ' + user.username + ' registered!');
    }
  });
}

function registerProfile(profile) {
  profile.save(function(err, newProfile) {
    if (err) {
      console.log('Error saving profile');
    } else {
      console.log('profile saved');
    }
  })
}

// Dummy Profiles

var profileOne = new Profile(
  {
    _id: profileOneId,
    age: 13,
    genderId: 'male',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['sports', 'cooking', 'video games'],
    services: ['Burns'],
    friendIds: [userTwoId],
    matchIds: [userThreeId, userFourId],
    sentPendingFriendIds: [userFiveId],
  }
);

var profileTwo = new Profile(
  {
    _id: profileTwoId,
    age: 12,
    genderId: 'female',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['sports'],
    services: ['Surgery'],
    friendIds: [userOneId, userThreeId, userFourId],
    matchIds: [userFiveId],
  }
);

var profileThree = new Profile(
  {
    _id: profileThreeId,
    age: 14,
    genderId: 'female',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['sports'],
    services: ['GI'],
    friendIds: [userTwoId, userFourId],
    matchIds: [userThreeId],
    sentPendingFriendIds: [userFiveId],
    recvPendingFriendIds: [userOneId],
  }
);

var profileFour = new Profile(
  {
    _id: profileFourId,
    age: 13,
    genderId: 'male',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['fishing'],
    services: ['Cardiology'],
    friendIds: [userOneId, userTwoId, userThreeId, userFourId],
  }
);

var profileFive = new Profile(
  {
    _id: profileFiveId,
    age: 11,
    genderId: 'female',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['fishing'],
    services: ['Neurosurgery'],
    friendIds: [userFourId],
  }
);

// Dummy Users
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

var apple_one = new User(
  {
    _id: userOneId,
    username: 'apple one',
    email: 'apple@email.com',
    role: 'patient',
    profileId: profileOneId,
  }
);

var banana_two = new User(
  {
    _id: userTwoId,
    username: 'banana two',
    email: 'banana@email.com',
    role: 'patient',
    profileId: profileTwoId,
  }
);

var coconut_three = new User(
  {
    _id: userThreeId,
    username: 'coconut three',
    email: 'coconut@email.com',
    role: 'patient',
    profileId: profileThreeId,
  }
);

var durian_four = new User(
  {
    _id: userFourId,
    username: 'durian four',
    email: 'durian@email.com',
    role: 'patient',
    profileId: profileFourId,
  }
);

var endive_five = new User(
  {
    _id: userFiveId,
    username: 'endive five',
    email: 'endive@email.com',
    role: 'patient',
    profileId: profileFiveId,
  }
);

// Save dummy profiles to Mongo
// registerProfile(profileOne);
// registerProfile(profileTwo);
// registerProfile(profileThree);
// registerProfile(profileFour);
// registerProfile(profileFive);
// Register users in Mongo
// registerUser(apple_one, 'apple_one');
// registerUser(banana_two, 'banana_two');
// registerUser(coconut_three, 'coconut_three');
// registerUser(durian_four, 'durian_four');
// registerUser(endive_five, 'endive_five');


require('./routes')(app);

app.listen(app.get('port'), function(){
  console.log("Express Server Listening on Port " + app.get('port'))
});
