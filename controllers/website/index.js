var express = require('express');
var router = express.Router();

/* GET view. */
router.get('/partials/:name', function (req, res) {
  var name = req.params.name;
  /*var templateFn = require('jade').compileFile(__rootDir + '/views/website/partials/' + name + '.jade');
  res.write(templateFn());
  res.end();*/
  res.render('website/partials/' + name);
});

//Import controller
router.use('/post', require('./post.js'));
router.use('/login', require('./login.js'));
router.use('/catalory', require('./catalory.js'));
router.use('/group', require('./group.js'));

module.exports = router;