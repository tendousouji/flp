var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var typeSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Type', typeSchema, 'types');