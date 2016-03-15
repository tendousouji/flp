var express = require('express');
var router = express.Router();
var User = require(__rootDir + 'models/user');

router.all('/', function (req, res, next) {
    //Handler all request
    next();
});

// post_url: '/api/admin/login'
router.post('/', function (req, res) {
  var username = req.body.username,
      password = req.body.hash_password;

  User.findOne({username: username, type_user: 1, password: password}, function(err, result){
    if(err){
      console.log('Error in admin login:' + err);
      res.json({});
    }
    else {
      res.json(result);
    }
  });
});

module.exports = router;