var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;
    // passportLocalMongoose = require('passport-local-mongoose');

var ProfileSchema = new Schema({
    avatar: {type: String, required: false},
    birthdate: {type: Date, required: false},
    age: {type: Number, required: false},
    ageHidden: {type: Boolean, required: false},
    devAge: {type: Number, required: false},
    devAgeHidden: {type: Number, required: false},
    genderId: {type: String, required: false},
    genderHidden: {type: Boolean, required: false},
    bio: {type: String, required: false},
    bioHidden: {type: Boolean, required: false},
    services: {type: [String], required: false},
    servicesHidden: {type: Boolean, required: false},
    interests: {type: [String], required: false},
    interestsHidden: {type: Boolean, required: false},
    friendIds: {type: [ObjectId], required: false},
    matchIds: {type: [ObjectId], required: false},
    sentPendingFriendIds: {type: [ObjectId], required: false},
    recvPendingFriendIds: {type: [ObjectId], required: false},
});

module.exports = mongoose.model('Profile', ProfileSchema);

/*
var interests = [
      'video games',
      'cooking',
      'arts & crafts',
      'legos',
      'building',
      'writing',
      'reading',
      'tv',
      'movies',
      'board/card games',
      'sports',
      'swimming',
      'boating',
      'fishing'
    ];

var services = [
      'Surgery',
      'Neurosurgery',
      'ENT Surgery',
      'Orthopedic Surgery',
      'Cardiothoracic Surgery',
      'Urology Surgery',
      'Burns',
      'General Medicine',
      'Cardiology',
      'Endocrinology',
      'GI',
      'Hematology and Oncology',
      'Nephrology',
      'Neurology',
      'Pulmonology',
      'Bone Marrow Transplant'
    ];

*/
