module.exports = function (user, pass) {
    User.register(user, pass, function(err) {
      if (err) {
        console.log('error while registering user: ' + user.username, err);
      } else {
        console.log('user ' + user.username + ' registered!');
      }
    });
}