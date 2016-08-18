var router = require('express').Router(),
		middleware = require('../middleware');

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/public', function(req, res) {
	res.json({'success': 'true'});
});

router.get('/private', middleware.auth, function(req, res) {
	res.json({'success': 'true'});
});

router.use('/auth', require('./auth.js'));
router.use('/users', require('./users.js'));

module.exports = router;
