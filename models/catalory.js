//include models
require('./group.js');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var catalorySchema = new Schema({
  group: { type: ObjectId, ref: 'Group' },
  name: String,
  description: String,
  date_create: { type: Date, default: Date.now },
  is_active: Number,
  slug: String
});

//Instance methods
/*catalorySchema.methods.findPost = function (condition, callback) {
  //add find child
  condition.catalory = this._id;
  
  //Find
  this.model('Post').find(condition, callback);
}*/

//Statics methods
catalorySchema.statics.findByGroupSlug = function (groupSlug, callback) {
  var self = this;
  
  self.model('Group').findOne({ slug: groupSlug }, function (err, groupPost) {
    if (err || !groupPost) {
      callback(err, []);
    } else {
      self.find({ group: groupPost._id }, function (err, catalories) {
        if (err) {
          callback(err, []);
        } else {
          callback(err, catalories);
        }
      });
    }
  });
};

catalorySchema.statics.findByJoinChild = function (conditions, populates, joins, callback) {
  
  conditions = conditions || {};
  populates = populates || {};
  joins = joins || {};

  var conditionGroup = conditions.group || {};
  var conditionCatalory = conditions.catalory || {};
  var conditionPost = conditions.post || {};
  
  var joinCatalory = joins.catalory || null;
  var joinPost = joins.post || null;
  
  var populateGroup = populates.group || [];
  var populateCatalory = populates.catalory || [];
  var populatePost = populates.post || [];
  
  var self = this;

  var catalory = self.find(conditionCatalory);
  
  //populate
  for (var i in populateCatalory) {
    catalory.populate(populateCatalory[i]);
  }
  
  //run
  catalory.exec(function (err, catalories) {
    if (err || catalories.length == 0) {
      callback(err, []);
    } else {
      if (joinPost) {
        var post = self.model('Post').find(conditionPost);
        
        //populate
        for (var i in populatePost) {
          post.populate(populatePost[i]);
        }
        
        //run
        post.exec(function (err, posts) {
          if (err || posts.length == 0) {
            callback(err, catalories);
          } else {
            //Join post
            for (var i = catalories.length - 1; i >= 0; i--) {
              catalories[i]._doc.posts = [];

              for (var j in posts) {
                if (posts[j].catalory.equals(catalories[i]._id)) {
                  catalories[i]._doc.posts.push(posts[j]);
                }
              }

              if (joinPost == 'INNER' && catalories[i]._doc.posts.length == 0) {
                catalories.splice(i, 1);
              }
            }
            
            //Return
            callback(err, catalories);
          }
        });
      } else {
        callback(err, catalories);
      }
    }
  });
}

/*catalorySchema.statics.findByJoin = function (conditions, callback) {
  var self = this;
  
  //Parse conditions
  var conditionCatalory = conditions.catalory || {};
  var conditionGroup = conditions.group || {};
  
  //Query Groups
  if (conditionGroup.length > 0) {
    self.model('Group').find(conditionGroup, function (err, groups) {
      if (err || groups.length == 0) {
        callback(err, []);
      } else {
        //Array group id to join
        var groupIds = [];
        for (var i in groups) {
          groupIds.push(groups[i]._id);
        }
        
        //Query Catalories
        conditionCatalory.group = { $in : groupIds };
        
        self.find(conditionCatalory, function (err, catalories) {
            callback(err, catalories);
        });
      }
    });
  } else{
    self.find(conditionCatalory, function (err, catalories) {
        callback(err, catalories);
    });
  }
};*/

module.exports = mongoose.model('Catalory', catalorySchema, 'catalories');