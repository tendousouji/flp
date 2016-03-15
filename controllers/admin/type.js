var express = require('express');
var router = express.Router();
var Type = require(__rootDir + 'models/type');

router.all('/', function (req, res, next) {
  //Handler all request
  next();
});

router.post('/getTypes', function (req, res) {
  Type.find(function(err, result){
    if(err){
      console.log(err);
    }
    else{
      res.json(result);
    }
  });
});

module.exports = router;