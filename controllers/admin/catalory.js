var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Catalory = require(__rootDir + 'models/catalory');

router.all('/', function (req, res, next) {
  //Handler all request
  next();
});

router.post('/getCategories', function (req, res) {
  Catalory.find(function(err, result){
    if(err){
      console.log('Error when find categories: ' + err);
      res.json();
    }
    else{
      res.json(result);
    }
  });
});

router.post('/getCategoriesWithGroup', function (req, res) {
  Catalory
  .find()
  .populate('group')
  .exec(function (err, result){
    if(err){
      console.log('Error when when find categories with group: ' + err);
      res.json();
    }
    else{
      res.json(result);
    }
  });
});

router.post('/getCategoyById', function (req, res) {
  var id = mongoose.Types.ObjectId(req.body.id);

  Catalory.findOne({_id: id}, function (err, category) {
    if (err) {
      console.log('Error when find a category by id: ' + err);
      res.json();
    }
    else {
      res.json(category);
    }
  });
});

router.post('/insert', function (req, res){
  var catalory = new Catalory();
  catalory.name = req.body.name;
  catalory.description = req.body.description;
  catalory.is_active = req.body.is_active;
  catalory.slug = req.body.slug;
  catalory.group = mongoose.Types.ObjectId(req.body.group_id);

  Catalory.create(catalory, function(err, catalory){
    if (err) {
      console.log('Error when insert category: ' + err);
      res.json({});
    }
    else {
      res.json(catalory);
    }
  });
});

router.post('/update', function (req, res){
  var query = {_id: mongoose.Types.ObjectId(req.body._id)};
  var options = {};

  // set update data
  var update = {
    name: req.body.name,
    description: req.body.description,
    is_active: req.body.is_active,
    slug: req.body.slug,
    group: mongoose.Types.ObjectId(req.body.group_id)
  }

  // update to db
  Catalory.update(query, update, options, function (err, numAffected) {
    if(err){
      console.log('Error when update category: ' + err);
      res.json();
    }
    else{
      res.json(numAffected);
    }
  });
});

router.post('/remove', function (req, res){
  Catalory.remove({_id: mongoose.Types.ObjectId(req.body.id)}, function(err){
    if(err){
      console.log('Error when remove category: ' + err);
      res.json({isRemove: false});
    }
    else {
      res.json({isRemove: true});
    }
  });
});

module.exports = router;