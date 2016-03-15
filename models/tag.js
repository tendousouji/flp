var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
    name: String
});

//Instance methods
/*postSchema.methods.findSimilarTypes = function (cb) {
    return this.model('Animal').find({ type: this.type }, cb);
}*/

//Statics methods
/*postSchema.statics.findTest = function (cb) {
    this.find(cb);
}*/

module.exports = mongoose.model('Tag', tagSchema, 'tags');