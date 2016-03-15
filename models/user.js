var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    full_name: String,
    email: String,
    avatar_url: String,
    type_user: Number,
    is_active: Number,
    date_create: Date
});

//Instance methods
/*postSchema.methods.findSimilarTypes = function (cb) {
    return this.model('Animal').find({ type: this.type }, cb);
}*/

//Statics methods
/*postSchema.statics.findTest = function (cb) {
    this.find(cb);
}*/

module.exports = mongoose.model('User', userSchema, 'users');