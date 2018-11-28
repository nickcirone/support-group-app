var passport = require('passport');
const nodemailer = require('nodemailer');
var mongoose = require('mongoose');
var User = require('./models/users');
var Profile = require('./models/profile');
var Picture = require('./models/picture');
var registerUser = require('./helpers/registerUser');
var registerProfile = require('./helpers/registerProfile');
var nameGen = require('./helpers/nameGen');
var passGen = require('./helpers/passGen');
var poolConfig = { service: 'gmail', auth: { user: 'catdoge484848@gmail.com', pass: 'uncuncunc7#' }};
var transporter = nodemailer.createTransport(poolConfig);
var multer = require('multer');
var path = require('path');

var picArray = [];

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: __dirname + '/views/img/portfolio',
    filename: function(req, file, cb){
      cb(null,file.originalname);
    }
  });

// Init Upload - file size in bytes 1MB max
const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('myImage');
  
// Check File Type
async function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    //check if name is duplicated
    var array = await Picture.find({});
    var namesArray = array[0].names;

    if (namesArray.includes(file.originalname)){
        cb('Image name is already used. Please rename or select another image.');
    }else{
        //check file type
        if(mimetype && extname){
            return cb(null,true);
          } else {
            cb('Please submit images files Only!');
          }
    }
  }

function checkServices(body) {
    var newServices = [];
    if (body.Surgery) {
        newServices.push(body.Surgery);
    }
    if (body.Neurology) {
        newServices.push(body.Neurology);
    }
    if (body.ENTSurgery) {
        newServices.push(body.ENTSurgery);
    }
    if (body.OrthopedicSurgery) {
        newServices.push(body.OrthopedicSurgery);
    }
    if (body.CardiothoracicSurgery) {
        newServices.push(body.CardiothoracicSurgery);
    }
    if (body.UrologySurgery) {
        newServices.push(body.UrologySurgery);
    }
    if (body.Burns) {
        newServices.push(body.Burns);
    }
    if (body.GeneralMedicine) {
        newServices.push(body.GeneralMedicine);
    }
    if (body.Cardiology) {
        newServices.push(body.Cardiology);
    }
    if (body.Endocrinology) {
        newServices.push(body.Endocrinology);
    }
    if (body.GI) {
        newServices.push(body.GI);
    }
    if (body.HematologyOncology) {
        newServices.push(body.HematologyOncology);
    }
    if (body.Nephrology) {
        newServices.push(body.Nephrology);
    }
    if (body.Pulmonology) {
        newServices.push(body.Pulmonology);
    }
    if (body.BoneMarrowTransplant) {
        newServices.push(body.BoneMarrowTransplant);
    }
    return newServices;
}

function checkInterests(body) {
    var newInterests = [];
    if (body.videoGames) {
        newInterests.push(body.videoGames);
    }
    if (body.cooking) {
        newInterests.push(body.cooking);
    }
    if (body.artsCrafts) {
        newInterests.push(body.artsCrafts);
    }
    if (body.legos) {
        newInterests.push(body.legos);
    }
    if (body.building) {
        newInterests.push(body.building);
    }
    if (body.writing) {
        newInterests.push(body.writing);
    }
    if (body.reading) {
        newInterests.push(body.reading);
    }
    if (body.tv) {
        newInterests.push(body.tv);
    }
    if (body.movies) {
        newInterests.push(body.movies);
    }
    if (body.boardCardGames) {
        newInterests.push(body.boardCardGames);
    }
    if (body.sports) {
        newInterests.push(body.sports);
    }
    if (body.swimming) {
        newInterests.push(body.swimming);
    }
    if (body.boating) {
        newInterests.push(body.boating);
    }
    if (body.fishing) {
        newInterests.push(body.fishing);
    }
    return newInterests;
}

