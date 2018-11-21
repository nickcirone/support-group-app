var Profile = require('../models/profile.js');

module.exports = function (profile) {
    profile.save(function(err, newProfile) {
        if (err) {
          console.log('Error saving profile');
        } else {
          console.log('profile saved');
        }
      })
}