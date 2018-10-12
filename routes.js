var passport = require('passport');
var User = require('./models/users');
var Profile = require('./models/profile');

async function asyncFindProfileById(id) {
    var currProfile;
    Profile.findById(id, function (err, currentProfile) {
        if (err) {
            console.log('error finding profile');
        } else {
            currProfile = currentProfile;
            return currProfile;
        }
    });
}

async function asyncGetFriend(id) {
    
}

async function asyncGetFriends(iDs) {
    var currFriends = [];
    for (var i = 0; i < iDs.length; i++) {
        User.findById(fIds[i], function(err, currentUser) {
            currFriends[i] = currentUser;
        });
    }   
    return currFriends;
}

module.exports = function(app) {
    app.get('/',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res) {
            res.render('home', { user: req.user });
    });

    app.get('/admin',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res){
            res.render('admin', {user: req.user});
    });

    /*
    app.post('/register', function (req, res) {
        User.register
    });
    */

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
  
    app.get('/logout',
        function(req, res){
            req.logout();
            res.redirect('/');
    });

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

    app.get('/messages',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res) {
            res.render('messages');
    });

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
                            var sent = [];
                            var received = [];
                            profile = currentProfile;
                            User.find({
                                '_id': { $in: profile.matchIds }
                            }, function(err, users) {
                                matches = users;
                                User.find({
                                    '_id': { $in: profile.sentPendingFriendIds}
                                }, function(err, sentPending) {
                                    sent = sentPending;
                                    User.find({
                                        '_id': { $in: profile.recvPendingFriendIds}
                                    }, function(err, recvPending) {
                                        received = recvPending;
                                        res.render('matches', { user: req.user, profile: profile, matches: matches, sent: sent, received: received });
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
};