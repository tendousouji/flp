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

router.post('/insert', function (req, res) {
  var user = new User();

  user.username = req.body.username;
  user.password = req.body.password;
  user.full_name = req.body.full_name;
  user.email = req.body.email;

  User.create(user, function(err, user){
    if (err) {
      console.log('Error when insert user: ' + err);
      res.json();
    }
    else {
      res.json(user);
    }
  });

});

module.exports = router;