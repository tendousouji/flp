var express = require('express');
var router = express.Router();

/* GET view. */
router.get('/partials/:name', function (req, res) {
    var name = req.params.name;
    res.render('admin/partials/' + name);
});

//Import controller
router.use('/post', require('./post.js'));
router.use('/login', require('./login.js'));
router.use('/catalory', require('./catalory.js'));
router.use('/type', require('./type.js'));
router.use('/user', require('./user.js'));
router.use('/group', require('./group.js'));

module.exports = router;