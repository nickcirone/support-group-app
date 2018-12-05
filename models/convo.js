var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var ConvoSchema = new Schema({
    userOne: {type: String, required: false},
    userTwo: {type: String, required: false},
    messages: {type: [String], required: false},
});

module.exports = mongoose.model('Convo', ConvoSchema);