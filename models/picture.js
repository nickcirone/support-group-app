/* NOT IMPLEMENTED */
var mongoose = require('mongoose');
    Schema = mongoose.Schema;

// Schema for Picture
var PictureSchema = new Schema ({
    name: String
});


module.exports = mongoose.model('Picture', PictureSchema);
