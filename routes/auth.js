var router = require('express').Router(),
		User = require('../models').User,
		Promise = require('bluebird'),
		bcrypt = Promise.promisifyAll(require('bcrypt')),
		jwt = require('jsonwebtoken'),
		config = require('../config'),
		utils = require('../utils'),
		JazzError = utils.JazzError,
		errorTypes = utils.errorTypes;

/*
 * Utility function to sign a JWT
 * @param userId: To encode in the token
 * @return: The JWT signed
 */
function signJWT(userId) {
	return jwt.sign({ 'id': userId }, config.secretHash, {
		expiresInSeconds: 24 * 60 * 60
	});
}

/*
 * Register user with email & password
 * @param name: The user's submited name
 * @param email: The user's submited email
 * @param password: The user's submited password
 * @return: The JWT of the new user
 */
router.post('/register', function(req, res) {
	var name = req.body.name,
			email = req.body.email,
			password = req.body.password;

	if(!name || !email || !password) {
		var err = errorTypes.incorrectParameters;
		return res.status(err.status).json(err.message);
	}

	User.findOne({ where : { email : email } })
	.then(function(user) {
		if(user) {
			throw new JazzError(errorTypes.emailInUse);
		} else {
			return bcrypt.hashAsync(password, 11);
		}
	})
	.then(function(hash) {
		return User.create({
			name: name,
			email: email,
			password: hash
		});
	})
	.then(function(user) {
		return res.json({ 'token': signJWT(user.id) });
	})
	.catch(function(err) {
		return res.status(err.status || 500).json({ error: err.message });
	});
});

/*
 * Authenticate with email & password
 * @param email: The user's email to authenticate
 * @param password: The user's submited password
 * @return: The JWT signed
 */
router.post('/email', function(req, res) {
	var password = req.body.password,
			email = req.body.email;

	if(!email || !password) {
		var err = errorTypes.incorrectParameters;
		return res.status(err.status).json(err.message);
	}

	var userId;
	User.findOne({ where : { email: email } })
  .then(function(user) {
		userId = user.id;
    if(!user) {
			throw new RewardHubError(errorTypes.notFound);
		} else {
			return bcrypt.compareAsync(password, user.password);
		}
	})
	.then(function(validPassword) {
		if(!validPassword) {
			throw new JazzError(errorTypes.unauthorized);
		} else {
      return res.json({ 'token': signJWT(userId) });
    }
  })
	.catch(function(err) {
		return res.status(err.status || 500).json({ error: err.message });
	});
});

/*
 * Decodes a JWT (dev purposes)
 * @param token: To decode
 * @return: The JWT decoded as JSON
 */
router.post('/decode', function(req, res) {
	jwt.verify(req.body.token, config.secretHash, function(err, decoded) {
		if(err) {
			return res.status(500).json({ error: err.message });
		} else {
			res.json(decoded);
		}
	});
});

module.exports = router;
