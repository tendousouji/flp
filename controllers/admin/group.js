var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Group = require(__rootDir + 'models/group');

router.all('/', function (req, res, next) {
  //Handler all request
  next();
});

router.post('/getGroups', function (req, res) {
  Group.find(function (err, groups) {
    if(err){
      console.log('Error when get groups: ' + err);
      res.json();
    }
    else{
      res.json(groups);
    }
  });
});

router.post('/getGroupById', function (req, res){
  var id = mongoose.Types.ObjectId(req.body.id);

  Group.findOne({_id: id}, function (err, group) {
    if (err) {
      console.log('Error when find a group by id: ' + err);
      res.json();
    }
    else {
      res.json(group);
    }
  });

});

router.post('/insert', function (req, res){
  var group = new Group();

  group.name = req.body.name;
  group.description = req.body.description;
  group.is_active = req.body.is_active;
  group.slug = req.body.slug;

  Group.create(group, function(err, group){
    if (err) {
      console.log('Error when insert category: ' + err);
      res.json();
    }
    else {
      res.json(group);
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
  }

  // update to db
  Group.update(query, update, options, function (err, numAffected) {
    if(err){
      console.log('Error when update group: ' + err);
      res.json();
    }
    else{
      res.json(numAffected);
    }
  });
  
});

module.exports = router;