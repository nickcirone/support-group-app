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

var makeName = require('./helpers/nameGen.js');

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
var parentOneId = mongoose.Types.ObjectId();
var userTwoId = mongoose.Types.ObjectId();
var parentTwoId = mongoose.Types.ObjectId();
var userThreeId = mongoose.Types.ObjectId();
var parentThreeId = mongoose.Types.ObjectId();
var userFourId = mongoose.Types.ObjectId();
var parentFourId = mongoose.Types.ObjectId();
var userFiveId = mongoose.Types.ObjectId();
var parentFiveId = mongoose.Types.ObjectId();
var userSixId = mongoose.Types.ObjectId();
var parentSixId = mongoose.Types.ObjectId();
var userSevenId = mongoose.Types.ObjectId();
var parentSevenId = mongoose.Types.ObjectId();
var userEightId = mongoose.Types.ObjectId();
var parentEightId = mongoose.Types.ObjectId();
var userNineId = mongoose.Types.ObjectId();
var pNineId = mongoose.Types.ObjectId();
var userTenId = mongoose.Types.ObjectId();
var parentTenId = mongoose.Types.ObjectId();

// Helper functions for registering Users 
var registerUser = require('./helpers/registerUser');
var registerProfile = require('./helpers/registerProfile');

// Dummy Profiles

var profileOne = new Profile(
  {
    _id: profileOneId,
    avatar: 'apple.png',
    birthdate: new Date(2003, 2, 14),
    genderId: 'male',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['sports', 'cooking', 'video games'],
    services: ['Burns'],
    friendIds: [],
    matchIds: [],
    sentPendingFriendIds: [userEightId],
    recvPendingFriendIds: [userNineId, userTenId],
  }
);

var profileTwo = new Profile(
  {
    _id: profileTwoId,
    avatar: 'banana.png',
    birthdate: new Date(2003, 4, 28),
    genderId: 'female',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['sports'],
    services: ['Surgery'],
    friendIds: [userSixId],
    matchIds: [],
    sentPendingFriendIds: [userNineId, userSevenId],
    recvPendingFriendIds:[userTenId],
  }
);

var profileThree = new Profile(
  {
    _id: profileThreeId,
    avatar: 'coconut.png',
    birthdate: new Date(2003, 3, 29),
    genderId: 'female',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['sports'],
    services: ['GI'],
    friendIds: [userFourId],
    matchIds: [],
    sentPendingFriendIds: [],
    recvPendingFriendIds: [userSixId],
  }
);

var profileFour = new Profile(
  {
    _id: profileFourId,
    avatar: 'car.jpg',
    birthdate: new Date(2003, 2, 14),
    genderId: 'male',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['fishing'],
    services: ['Cardiology'],
    friendIds: [userEightId],
    matchIds: [],
    sentPendingFriendIds: [],
    recvPendingFriendIds: [userSixId],
  }
);

var profileFive = new Profile(
  {
    _id: profileFiveId,
    avatar: 'dog.png',
    birthdate: new Date(2003, 7, 14),
    genderId: 'female',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['fishing'],
    services: ['Neurosurgery'],
    friendIds: [userEightId],
  }
);
var profileSix = new Profile(
  {
    _id: profileSixId,
    avatar: 'motorcycle.png',
    birthdate: new Date(2002, 11, 20),
    genderId: 'female',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['fishing'],
    services: ['Neurosurgery'],
    friendIds: [userEightId,],
    matchIds: [],
    sentPendingFriendIds: [userFiveId],
  }
);

var profileSeven = new Profile(
  {
    _id: profileSevenId,
    avatar: 'cat.png',
    birthdate: new Date(2002, 12, 15),
    genderId: 'female',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['sports'],
    services: ['Neurosurgery'],
    friendIds: [],
    matchIds: [],
    sentPendingFriendIds: [userFiveId],
  }
);

var profileEight = new Profile(
  {
    _id: profileEightId,
    avatar: 'pear.png',
    birthdate: new Date(2003, 2, 15),
    genderId: 'female',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['sports'],
    services: ['Neurosurgery'],
    friendIds: [],
    matchIds: [],
    sentPendingFriendIds: [userNineId],
  }
);

var profileNine = new Profile(
  {
    _id: profileNineId,
    avatar: 'cupcake.jpg',
    birthdate: new Date(2004, 1, 15),
    genderId: 'female',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['sports'],
    services: ['Neurosurgery'],
    friendIds: [],
    matchIds: [],
    sentPendingFriendIds: [userFiveId],
  }
);

var profileTen = new Profile(
  {
    _id: profileTenId,
    avatar: 'peach.png',
    birthdate: new Date(2004, 2, 15),
    genderId: 'female',
    bio: 'placeholder bio! thanks 4 reading',
    interests: ['sports'],
    services: ['Neurosurgery'],
    friendIds: [userSevenId],
    matchIds: [],
    sentPendingFriendIds: [userNineId],
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
    parentId: parentOneId,
  }
);

var parent_one = new User(
  {
    _id: parentOneId,
    username: 'parent one',
    email: 'parentone@email.com',
    role: 'parent',
    profileId: profileOneId,
    childId: userOneId,
  }
);

