var router = require('express').Router(),
		User = require('../models').User,
		middleware = require('../middleware'),
		Promise = require('bluebird'),
		utils = require('../utils'),
		JazzError = utils.JazzError,
		errorTypes = utils.errorTypes;

router.get('/', middleware.auth, function(req, res) {
	var offset = 0;
	if(req.query.offset && req.query.offset > 0) {
		offset = req.query.offset;
	}
	var limit = 30;
	if(req.query.limit && req.query.limit > 0 && req.query.limit < 100) {
		limit = req.query.limit;
	}

	User.findAll({
		offset: offset,
		limit: limit,
		attributes: { exclude: ['password'] }
	})
	.then(function(users) {
		res.json(users);
	})
	.catch(function(err) {
		return res.status(err.status || 500).json({ error: err.message });
	});
});

router.get('/me', middleware.auth, function(req, res) {
	User.findOne({
		where: {
			id: req.user.id
		},
		attributes: {
			exclude: ['password']
		}
	})
	.then(function(user) {
		res.json(user);
	})
	.catch(function(err) {
		return res.status(err.status || 500).json({ error: err.message });
	});
});

module.exports = router;
