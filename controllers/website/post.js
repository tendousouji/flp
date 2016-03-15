var express = require('express');
var router = express.Router();
var Post = require(__rootDir + 'models/post');
var Comment = require(__rootDir + 'models/comment');
var User = require(__rootDir + 'models/user');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

router.all('/', function (req, res, next) {
  //Handler all request
  
  next();
});

router.get('/', function (req, res) {

});

router.post('/find', function (req, res) {
  req.body.populates = req.body.populates || {};
  req.body.populates.post = req.body.populates.post || [];
  req.body.populates.post.push('type');
  
  Post.findByJoin(req.body.conditions, req.body.populates, function (err, posts) {
    if (err) {
      console.log({ error_code: -1, message: "Database Error" });
    }
    //remove not publish post
    for (var i = posts.length - 1; i >= 0; i--) {
      if (!posts[i].type._doc.publish) {
        posts.splice(i, 1);
      }
    }
    
    res.json(posts);
    res.end();
  });
});

router.post('/comment', function (req, res) {
  Post.find(req.body).populate('comments.user').exec(function (err, post) {
    res.json(post.comments);
  });

});

router.post('/insertComment', function (req, res) {
  var comment = new Comment({
    user: req.body.comment.user_id,
    content: req.body.comment.content
  });
  
  Post.findOne({ _id : req.body.post.id }, function (err, post) {
    if (err) {
      res.json({ error_code: -3, comment: null }); // server error
    } else if (!post) {
      res.json({ error_code: -2, comment: null }); // post not found
    } else {
      post.comments.push(comment);
      post.save(function (err, result) {
        if (err) {
          res.json({ error_code: -1, comment: null }); // save error
        } else {
          //include user
          User.findOne({ _id: comment.user }, function (err, user) {
            comment.user = user;
            res.json({ error_code: 1, comment: comment }); // success
          });
        }
      });
    }
  })
});

router.post('/top', function (req, res) {
  var populates = {
    post: ['catalory', 'type'],
    catalory: ['group'],
    group: []
  };
  
  var conditions = {
    group: {},
    catalory: {},
    post: {}
  };
  
  Post.findByJoin(conditions, populates, function (err, posts) {
    if (err) {
      res.json([]);
    } else {
      //remove post not publish
      for (var i = posts.length - 1; i >= 0; i--) {
        if (!posts[i].type._doc.publish) {
          posts.splice(i, 1);
        }
      }
      //sort
      posts.sort(function (a, b) { return b.likes.length - a.likes.length; }); //sort post by like
      res.json(posts.slice(0, 20)); //limit 20 top post
    }
    res.end();
  });
});

module.exports = router;