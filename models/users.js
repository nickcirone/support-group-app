<<<<<<< HEAD:db/users.js
const mongoose = require('mongoose')
 
// var records = [
//     { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ], role: 'admin' }
//   , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ], role: 'patient' }
// ];

// exports.findById = function(id, cb) {
//   process.nextTick(function() {
//     var idx = id - 1;
//     if (records[idx]) {
//       cb(null, records[idx]);
//     } else {
//       cb(new Error('User ' + id + ' does not exist'));
//     }
//   });
// }

// exports.findByUsername = function(username, cb) {
//   process.nextTick(function() {
//     for (var i = 0, len = records.length; i < len; i++) {
//       var record = records[i];
//       if (record.username === username) {
//         return cb(null, record);
//       }
//     }
//     return cb(null, null);
//   });

//new stuff
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: {type: String},
  email: {type: String},
  newMatches: [{type:String}],
  pendingMatches: [{type:String}],
});

//var dbconnect = mongoose.connect('mongodb://localhost/passport-tutorial');


module.exports = mongoose.model('User',UserSchema);;


=======
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId,
    passportLocalMongoose = require('passport-local-mongoose');

// Schema for USER
var User = new Schema ({
  email: String,
  role: String,
  parentId: {type: ObjectId, required: false},
  childId: {type: ObjectId, required: false},
  profileId: {type: ObjectId, required: false},
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);

// Connect to DB using URI
//mongoose.connect("mongodb://ncirone:W!!!ngnu+++970@ds143678.mlab.com:43678/support_group_dev");

/*
var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ], role: 'admin' }
  , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ], role: 'patient' }
];

exports.findById = function(id, cb) {
  process.nextTick(function() {



    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}

*/
>>>>>>> dev:models/users.js
