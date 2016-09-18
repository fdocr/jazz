var User          = require('../models').User,
    config        = require('./index.js'),
    utils         = require('../utils'),
    unauthorized  = utils.errorTypes.unauthorized,
    passport      = require('passport'),
    passportJWT   = require('passport-jwt'),
    JwtStrategy   = passportJWT.Strategy,
    ExtractJwt    = passportJWT.ExtractJwt;

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secretHash
};

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  done(null, jwt_payload);
}));

//Strategy export
exports.strategy = passport;
//Basic authenticate middleware - Only verifies & decodes the JWT payload
exports.authenticate = passport.authenticate('jwt', { session: false });
//Confirms the user exists in the DB
exports.confirm = confirm;
//Confirms the user exists in the DB and has the 'ADMIN' role
exports.admin = admin;

function confirm(req, res, next) {
  User.findOne({
    where: { id: req.user.id },
    attributes: { exclude: ['password'] }
  })
  .then(function(user) {
    if(!user) {
      res.status(unauthorized.status).json(unauthorized.message);
    } else {
      req.user = user.dataValues;
      next();
    }
  });
}

function admin(req, res, next) {
  User.findOne({
    where: { id: req.user.id },
    attributes: { exclude: ['password'] }
  })
  .then(function(user) {
    if(!user || user.role !== utils.roles.admin) {
      res.status(unauthorized.status).json(unauthorized.message);
    } else {
      req.user = user.dataValues;
      next();
    }
  });
}
