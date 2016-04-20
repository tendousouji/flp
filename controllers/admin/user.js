var express = require('express');
var nodemailer = require('nodemailer');
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

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport('smtps://babybito666%40gmail.com:225572754@smtp.gmail.com');

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: '<babybito666@gmail.com>', // sender address
      to: 'nguyenminhqoc@gmail.com', // list of receivers
      subject: 'e4r_test', // Subject line
      text: 'e4r_test', // plaintext body
      // html: '<p id = "test"><b>e4r_tes</b></p>' // html body
  };
  console.log(mailOptions);
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });

});

router.post('/active', function (req, res){
  var query = {_id: mongoose.Types.ObjectId(req.body._id)};
  var options = {};
  // set active data
  var update = {
    is_active: 1,
  }
  // active to db
  User.update(query, update, options, function (err, numAffected) {
    if(err){
      console.log('Error when active user: ' + err);
      res.json();
    }
    else{
      res.json(numAffected);
    }
  });
});

router.post('/is_exist', function (req, res){
  var username = res.body.username;
  // active to db
  User.find({username: username}, function(err, exist){
    if(exist.length){
      console.log('username exist: ' + err);
      res = true;
    }
    else{
      res = false;
    }
  });
  
});

module.exports = router;