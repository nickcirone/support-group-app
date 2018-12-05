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
  conversations: {type: [ObjectId], required: false},
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
