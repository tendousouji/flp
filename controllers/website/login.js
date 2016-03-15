var express = require('express');
var router = express.Router();
var User = require(__rootDir + 'models/user');

router.all('/', function (req, res, next) {
  //Handler all request
  
  next();
});

router.post('/', function (req, res) {
  var username = req.body.username || null;
  var password = req.body.password || null;
  
  console.log(req.body);

  if (!username || !password) { //check fill username & password
    res.json({ error_code: -1, user: null });
  } else {
    User.findOne({ username: username }, function (err, result) {
      if (err) {                                    // check database error
        res.json({ error_code: -5, user: null });
      } else if (!result) {                         // check user esixt
        res.json({ error_code: -4, user: null})
      } else if (result.is_active != 1) {           // check user is active
        res.json({ error_code: -2, user: null})
      } else if (result.password != password) {     // check user password
        res.json({ error_code: -3, user: null});
      } else {                                      // login success
        result.password = '';
        res.json({ error_code: 0, user: result });
      }
    });
  }
});

module.exports = router;