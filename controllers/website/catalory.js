var express = require('express');
var router = express.Router();
var Catalory = require(__rootDir + 'models/catalory');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

router.all('/', function (req, res, next) {
  //Handler all request
  
  next();
});

router.post('/find', function (req, res) {
  //Populate type
  req.body.populates = req.body.populates || {};
  req.body.populates.post = req.body.populates.post || [];
  req.body.populates.post.push('type');
  
  Catalory.findByJoinChild(req.body.conditions, req.body.populates, req.body.joins, function (err, catalories) {
    for (var i in catalories) {
      if (catalories[i]._doc.posts) {
        //remove not publish post
        for (var j = catalories[i]._doc.posts.length - 1; j >= 0; j--) {
          if (!catalories[i]._doc.posts[j].type._doc.publish) {
            catalories[i]._doc.posts.splice(j, 1);
          }
        }
      }
    }
    
    res.json(catalories);
    res.end();
  });
});

router.post('/getByGroupSlug', function (req, res) {
  Catalory.findByGroupSlug(req.body.slug, function (err, result) {
    if (err) {
      res.json([]);
    } else {
      res.json(result);
    }
    res.end();
  });
});

router.post('/top', function (req, res) {
  var populates = {
    post: [],
    catalory: ['group'],
    group: []
  };
  
  var conditions = {
    group: {},
    catalory: {},
    post: {}
  };
  
  var joins = {
    post: "JOIN"
  }
  
  Catalory.findByJoinChild(conditions, populates, joins, function (err, catalories) {
    if (err) {
      res.json([]);
    } else {
      var resultCatalories = [];
      
      //get list catalory
      for (var i in catalories) {
        catalories[i]._doc.likes = 0;
        catalories[i]._doc.comments = 0;
        catalories[i]._doc.views = 0;
        //count total like
        for (var j in catalories[i].posts) {
          catalories[i]._doc.likes += catalories[i].posts[j].likes.length;
          catalories[i]._doc.views += catalories[i].posts[j].views.length;
          catalories[i]._doc.comments += catalories[i].posts[j].comments.length;
        }
        
        //remove posts
        catalories[i].posts = [];
        
        //Push catalory to result list
        resultCatalories.push(catalories[i]);
      }
      
      //sort catalories by like
      resultCatalories.sort(function (a, b) { return b._doc.likes - a._doc.likes; });
      
      //return
      res.json(resultCatalories);
    }
    res.end();
  });
});

module.exports = router;