var banana_two = new User(
  {
    _id: userTwoId,
    username: 'banana two',
    email: 'banana@email.com',
    role: 'patient',
    profileId: profileTwoId,
    parentId: parentTwoId,
  }
);

var parent_two = new User(
  {
    _id: parentTwoId,
    username: 'parent two',
    email: 'parenttwo@email.com',
    role: 'parent',
    profileId: profileTwoId,
    childId: userTwoId,
  }
);

var coconut_three = new User(
  {
    _id: userThreeId,
    username: 'coconut three',
    email: 'coconut@email.com',
    role: 'patient',
    profileId: profileThreeId,
    parentId: parentThreeId,
  }
);

var parent_three = new User(
  {
    _id: parentThreeId,
    username: 'parent three',
    email: 'parentthree@email.com',
    role: 'parent',
    profileId: profileThreeId,
    childId: userThreeId,
  }
);

var durian_four = new User(
  {
    _id: userFourId,
    username: 'durian four',
    email: 'durian@email.com',
    role: 'patient',
    profileId: profileFourId,
    parentId: parentFourId,
  }
);

var parent_four = new User(
  {
    _id: parentFourId,
    username: 'parent four',
    email: 'parentfour@email.com',
    role: 'parent',
    profileId: profileFourId,
    childId: userFourId,
  }
);

var endive_five = new User(
  {
    _id: userFiveId,
    username: 'endive five',
    email: 'endive@email.com',
    role: 'patient',
    profileId: profileFiveId,
    parentId: parentFiveId,
  }
);

var parent_five = new User(
  {
    _id: parentFiveId,
    username: 'parent five',
    email: 'parentfive@email.com',
    role: 'parent',
    profileId: profileFiveId,
    childId: userFiveId,
  }
);

var mango_six = new User(
  {
    _id: userSixId,
    username: 'mango six',
    email: 'mango@email.com',
    role: 'patient',
    profileId: profileSixId,
    parentId: parentSixId,
  }
);

var parent_six = new User(
  {
    _id: parentSixId,
    username: 'parent six',
    email: 'parentsix@email.com',
    role: 'parent',
    profileId: profileSixId,
    childId: userSixId,
  }
);

var banana_seven = new User(
  {
    _id: userSevenId,
    username: 'banana seven',
    email: 'banana@email.com',
    role: 'patient',
    profileId: profileSevenId,
    parentId: parentSevenId,
  }
);

var parent_seven = new User(
  {
    _id: parentSevenId,
    username: 'parent seven',
    email: 'parentseven@email.com',
    role: 'parent',
    profileId: profileSevenId,
    childId: userSevenId,
  }
);

var pear_eight = new User(
  {
    _id: userEightId,
    username: 'pear eight',
    email: 'pear@email.com',
    role: 'patient',
    profileId: profileEightId,
    parentId: parentEightId,
  }
);

var parent_eight = new User(
  {
    _id: parentEightId,
    username: 'parent eight',
    email: 'parenteight@email.com',
    role: 'parent',
    profileId: profileEightId,
    childId: userEightId,
  }
);

var tomato_nine = new User(
  {
    _id: userNineId,
    username: 'tomato nine',
    email: 'tomato@email.com',
    role: 'patient',
    profileId: profileNineId,
    parentId: parentNineId,
  }
);

var parent_nine = new User(
  {
    _id: parentNineId,
    username: 'parent nine',
    email: 'parentnine@email.com',
    role: 'parent',
    profileId: profileNineId,
    childId: userNineId,
  }
);

var peach_ten = new User(
  {
    _id: userTenId,
    username: 'peach ten',
    email: 'peach@email.com',
    role: 'patient',
    profileId: profileTenId,
    parentId: parentTenId,
  }
);

var parent_ten = new User(
  {
    _id: parentTenId,
    username: 'parent ten',
    email: 'parentten@email.com',
    role: 'parent',
    profileId: profileTenId,
    childId: userTenId,
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
registerUser(parent_one, 'parent_one');
registerUser(banana_two, 'banana_two');
registerUser(parent_two, 'parent_two');
registerUser(coconut_three, 'coconut_three');
registerUser(parent_three, 'parent_three');
registerUser(durian_four, 'durian_four');
registerUser(parent_four, 'parent_four');
registerUser(endive_five, 'endive_five');
registerUser(parent_five, 'parent_five');
registerUser(mango_six, 'mango_six');
registerUser(parent_six, 'parent_six');
registerUser(banana_seven, 'banana_seven');
registerUser(parent_seven, 'parent_seven');
registerUser(pear_eight, 'pear_eight');
registerUser(parent_eight, 'parent_eight');
registerUser(tomato_nine, 'tomato_nine');
registerUser(parent_nine, 'parent_nine');
registerUser(peach_ten, 'peach_ten');
registerUser(parent_ten, 'parent_ten');

registerUser(admin, 'admin');
*/

require('./routes')(app);

app.listen(app.get('port'), function(){
  console.log("Express Server Listening on Port " + app.get('port'))
});
