var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require(__rootDir + 'models/post');

router.all('/', function (req, res, next) {
  //Handler all request
  next();
});

router.post('/insert', function (req, res) {
  // new post
  var post = new Post();
  post.title = req.body.title;
  post.description = req.body.description;
  post.content = req.body.content;
  post.type = mongoose.Types.ObjectId(req.body.type_id);
  post.slug = req.body.slug;
  post.img_url = req.body.image_url;
  post.catalory = mongoose.Types.ObjectId(req.body.category_id);
  post.author = mongoose.Types.ObjectId(req.body.author_id);

  // insert to db
  Post.create(post, function (err, post) {
    if(err){
      console.log('Error when insert post: ' + err);
      res.json({});
    }
    else{
      res.json(post);
    }
  });
});

router.post('/update', function (req, res) {
  var query = {_id: mongoose.Types.ObjectId(req.body._id)};
  var options = {};

  // set update data
  var update = {
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    type: mongoose.Types.ObjectId(req.body.type_id),
    slug: req.body.slug,
    img_url: req.body.image_url,
    catalory: mongoose.Types.ObjectId(req.body.category_id),
    author: mongoose.Types.ObjectId(req.body.author_id)
  }

  // update to db
  Post.update(query, update, options, function (err, numAffected) {
    if(err){
      console.log('Error when update post: ' + err);
      res.json({});
    }
    else{
      res.json(numAffected);
    }
  });
});

router.post('/remove', function (req, res){
  Post.remove({_id: mongoose.Types.ObjectId(req.body._id)}, function(err){
    if(err){
      console.log('Error when remove post: ' + err);
      res.json({isRemove: false});
    }
    else{
      res.json({isRemove: true});
    }
  });
});

router.post('/getPosts', function (req, res) {
  Post
  .find({}, {title: 1, type: 1, catalory: 1, author: 1, date_update: 1})
  .populate('author type catalory')
  .exec(function (err, posts) {
    if(err){
      console.log('Error when find posts: ' + err);
      res.json({});
    }
    else{
      res.json(posts);
    }
  });
});

router.post('/getPostById', function (req, res) {
  var id = mongoose.Types.ObjectId(req.body.id);

  Post.findOne({_id: id}, function (err, post){
    if(err){
      console.log('Error when find a post by id: ' + err);
      res.json({});
    }
    else{
      res.json(post)
    }
  });
  
});

module.exports = router;