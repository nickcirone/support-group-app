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
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to mongo !!!! USES MY (Nick's) mLAB info, so replace URI with your own development db. 
//mongoose.connect("mongodb://ncirone:nRsoQloNthstY1@ds227853.mlab.com:27853/support_group_dev", { useNewUrlParser: true });
mongoose.connect("mongodb://admin:admin1@ds125673.mlab.com:25673/support-app-test", { useNewUrlParser: true });

var makeName = require('./helpers/nameGen.js');

console.log(makeName());
console.log(makeName());

// Randomly generate ObjectIds for Profiles
var profileOneId = mongoose.Types.ObjectId();
var profileTwoId = mongoose.Types.ObjectId();
var profileThreeId = mongoose.Types.ObjectId();
var profileFourId = mongoose.Types.ObjectId();
var profileFiveId = mongoose.Types.ObjectId();
var profileSixId = mongoose.Types.ObjectId();
var profileSevenId = mongoose.Types.ObjectId();
var profileEightId = mongoose.Types.ObjectId();
var profileNineId = mongoose.Types.ObjectId();
var profileTenId = mongoose.Types.ObjectId();

// Randomly generate ObjectIds for Users
var userOneId = mongoose.Types.ObjectId();
var userTwoId = mongoose.Types.ObjectId();
var userThreeId = mongoose.Types.ObjectId();
var userFourId = mongoose.Types.ObjectId();
var userFiveId = mongoose.Types.ObjectId();
var userSixId = mongoose.Types.ObjectId();
var userSevenId = mongoose.Types.ObjectId();
var userEightId = mongoose.Types.ObjectId();
var userNineId = mongoose.Types.ObjectId();
var userTenId = mongoose.Types.ObjectId();
// Helper function for registering Users 
function registerUser(user, pass) {
  User.register(user, pass, function(err) {
    if (err) {
      console.log('error while registering user: ' + user.username, err);
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
    avatar: 'apple_one.jpg',
    age: 9,
    genderId: 'male',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['sports', 'cooking', 'video games'],
    services: ['Burns'],
    friendIds: [],
    matchIds: [userThreeId, userFourId,userSixId, userSevenId],
    sentPendingFriendIds: [userFiveId, userEightId, userTwoId],
    recvPendingFriendIds: [userNineId, userTenId],
  }
);

var profileTwo = new Profile(
  {
    _id: profileTwoId,
    avatar: 'banana_two.jpg',
    age: 10,
    genderId: 'female',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['sports'],
    services: ['Surgery'],
    friendIds: [userFiveId],
    matchIds: [userOneId],
    sentPendingFriendIds: [userThreeId, userFourId, userEightId, userNineId, userSevenId, userTenId, userSixId],
    
  }
);

var profileThree = new Profile(
  {
    _id: profileThreeId,
    avatar: 'cake.png',
    age: 11,
    genderId: 'female',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['sports'],
    services: ['GI'],
    friendIds: [userTwoId, userFourId],
    matchIds: [userEightId],
    sentPendingFriendIds: [userFiveId],
    recvPendingFriendIds: [userSixId],
  }
);

var profileFour = new Profile(
  {
    _id: profileFourId,
    avatar: 'circus.png',
    age: 12,
    genderId: 'male',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['fishing'],
    services: ['Cardiology'],
    friendIds: [userTwoId, userThreeId],
    matchIds: [userSevenId],
    sentPendingFriendIds: [userFiveId],
    recvPendingFriendIds: [userSixId],
  }
);

var profileFive = new Profile(
  {
    _id: profileFiveId,
    avatar: 'game.png',
    age: 13,
    genderId: 'female',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['fishing'],
    services: ['Neurosurgery'],
    friendIds: [userFourId],
  }
);
var profileSix = new Profile(
  {
    _id: profileSixId,
    avatar: 'safe.png',
    age: 14,
    genderId: 'female',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['fishing'],
    services: ['Neurosurgery'],
    friendIds: [userTwoId],
    matchIds: [userThreeId, userFourId, userSevenId],
    sentPendingFriendIds: [userFiveId],
  }
);

var profileSeven = new Profile(
  {
    _id: profileSevenId,
    avatar: 'submarine.png',
    age: 15,
    genderId: 'female',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['sports'],
    services: ['Neurosurgery'],
    friendIds: [userTwoId],
    matchIds: [userThreeId, userSixId],
    sentPendingFriendIds: [userFiveId],
  }
);

var profileEight = new Profile(
  {
    _id: profileEightId,
    avatar: 'pear.png',
    age: 16,
    genderId: 'female',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['sports'],
    services: ['Neurosurgery'],
    friendIds: [userTwoId],
    matchIds: [userThreeId, userSixId],
    sentPendingFriendIds: [userFiveId],
  }
);

var profileNine = new Profile(
  {
    _id: profileNineId,
    avatar: 'tomato.png',
    age: 17,
    genderId: 'female',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['sports'],
    services: ['Neurosurgery'],
    friendIds: [userTwoId],
    matchIds: [userThreeId, userSixId],
    sentPendingFriendIds: [userFiveId],
  }
);

var profileTen = new Profile(
  {
    _id: profileTenId,
    avatar: 'peach.png',
    age: 17,
    genderId: 'female',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['sports'],
    services: ['Neurosurgery'],
    friendIds: [userSevenId],
    matchIds: [userEightId, userNineId],
    sentPendingFriendIds: [userFiveId],
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

var mango_six = new User(
  {
    _id: userSixId,
    username: 'mango six',
    email: 'mango@email.com',
    role: 'patient',
    profileId: profileSixId,
  }
);

var banana_seven = new User(
  {
    _id: userSevenId,
    username: 'banana seven',
    email: 'banana@email.com',
    role: 'patient',
    profileId: profileSevenId,
  }
);

var pear_eight = new User(
  {
    _id: userEightId,
    username: 'pear eight',
    email: 'pear@email.com',
    role: 'patient',
    profileId: profileEightId,
  }
);

var tomato_nine = new User(
  {
    _id: userNineId,
    username: 'tomato nine',
    email: 'tomato@email.com',
    role: 'patient',
    profileId: profileNineId,
  }
);

var peach_ten = new User(
  {
    _id: userTenId,
    username: 'peach ten',
    email: 'peach@email.com',
    role: 'patient',
    profileId: profileTenId,
  }
);


/*
// Save dummy profiles to Mongo
registerProfile(profileOne);
registerProfile(profileTwo);
registerProfile(profileThree);
registerProfile(profileFour);
registerProfile(profileFive);
registerProfile(profileSix);
registerProfile(profileSeven);
registerProfile(profileEight);
registerProfile(profileNine);
registerProfile(profileTen);
// Register users in Mongo
registerUser(apple_one, 'apple_one');
registerUser(banana_two, 'banana_two');
registerUser(coconut_three, 'coconut_three');
registerUser(durian_four, 'durian_four');
registerUser(endive_five, 'endive_five');
registerUser(mango_six, 'mango_six');
registerUser(banana_seven, 'banana_seven');
registerUser(pear_eight, 'pear_eight');
registerUser(tomato_nine, 'tomato_nine');
registerUser(peach_ten, 'peach_ten');
*/

require('./routes')(app);

app.listen(app.get('port'), function(){
  console.log("Express Server Listening on Port " + app.get('port'))
});
