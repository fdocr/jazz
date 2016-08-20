var router    = require('express').Router(),
    passport  = require('../config/passport.js');

router.get('/public', function(req, res) {
  res.json({'success': 'true'});
});

router.get('/private', passport.authenticate, function(req, res) {
  res.json({'success': req.user });
});

router.use('/auth', require('./auth.js'));
router.use(passport.authenticate);
router.use('/users', require('./users.js'));
router.use('/roles', require('./roles.js'));

module.exports = router;
