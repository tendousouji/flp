var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    full_name: String,
    email: String,
    avatar_url: {type: String, default: null},
    type_user: {type: Number, default: 0},
    is_active: {type: Number, default: 0},
    date_create: {type: Date, default: Date.now}
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