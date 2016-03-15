//include models
require('./group.js');
require('./catalory.js');
require('./tag.js');
require('./user.js');
require('./type.js');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Comment = require('./comment.js'),
    View = require('./view.js'),
    Like = require('./like.js');

var postSchema = new Schema({
  title: String,
  description: String,
  author: { type: ObjectId, ref: "User" },
  content: String,
  img_url: String,
  date_create: { type: Date, default: Date.now },
  date_update: { type: Date, default: Date.now },
  type: { type: ObjectId, ref: "Type" },
  slug: String,
  catalory: { type: ObjectId, ref: "Catalory" },
  tags: [{ type: ObjectId, ref: 'Tag' }],
  comments: [Comment.schema],
  views: [View.schema],
  likes: [Like.schema]
});

//Instance methods

//Static methods
postSchema.statics.findByJoin = function (conditions, populates, callback) {
  var self = this;
  
  conditions = conditions || {};
  populates = populates || {};

  //Parse conditions
  var conditionGroup = conditions.group || {};
  var conditionCatalory = conditions.catalory || {};
  var conditionPost = conditions.post || {};
  
  var populatesGroup = populates.group || [];
  var populatesCatalory = populates.catalory || [];
  var populatesPost = populates.post || [];
  
  //Query Groups
  if (conditionGroup != {}) {
    //Init query
    var findGroup = self.model('Group').find(conditionGroup)
    
    //populate
    for (var i in populatesGroup) {
      findGroup.populate(populatesGroup[i]);
    }
    
    //run
    findGroup.exec(function (err, groups) {
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
        
        var findCatalory = self.model('Catalory').find(conditionCatalory);
        
        //Populate
        var isPopulateGroup = false;
        for (var i in populatesCatalory) {
          if (populatesCatalory[i] != 'group') {
            findCatalory.populate(populatesCatalory[i]);
          } else {
            isPopulateGroup = true;
          }
        }
        
        //run
        findCatalory.exec(function (err, catalories) {
          if (err || catalories.length == 0) {
            callback(err, []);
          } else {
            //Array catalory id to join
            var cataloryIds = [];
            for (var i in catalories) {
              cataloryIds.push(catalories[i]._id);
            }
            
            //Query post by catalory
            conditionPost.catalory = { $in: cataloryIds };
            var findPost = self.find(conditionPost);
            
            //Populate
            var isPopulateCatalory = false;
            for (var i in populatesPost) {
              if (populatesPost[i] != 'catalory') {
                findPost.populate(populatesPost[i]);
              } else {
                isPopulateCatalory = true;
              }
            }
            
            //run
            findPost.exec(function (err, posts) {
              if (err || posts.length == 0) {
                callback(err, []);
              } else {
                if (isPopulateCatalory) { // populate catalory
                  for (var i in posts) {
                    for (var j in catalories) {
                      if (posts[i].catalory.equals(catalories[j]._id)) {
                        posts[i].catalory = catalories[j];
                        break;
                      }
                    }
                  }
                  
                  if (isPopulateGroup) { // populate group
                    for (var i in catalories) {
                      for (var j in groups) {
                        if (catalories[i].group.equals(groups[j]._id)) {
                          catalories[i].group = groups[j];
                          break;
                        }
                      }
                    }
                  }
                }
                
                callback(err, posts);
              }
            });
          }
        });
      }
    });
  } else if (conditionCatalory != {}) {
    var findCatalory = self.model('Catalory').find(conditionCatalory);
    
    //Populate
    for (var i in populatesCatalory) {
      findCatalory.populate(populatesCatalory[i]);
    }
    
    //run
    findCatalory.exec(function (err, catalories) {
      if (err || catalories.length == 0) {
        callback(err, []);
      } else {
        //Array catalory id to join
        var cataloryIds = [];
        for (var i in catalories) {
          cataloryIds.push(catalories[i]._id);
        }
        
        //Query post by catalory
        conditionPost.catalory = { $in: cataloryIds };
        var findPost = self.find(conditionPost);
        
        //Populate
        var isPopulateCatalory = false;
        for (var i in populatesPost) {
          if (populatesPost[i] != 'catalory') {
            findPost.populate(populatesPost[i]);
          } else {
            isPopulateCatalory = true;
          }
        }
        
        //run
        findPost.exec(function (err, posts) {
          if (err || posts.length == 0) {
            callback(err, []);
          } else {
            if (isPopulateCatalory) { // populate catalory
              for (var i in posts) {
                for (var j in catalories) {
                  if (posts[i].catalory.equals(catalories[j]._id)) {
                    posts[i].catalory = catalories[j];
                    break;
                  }
                }
              }
            }
            
            callback(err, posts);
          }
        });
      }
    });
  } else {
    var findPost = self.find(conditionPost);
    
    //Populate
    var isPopulateGroup = false;
    for (var i in populatesCatalory) {
      if (populatesCatalory[i] == 'group') {
        isPopulateGroup = true;
        break;
      }
    }
    
    var isPopulateCatalory = false;
    for (var i in populatesPost) {
      findPost.populate(populatesPost[i]);
      if (populatesPost[i] == 'catalory') {
        isPopulateCatalory = true;
      }
    }
    
    //run
    findPost.exec(function (err, posts) {
      if (isPopulateCatalory && isPopulateGroup) {
        var group = self.model('Group').find(conditionGroup);

        for (var i in populatesCatalory) {
          group.populate(populatesGroup[i]);
        }

        group.exec(function (err, groups) {
          for (var i in posts) {
            if (posts.catalory != null) {
              for (var j in groups) {
                if (posts[i].catalory.equals(groups[j]._id)) {
                  posts[i].catalory = groups[j];
                }
              }
            }
          }

          callback(err, posts);
        });
      } else {
        callback(err, posts);
      }
    });
  }
}

module.exports = mongoose.model('Post', postSchema, 'posts');