module.exports = function(app) {
    // homepage route (after logging in)

    app.get('/',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res) {
            if (req.user.role === 'admin') {
                res.redirect('/admin');
            } else {
                res.render('home', { user: req.user });
            }
    });

    // admin routes

    app.get('/admin',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res){
            if (req.user.role !== 'admin') {
                console.log('Not an administrator.');
                res.redirect('/');
            } else {
                res.render('admin', {user: req.user});
            }
    });

    app.get('/createUser',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res) {
            if (req.user.role !== 'admin') {
                console.log('Not an administrator.');
                res.redirect('/');
            } else {
                res.render('createUser', {user: req.user});
            }
    });
    app.get('/addPicture',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res) {
            if (req.user.role !== 'admin') {
                console.log('Not an administrator.');
                res.redirect('/');
            } else {
                res.render('addPicture', {user: req.user});
            }
    });

    app.post('/addPicture*',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res) {
            if (req.user.role !== 'admin') {
                console.log('Not an administrator.');
                res.redirect('/');
            } else {
                upload(req,res, async function(err){
                    var succsess = false;
                    if(err){
                        console.log(err);
                        // msg2 ="ex) .jpg .jpeg .png";
                        res.render('addPictureMsg',{msg:err,succsess:succsess})
                    }else{
                        if(req.file == undefined){
                            console.log("undefinded in post")
                            res.render('addPictureMsg',{msg:"File is Undefined",succsess:succsess})
                        }else{
                            var array = await Picture.find({});
                            var namesArray = array[0].names;
                            console.log(array)
                            console.log("------------------")
                            console.log(namesArray)
                            
                            namesArray.push(req.file.originalname);
                            //5bfde974fe11f2057ce72a6e
                            await Picture.updateOne({_id:"5bfde974fe11f2057ce72a6e"},{$set:{names:namesArray}},(err)=>{
                                if (err){console.log(err)}
                            })
                            //check it name is already used in db
                            console.log(req.file.originalname);
                            res.render('addPictureMsg',{msg:"Image Successfully Uploaded", succsess: true});
                        }
                    }
                })                 
            }
    });
    app.post('/createUser',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res) {
            if (req.user.role !== 'admin') {
                console.log('Not an administrator.');
                res.redirect('/');
            } else {
                if (!req.body.pEmail || !req.body.cEmail) {
                    console.log('Email is required');
                    res.render('createUser', {user: req.user});
                } else {
                    var patientProfileId = mongoose.Types.ObjectId();
                    var parentName = nameGen();
                    var patientName = nameGen();
                    var parentPass = passGen();
                    var patientPass = passGen();
                    var servicesArr = checkServices(req.body);
                    var patientProfile = new Profile(
                        {
                        _id: patientProfileId,
                        avatar: 'apple_one.jpg',
                        birthdate: req.body.birthdate,
                        services: servicesArr,
                        }
                    );
                    var parentUser = new User(
                        {
                        _id: mongoose.Types.ObjectId(),
                        username: parentName,
                        email: req.body.pEmail,
                        role: 'parent',
                        profileId: patientProfileId,
                        }
                    );
                    var patientUser = new User(
                        {
                        _id: mongoose.Types.ObjectId(),
                        username: patientName,
                        email: req.body.cEmail,
                        role: 'patient',
                        profileId: patientProfileId,
                        }
                    );
                    registerProfile(patientProfile);
                    registerUser(parentUser, parentPass);
                    registerUser(patientUser, patientPass);
                    var parentMessage = {
                        from: 'catdoge484848@gmail.com',
                        to: req.body.pEmail,
                        subject: 'Parent Account Info',
                        html: '<h3>Thank you for signing up!</h3><br><p>Your username is: ' + parentName + '. Your password is: ' + parentPass + '</p>'
                    };
                    var patientMessage = {
                        from: 'catdoge484848@gmail.com',
                        to: req.body.cEmail,
                        subject: 'Patient Account Info',
                        html: '<h3>Thank you for signing up!</h3><br><p>Your username is: ' + patientName + '. Your password is: ' + patientPass + '</p>',
                    };
                    transporter.sendMail(parentMessage);
                    transporter.sendMail(patientMessage);
                    /*
                    console.log('Parent User Created: ');
                    console.log('username: ' + parentName);
                    console.log('password: ' + parentPass);
                    console.log('Patient User Created: ');
                    console.log('username: ' + patientName);
                    console.log('password: ' + patientPass);
                    */
                    res.render('createSuccess', { parentName: parentName, patientName: patientName });
                }
            }
    });

    // login routes

    app.get('/login',
        function(req, res) {
            res.render('login');
    });

    app.get('/loginFail',
        function(req, res) {
            res.render('loginFail');
        }
    )

    app.post('/login',
        passport.authenticate('local', { failureRedirect: '/loginFail' }),
        function(req, res) {
            if (req.user.role === 'admin') {
                res.redirect('/admin');
            } else {
                res.redirect('/');
            }
    });

    // logout route

    app.get('/logout',
        function(req, res){
            req.logout();
            res.redirect('/');
    });

    // profile route

    app.get('/profile',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res){
            if (req.user.role === 'patient' || req.user.role === 'parent') {
                if (req.user.profileId !== null) {
                    var profile;
                    Profile.findById(req.user.profileId, function (err, currentProfile) {
                        if (err) {
                            console.log('error finding profile');
                        } else {
                            var friends = [];
                            profile = currentProfile;
                            User.find({
                                '_id': { $in: profile.friendIds }
                            }, function(err, users) {
                                friends = users;
                                var FIDs = friends.map((account)=>{return account.profileId});
                                var friendProfiles;
                                Profile.find({
                                    '_id': { $in: FIDs }
                                }, function(err, friend_profiles) {
                                    friendProfiles = friend_profiles
                                res.render('profile', { user: req.user, profile: profile, friends: friends, friendProfiles: friendProfiles });
                                });
                            });
                        }
                    });
                } else {
                    console.log('Profile not found.');
                    res.redirect('/');
                }
            } else {
                console.log("Not a user or a parent");
                res.redirect('/');
            }
    });

    // profile edit routes

    app.get('/profileEdit',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res) {
            if (req.user.role === 'patient') {
                if (req.user.profileId !== null) {
                    var profile;
                    Profile.findById(req.user.profileId, function (err, currentProfile) {
                        if (err) {
                            console.log('error finding profile');
                        } else {
                            var friends = [];
                            profile = currentProfile;
                            User.find({
                                '_id': { $in: profile.friendIds }
                            }, function(err, users) {
                                friends = users;
                                res.render('profileEdit', { user: req.user, profile: profile, friends: friends });
                            });
                        }
                    });
                } else {
                    console.log('Profile not found.');
                    res.redirect('/');
                }
            } else {
                console.log("Not a patient");
                res.redirect('/');
            }
        }
    );

    app.post('/profileEdit',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res) {
            if (req.user.role === 'patient') {
                Profile.findById(req.user.profileId, function (err, profile) {
                    if (err) {
                        console.log('Error finding profile to update.');
                        res.redirect('/profile');
                    } else {
                        var servicesArr = checkServices(req.body);
                        var interestsArr = checkInterests(req.body);
                        profile.set({ avatar: req.body.avatar });
                        profile.set({ birthdate: req.body.birthdate });
                        profile.set({ age: req.body.age });
                        profile.set({ devAge: req.body.devAge });
                        profile.set({ genderId: req.body.genderId });
                        profile.set({ bio: req.body.bio });
                        profile.set({ services: servicesArr });
                        profile.set({ interests: interestsArr});
                        profile.save(function (err) {
                        if (err) {
                            console.log('Error updating profile.')
                            res.redirect('/profile');
                        } else {
                            res.redirect('/profile');
                        }
                        });
                    }

                });
            } else {
                console.log("Not a patient");
                res.redirect('/profile');
            }
        }
    )

    // messaging routes

    app.get('/messages',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res) {
            res.render('messages');
    });

    //matches algorithm

    async function matchingAlgorithm(currentProfile)
    {
      var everyProfile = [];
      var totalCount = 0;
      var myMap = new Map();

      var everyProfile = await Profile.find({'_id': { $nin: currentProfile._id }})
      var userFriends = await User.find({'_id': { $in: currentProfile.friendIds}})
      var userSent = await User.find({'_id': { $in: currentProfile.sentPendingFriendIds}})
      var userRecv = await User.find({'_id': { $in: currentProfile.recvPendingFriendIds}})
      //console.log(userRecv);

      for (var j = 0; j < userFriends.length; j++){
        for (var i = 0; i < everyProfile.length; i++) {
          if (userFriends[j].profileId.equals(everyProfile[i]._id)){
            everyProfile.splice(i, 1);
            //console.log(everyProfile.length);
          }
        }
      }
      for (var j = 0; j < userSent.length; j++){
        for (var i = 0; i < everyProfile.length; i++) {
          if(userSent[j].profileId.equals(everyProfile[i]._id)){
            everyProfile.splice(i, 1);
            //console.log("hi");
          }
        }
      }
      for (var j = 0; j < userRecv.length; j++){
        for (var i = 0; i < everyProfile.length; i++) {
          if(userRecv[j].profileId.equals(everyProfile[i]._id)){
            everyProfile.splice(i, 1);
            //console.log("hi");
          }
        }
      }

     // console.log(everyProfile);
      var myAge = currentProfile.age;
      var agecheck = [];
      age(myAge);
      function age(myAge){

        switch (true) {

            case (myAge >= 10 && myAge <=12):
                agecheck = everyProfile.filter((x)=>{return x.age >= 10 && x.age <=12});
                //console.log("case 1");
            break;
            case myAge >= 13 && myAge <= 15:
                agecheck = everyProfile.filter((x)=>{return x.age >= 13 && x.age <=15});
                //console.log("case 2");
                break;
            case myAge >=16 && myAge <=18:
                agecheck = everyProfile.filter((x)=>{return x.age >= 16 && x.age <=18});
                //console.log("case 3");
                break;
            default:
                //console.log("nothing hitting");
            }
      }
      //console.log(agecheck);

        for (var i = 0; i < agecheck.length; i++) {
          myMap.set(agecheck[i]._id, totalCount);
        }
        for (var x = 0; x < agecheck.length; x++){
          for (var i = 0; i < currentProfile.interests.length; i++) {
            for (var j = 0; j < agecheck[x].interests.length; j++) {
               if (currentProfile.interests[i] == agecheck[x].interests[j]) {
                 var key = myMap.get(agecheck[x]._id);
                 myMap.set(agecheck[x]._id, key + 1);
               }
            }
          }
        }
        for (var x = 0; x < agecheck.length; x++){
          for (var i = 0; i < currentProfile.services.length; i++) {
            for (var j = 0; j < agecheck[x].services.length; j++) {
               if (currentProfile.services[i] == agecheck[x].services[j]) {
                 var key = myMap.get(agecheck[x]._id);
                 myMap.set(agecheck[x]._id, key + 1);
               }
            }
          }
        }
        const mapSort = new Map([...myMap.entries()].sort((a, b) => a[1] - b[1]));

        let keys = Array.from( mapSort.keys() );
        //console.log(mapSort);
        //console.log(keys);
        //console.log(myMap);
        var userMatches=[];

        userMatches = await User.find({'profileId':{ $in: keys}});

       var arr = [userMatches,keys];
       return arr;

    }
    // matches routes

    app.get('/matches',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res) {
            if (req.user.role === 'patient' || req.user.role === 'parent') {
                if (req.user.profileId !== null) {
                    var profile;
                    Profile.findById(req.user.profileId, async function (err, currentProfile) {
                        if (err) {
                            console.log('error finding profile');
                        } else {
                            var matches = [];
                            var matchProfileIds=[];
                            var matchProfiles = [];
                            var matchArray =[];
                            var received = [];
                            var receivedPIds =[];
                            var receivedProfiles=[];
                            var sent = [];
                            var sentPIds = [];
                            var sentProfiles=[];
                            profile = currentProfile;
                            //matchingAlgorithm(currentProfile);
                                matchArray = await matchingAlgorithm(currentProfile);
                                matches = matchArray[0];
                                //console.log(matches)
                                matchProfileIds = matchArray[1];
                                //console.log(matchProfileIds)
                                User.find({
                                    '_id': { $in: profile.sentPendingFriendIds}
                                }, function(err, sentPending) {
                                    sent = sentPending;
                                    sentPIds = sent.map((account)=>{return account.profileId})
                                    User.find({
                                        '_id': { $in: profile.recvPendingFriendIds}
                                    }, function(err, recvPending) {
                                        received = recvPending;
                                        receivedPIds = received.map((account)=>{return account.profileId});
                                        Profile.find({'_id':{$in: matchProfileIds}}, function(err,match_Profiles){
                                            matchProfiles = match_Profiles;
                                            Profile.find({'_id':{$in: receivedPIds}},function(err,recProfiles){
                                                receivedProfiles = recProfiles;
                                                Profile.find({'_id':{$in: sentPIds}},function(err,sent_Profiles){
                                                    sentProfiles = sent_Profiles;
                                                    res.render('matches', { user: req.user, profile: profile, matches: matches,
                                                        sent: sent, received: received, matchProfiles: matchProfiles,
                                                        receivedProfiles: receivedProfiles, sentProfiles: sentProfiles });
                                                });
                                            });
                                        });
                                    });
                                });
                           // });
                        }
                    });
                } else {
                    console.log('Profile not found.');
                    res.redirect('/');
                }
            } else {
                console.log("Not a user or a parent");
                res.redirect('/');
            }
    });

    app.post('/matches',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, response) {
        var selectedUserId = req.body.userId;
        var selectedUserProfile = req.body.userProfileId;

            if(req.body.postType=="match"){
                //matched user is added to logged in users sentPendingFriendsIds

                var removedMatch = [];
                var addsentFriendIds =[];

                var selectedUserRemovedMatch = [];
                var selectedUserRecvPending =[];
                //find user profile
                Profile.findById(req.user.profileId, function (err, currentProfile) {
                    //remove selected user from matches array
                    removedMatch = currentProfile.matchIds.filter((id)=>{return id != selectedUserId});

                    //add selected user to sentPendginFriendsIds array
                    addsentFriendIds = currentProfile.sentPendingFriendIds;
                    addsentFriendIds.push(selectedUserId)

                        //find match profile
                        Profile.findById(selectedUserProfile, function (err, matchProfile) {
                            selectedUserRemovedMatch = matchProfile.matchIds.filter((id)=>{return id != req.user._id});

                            selectedUserRecvPending = matchProfile.recvPendingFriendIds;
                            selectedUserRecvPending.push(req.user._id)

                                //update match db
                                Profile.findOneAndUpdate({_id: selectedUserProfile},{"$set":{matchIds: selectedUserRemovedMatch, recvPendingFriendIds: selectedUserRecvPending}},
                                function(err,res){
                                    if(err){throw err;
                                    }else{ console.log("Recieved match!")};

                                    //update user db
                                    Profile.findOneAndUpdate({_id: req.user.profileId},{"$set":{matchIds: removedMatch, sentPendingFriendIds: addsentFriendIds}},
                                    function(err,res){
                                        if(err){throw err;
                                        }else{ console.log("Sent match request");

                                        var myUser;
                                        User.findById(selectedUserId,function(err, user){
                                            myUser = user;
                                            response.send({matchProfile:matchProfile, myUser:myUser})
                                        })
                                        };
                                    });

                                });


                        });


                });

            }else if(req.body.postType=="accepted"){

                var removedPendingFriend = [];
                var newfriendIds =[];
                var removedAcceptedSentIds = [];
                var acceptedSentFriends = [];
                Profile.findById(req.user.profileId, function (err, currentProfile) {
                    removedPendingFriend = currentProfile.recvPendingFriendIds.filter((id)=>{return id != selectedUserId});
                    newfriendIds = currentProfile.friendIds;
                    newfriendIds.push(selectedUserId);

                    //find friend Profile
                    Profile.findById(selectedUserProfile, function (err, friendProfile) {
                        removedAcceptedSentIds = friendProfile.sentPendingFriendIds;
                        removedAcceptedSentIds.splice(removedAcceptedSentIds.indexOf(req.user._id),1)

                        acceptedSentFriends = friendProfile.friendIds;
                        acceptedSentFriends.push(req.user._id);

                        //update db
                        Profile.findOneAndUpdate({_id: selectedUserProfile},{"$set":{sentPendingFriendIds: removedAcceptedSentIds, friendIds: acceptedSentFriends}},
                        function(err,res){ if(err){throw err;
                        }else{ console.log("Friend Accepted!")};

                            //update db
                            Profile.findOneAndUpdate({_id: req.user.profileId},{"$set":{recvPendingFriendIds: removedPendingFriend, friendIds: newfriendIds}},
                            function(err,res){ if(err){throw err;
                            }else{
                                console.log("Added new Friend!")};
                                response.send({selectedUserProfile:selectedUserProfile})
                            });
                        });
                    });
                });
            }

        });
};
