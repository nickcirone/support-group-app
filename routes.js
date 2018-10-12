var passport = require('passport');
var User = require('./models/users');
var Profile = require('./models/profile');

//profile 
let johnProfile = new Profile({
    //age should be birthday
    age: "14",
    ageHidden: false,
    devAge: 14,
    devAgeHidden: true,
    genderId: "Male",
    genderHidden: false,
    friendIds: ["5bc002e43b04853024ca66aa"],
    sentPendingFriendIds: ["5bc002e43b04853024ca66ab","5bc002e43b04853024ca66ae"],
    recvPendingFriendIds: ["5bc002e43b04853024ca66ac","5bc002e43b04853024ca66ad"],
})

johnProfile.save(function(err){
    if (err){
        return console.log(err)
    }
    return console.log("Profile added")
})






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
            console.log("made it here!");
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

    // matches route
    app.get('/matches',require('connect-ensure-login').ensureLoggedIn(), function(req,res){
        Profile.findById('5bbfff70e72be4286090bc83',function(err,profile){
            res.render('matches',{profile:profile})
          })
        
    })

    app.get('/profile',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res){
            res.render('profile', { user: req.user });
    });

};