var passport = require('passport');
var User = require('./models/users');
var Profile = require('./models/profile');

let newUser = new User({
    username: 'cheesyPizza',
    passord: 'pass',
    email:'c@live.edu',
    role: 'child',
    //profileID: 
})
// let newProfile = new Profile({
//     //age should be birthday
//     age: "14",
//     ageHidden: false,
//     devAge: 14,
//     devAgeHidden: true,
//     genderId: "Male",
//     genderHidden: false,
//     friendIds: {type: [ObjectId], required: false},
//     sentPendingFriendIds: {type: [ObjectId], required: false},
//     recvPendingFriendIds: {type: [ObjectId], required: false},
// })



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

    // matches route
    app.get('matches',function(req,res){
        // User.findById('5bbd55ca065bd921e86392ef',function(err,user){
        //     //res.send(product)
        //     //console.log(user.name)
        //     res.render('matches',{user:user})
        //   })
    })

    app.get('/profile',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res){
            res.render('profile', { user: req.user });
    });

};