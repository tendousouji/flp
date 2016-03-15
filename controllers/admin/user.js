var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require(__rootDir + 'models/user');

router.all('/', function (req, res, next) {
  //Handler all request
  next();
});

router.post('/getAuthors', function (req, res) {
  // type_user: 1 => author
  User.find({type_user: 1}, {username: 1}, function(err, authors){
    if(err){
      console.log('Error when get authors: ' + err);
      res.json({});
    }
    else{
      res.json(authors);
    }
  })
});

module.exports = router;