var router      = require('express').Router(),
    Role        = require('../models').Role,
    passport    = require('../config/passport.js'),
    utils       = require('../utils'),
    JazzError   = utils.JazzError,
    errorTypes  = utils.errorTypes;

/**
  * @description: Queries existing roles
  * @return: Array of roles
  */
router.get('/', passport.admin, function(req, res) {
  Role.findAll()
  .then(function(roles) {
    res.json(roles);
  })
  .catch(function(err) {
    err = utils.normalizeError(err);
    res.status(err.status).json(err.message);
  });
});

/**
  * @description: Creates a new role
  * @param name: The role name to create
  */
router.post('/', passport.admin, function(req, res) {
  if(!req.body.name) {
    var err = errorTypes.incorrectParameters;
    return res.status(err.status).json(err.message);
  }

  Role.create({ name: req.body.name.toUpperCase() })
  .then(function(role) {
    res.json(role);
  })
  .catch(function(err) {
    err = utils.normalizeError(err);
    res.status(err.status).json(err.message);
  });
});

/**
  * @description: Deletes a role
  */
router.delete('/:name', passport.admin, function(req, res) {
  Role.destroy({ where: { name: req.params.name.toUpperCase() } })
  .then(function(roles) {
    res.json({ 'bye': 'bye' });
  })
  .catch(function(err) {
    err = utils.normalizeError(err);
    res.status(err.status).json(err.message);
  });
});

module.exports = router;
