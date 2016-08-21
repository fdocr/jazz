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
  console.log('authenticating: ');
  console.log(jwt_payload);
  User.findOne({
    where: { id: jwt_payload.id },
    attributes: { exclude: ['password'] }
  })
  .then(function(user) {
    if(user) return user;
    else return false;
  })
  .asCallback(done);
}));

exports.strategy = passport;
exports.authenticate = passport.authenticate('jwt', { session: false });
exports.superuser = function(req, res, next) {
  if(req.user.role === utils.roles.admin) {
    next();
  } else {
    res.status(unauthorized.status).json(unauthorized.message);
  }
};
