//include models


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupPostSchema = new Schema({
  name: String,
  description: String,
  date_create: { type: Date, default: Date.now },
  is_active: Number,
  slug: String
});

//Virtual
//Map model to collection
groupPostSchema.virtual('catalories');

//Statics methods
groupPostSchema.statics.findByJoinChild = function (conditions, populates, joins, callback) {

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

  var group = self.find(conditionGroup);
  
  //populate
  for (var i in populateGroup) {
    group.populate(populateGroup[i]);
  }
  
  //run
  group.exec(function (err, groups) {
    if (err || groups.length == 0) {
      callback(err, []);
    } else if (joinCatalory) {
      var catalory = self.model('Catalory').find(conditionCatalory);
      
      //populate
      for (var i in populateCatalory) {
        catalory.populate(populateCatalory[i]);
      }
      
      //run
      catalory.exec(function (err, catalories) {
        if (err || catalories.length == 0) {
          callback(err, groups);
        } else {
          //Array catalories used
          //var cataloriesUse = [];
          
          for (var i = groups.length - 1; i >= 0; i--) {
            groups[i]._doc.catalories = [];
            
            //push catalories
            for (var j in catalories) {
              if (catalories[j].group.equals(groups[i]._id)) {
                groups[i]._doc.catalories.push(catalories[j]);
                //cataloriesUse.push(catalories[j]);
              }
            }
            
            //Inner Join
            if (joinCatalory == 'INNER' && groups[i]._doc.catalories.length == 0) {
              groups.splice(i, 1);
            }
          }
          
          if (joinPost) {
            var post = self.model('Post').find(conditionPost);
            
            //populate
            for (var i in populatePost) {
              post.populate(populatePost[i]);
            }
            
            //run
            post.exec(function (err, posts) {
              if (err || posts.length == 0) {
                callback(err, groups);
              } else {
                //Join post
                for (var i = groups.length - 1; i >= 0; i--) {
                  for (var j = groups[i].catalories.length -1; j >= 0; j--) {
                    groups[i].catalories[j]._doc.posts = [];
                    
                    //push post
                    for (var k in posts) {
                      if (posts[k].catalory.equals(groups[i].catalories[j]._id)) {
                        groups[i].catalories[j]._doc.posts.push(posts[k]);
                      }
                    }
                    
                    //Inner Join Post
                    if (joinPost == 'INNER' && groups[i].catalories[j]._doc.posts.length == 0) {
                      groups[i].catalories.splice(j, 1);
                    }
                  }
                  
                  //Inner Join Catalory
                  if (joinCatalory == 'INNER' && groups[i]._doc.catalories.length == 0) {
                    groups.splice(i, 1);
                  }
                }
                
                //Return
                callback(err, groups);
              }
            });
          } else {
            callback(err, groups);
          }
        }
      });
    } else {
      callback(err, groups);
    }
  });
}

module.exports = mongoose.model('Group', groupPostSchema, 'group_posts');