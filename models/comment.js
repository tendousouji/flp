//include models
require('./user.js')

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var commentSchema = new Schema({
  user: { type: ObjectId, ref: "User" },
  content: String, 
  date_create: { type: Date, default: Date.now },
  date_update: { type: Date, default: Date.now }
});

//Instance methods
/*catalorySchema.methods.findPost = function (condition, callback) {
  //add find child
  condition.catalory = this._id;
  
  //Find
  this.model('Post').find(condition, callback);
}*/

//Statics methods

module.exports = mongoose.model('Comment', commentSchema);