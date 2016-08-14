var jwt = require('jsonwebtoken'),
		config = require('../config'),
		noTokenError = require('../utils').errorTypes.noTokenProvided;

module.exports = function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (!token) res.status(noTokenError.status).json(noTokenError.message);
	else {
		jwt.verify(token, config.secretHash, function(err, decoded) {
			if (err) {
				return res.status(err.status).json(err.message);
			} else {
				req.user = decoded._doc; //TODO: Check your database decodes this way
				next();
			}
		});
	}
};
