var router = require('express').Router(),
		middleware = require('../middleware');

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/public', function(req, res) {
	res.json({'success': 'true'});
});

router.get('/private', middleware, function(req, res) {
	res.json({'success': 'true'});
});

module.exports = router;
