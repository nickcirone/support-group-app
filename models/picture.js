/* NOT IMPLEMENTED */
var mongoose = require('mongoose');
    Schema = mongoose.Schema;

// Schema for Picture
var PictureSchema = new Schema ({
    names: [String]
});


module.exports = mongoose.model('Picture', PictureSchema);
