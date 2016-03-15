var express = require('express');
var router = express.Router();
var Group = require(__rootDir + 'models/group');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

router.all('/', function (req, res, next) {
  //Handler all request
  
  next();
});

router.post('/findJoinChild', function (req, res) {
  Group.findByJoinChild(req.body.conditions, req.body.populates, req.body.joins, function (err, groups) {
    if (err) {
      res.json([]);
    } else {
      res.json(groups);
    }
  });
});

module.exports = router;