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
router.get('/all', passport.superuser, function(req, res) {
  Role.findAll()
  .then(function(roles) {
    res.json(roles);
  })
  .catch(function(err) {
    if(!err.customError) err = errorTypes.badRequest;
    res.status(err.status).json(err.message);
  });
});

/**
  * @description: Creates a new role
  * @param name: The role name to create
  */
router.post('/', passport.superuser, function(req, res) {
  if(!req.body.name) {
    var err = errorTypes.incorrectParameters;
    return res.status(err.status).json(err.message);
  }

  Role.create({ name: req.body.name.toUpperCase() })
  .then(function(role) {
    res.json({ success: true });
  })
  .catch(function(err) {
    if(!err.customError) err = errorTypes.badRequest;
    res.status(err.status).json(err.message);
  });
});

/**
  * @description: Deletes a role
  */
router.delete('/:name', passport.superuser, function(req, res) {
  Role.destroy({ where: { name: req.params.name.toUpperCase() } })
  .then(function(roles) {
    res.json({ success: true });
  })
  .catch(function(err) {
    if(!err.customError) err = errorTypes.badRequest;
    res.status(err.status).json(err.message);
  });
});

module.exports = router;
