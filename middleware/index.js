var jwt = require('jsonwebtoken'),
		config = require('../config'),
		noTokenError = require('../utils').errorTypes.noTokenProvided;

exports.auth = auth;

/*
 * Middleware that verifies the request is authenticated with a JWT
 * @return: Will decode the JWT into `req.user`
 */
function auth(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if(!token) res.status(noTokenError.status).json({ error: noTokenError.message });
	else {
		jwt.verify(token, config.secretHash, function(err, decoded) {
			if(err) {
				return res.status(err.status || 500).json({ error: err.message });
			} else {
				req.user = decoded; //TODO: Check your database decodes this way
				next();
			}
		});
	}
}
