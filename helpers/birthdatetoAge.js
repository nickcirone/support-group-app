var Profile = require('../models/profile.js');

module.exports = function(profile) {
  if (profile.birthdate === null) {
    profile.birthdate = new Date(2003, 4, 28);
  }
  function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}
  profile.age = calculate_age(profile.birthdate);
  profile.save(function(err) {
    if (err) {
      console.log('error changing age of profile');
    }
  });
}
