var router      = require('express').Router(),
    User        = require('../models').User,
    Promise     = require('bluebird'),
    bcrypt      = Promise.promisifyAll(require('bcrypt')),
    passport    = require('../config/passport.js'),
    jwt         = require('jsonwebtoken'),
    config      = require('../config'),
    utils       = require('../utils'),
    JazzError   = utils.JazzError,
    errorTypes  = utils.errorTypes;

/**
  * @description: Utility function to sign a JWT
  * @param userId: To encode in the token
  * @return: The JWT signed
  */
function signJWT(userId) {
  return jwt.sign({
    'id': userId
  }, config.secretHash, {
    expiresIn: '42 days'
  });
}

/**
  * @description: Register user with email & password
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
    if(user) throw new JazzError(errorTypes.emailInUse);
    else return bcrypt.hashAsync(password, 11);
  })
  .then(function(hash) {
    return User.create({
      name: name,
      email: email,
      password: hash
    });
  })
  .then(function(user) {
    res.json('JWT ' + signJWT(user.id));
  })
  .catch(function(err) {
    if(!err.customError) err = errorTypes.badRequest;
    res.status(err.status).json(err.message);
  });
});

/**
  * @description: Authenticate with email & password
  * @param email: The user's email to authenticate
  * @param password: The user's submited password
  * @return: The JWT bearer token signed
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
    if(!user) throw new RewardHubError(errorTypes.notFound);
    else return bcrypt.compareAsync(password, user.password);
  })
  .then(function(validPassword) {
    if(!validPassword) throw new JazzError(errorTypes.unauthorized);
    else res.json('JWT ' + signJWT(userId));
  })
  .catch(function(err) {
    if(!err.customError) err = errorTypes.badRequest;
    res.status(err.status).json(err.message);
  });
});

/**
  * @description: Refreshes the expiration of a valid token
  * @param token: A valid JWT
  * @return: The new JWT bearer token
  */
router.post('/refresh', passport.authenticate, function(req, res) {
  var password = req.body.password,
      email = req.body.email;

  if(!req.body.token) {
    var err = errorTypes.incorrectParameters;
    return res.status(err.status).json(err.message);
  }

  var userId;
  User.findOne({ where : { email: email } })
  .then(function(user) {
    userId = user.id;
    if(!user) throw new RewardHubError(errorTypes.notFound);
    else return bcrypt.compareAsync(password, user.password);
  })
  .then(function(validPassword) {
    if(!validPassword) throw new JazzError(errorTypes.unauthorized);
    else res.json('JWT ' + signJWT(userId));
  })
  .catch(function(err) {
    if(!err.customError) err = errorTypes.badRequest;
    res.status(err.status).json(err.message);
  });
});

module.exports = router;
