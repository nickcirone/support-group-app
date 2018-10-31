var passport = require('passport');
var User = require('./models/users');
var Profile = require('./models/profile');

module.exports = function(app) {

    // homepage route (after logging in)

    app.get('/',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res) {
            res.render('home', { user: req.user });
    });

    // admin routes

    app.get('/admin',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res){
            res.render('admin', {user: req.user});
    });

    // login routes

    app.get('/login',
        function(req, res) {
            res.render('login');
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
                                res.render('profile', { user: req.user, profile: profile, friends: friends });
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
            
        }
    )

    // messaging routes

    app.get('/messages',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res) {
            res.render('messages');
    });

    // matches routes

    app.get('/matches',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res) {
            if (req.user.role === 'patient' || req.user.role === 'parent') {
                if (req.user.profileId !== null) {
                    var profile;
                    Profile.findById(req.user.profileId, function (err, currentProfile) {
                        if (err) {
                            console.log('error finding profile');
                        } else {
                            var matches = [];
                            var matchProfileIds=[];
                            var matchProfiles = [];
                            var received = [];
                            var receivedPIds =[];
                            var receivedProfiles=[];
                            var sent = [];
                            var sentPIds = [];
                            var sentProfiles=[];
                            profile = currentProfile;
                            User.find({
                                '_id': { $in: profile.matchIds }
                            }, function(err, users) {
                                matches = users;
                                matchProfileIds = matches.map((account)=>{return account.profileId});
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

    app.post('/matches',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res) {
        var selectedUserId = req.body.userId;
        var selectedUserProfile = req.body.userProfileId;

            if(req.body.postType=="match"){
                //matched user is added to logged in users sentPendingFriendsIds
               // var matches=[];
                var removedMatch = [];
                var addsentFriendIds =[];
               // var selectedUserMatches=[];
                var selectedUserRemovedMatch = [];
                var selectedUserRecvPending =[];
                //find user profile
                Profile.findById(req.user.profileId, function (err, currentProfile) {
                    console.log(selectedUserId)
                    console.log(currentProfile.matchIds)
                    //remove selected user from matches array
                    removedMatch = currentProfile.matchIds.filter((id)=>{return id != selectedUserId});
                    console.log(removedMatch)


                    //add selected user to sentPendginFriendsIds array
                    addsentFriendIds = currentProfile.sentPendingFriendIds;
                    addsentFriendIds.push(selectedUserId)

                        //find match profile
                        Profile.findById(selectedUserProfile, function (err, matchProfile) {
                            console.log(req.user._id)
                            console.log(matchProfile.matchIds)
                            selectedUserRemovedMatch = matchProfile.matchIds.filter((id)=>{return id != req.user._id});
                            console.log(selectedUserRemovedMatch)
                            
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
                                        }else{ console.log("Sent match request")};
                                    });

                                });
                        
        
                        });


                });
                
            }else if(req.body.postType=="accepted"){
                
                var removedPendingFriend = [];
                var newfriendIds =[];
                var sentIds=[];
                var removedAcceptedSentIds = [];
                var acceptedSentFriends = [];
                Profile.findById(req.user.profileId, function (err, currentProfile) {//durian four
                    removedPendingFriend = currentProfile.recvPendingFriendIds.filter((id)=>{return id != selectedUserId});
                    newfriendIds = currentProfile.friendIds;
                    newfriendIds.push(selectedUserId);

                    //find friend Profile
                    Profile.findById(selectedUserProfile, function (err, friendProfile) {//apple one
                        console.log(req.user._id);
                        console.log(friendProfile.sentPendingFriendIds);
                        sentIds = friendProfile.sentPendingFriendIds;
                        sentIds.splice(sentIds.indexOf(req.user._id),1)
                        
                        console.log(sentIds);
                        console.log(removedAcceptedSentIds);

                        acceptedSentFriends = friendProfile.friendIds;
                        acceptedSentFriends.push(req.user._id);

                        //update db
                        Profile.findOneAndUpdate({_id: selectedUserProfile},{"$set":{sentPendingFriendIds: sentIds, friendIds: acceptedSentFriends}},
                        function(err,res){ if(err){throw err;
                        }else{ console.log("Friend Accepted!")};
                        
                            //update db
                            Profile.findOneAndUpdate({_id: req.user.profileId},{"$set":{recvPendingFriendIds: removedPendingFriend, friendIds: newfriendIds}},
                            function(err,res){ if(err){throw err;
                            }else{ 
                                console.log("Added new Friend!")};
                            });
                        });
                    });
                });
            }

        });
};