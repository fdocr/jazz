var router      = require('express').Router(),
    User        = require('../models').User,
    passport    = require('../config/passport.js'),
    Promise     = require('bluebird'),
    utils       = require('../utils'),
    bcrypt      = require('bcrypt'),
    JazzError   = utils.JazzError,
    errorTypes  = utils.errorTypes;

/**
  * @description: Get all users
  * @param userId: To encode in the token
  * @return: The JWT signed
  */
router.get('/', passport.superuser, function(req, res) {
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
    order: '"id" DESC',
    attributes: { exclude: ['password'] }
  })
  .then(function(users) {
    res.json(users);
  })
  .catch(function(err) {
    if(!err.customError) err = errorTypes.badRequest;
    res.status(err.status).json(err.message);
  });
});

/**
  * @description: Get the authenticated user
  * @return: The user data
  */
router.get('/me', function(req, res) {
  User.findOne({
    where: { id: req.user.id },
    attributes: { exclude: ['password'] }
  })
  .then(function(user) {
    res.json(user);
  })
  .catch(function(err) {
    if(!err.customError) err = errorTypes.badRequest;
    res.status(err.status).json(err.message);
  });
});

/**
  * @description: Get user user by id
  * @param id: User's id to fetch
  * @return: The JWT signed
  */
router.get('/:id', function(req, res) {
  User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ['password'] }
  })
  .then(function(user) {
    res.json(user);
  })
  .catch(function(err) {
    if(!err.customError) err = errorTypes.badRequest;
    res.status(err.status).json(err.message);
  });
});

/**
  * @description: Update a specific user's data
  * @param validProperty (optionals): Any property compliant w/ user model
  */
router.put('/me', function(req, res) {
  var opts = {};
  if(req.body.name) {
    opts.name = req.body.name;
  }
  if(req.body.email) {
    opts.email = req.body.email;
  }
  if(req.body.password && req.body.passwordDitto) {
    if(req.body.password !== req.body.passwordDitto) {
      var err = errorTypes.incorrectParameters;
      return res.status(err.status).json(err.message);
    } else {
      opts.password = bcrypt.hashSync(password, 11); //TODO: Async this mofo
    }
  }

  User.update(opts, { where: { id: req.user.id } })
  .then(function(user) {
    res.json({ success: true });
  })
  .catch(function(err) {
    if(!err.customError) {
      console.log(err.message);
      err = errorTypes.badRequest;
    }
    res.status(err.status).json(err.message);
  });
});

/**
  * @description: Update a specific user's data
  * @param userId: Target user to update
  * @param validProperty (optionals): Any property compliant w/ user model
  */
router.put('/:id', passport.superuser, function(req, res) {
  var opts = {};
  if(req.body.name) {
    opts.name = req.body.name;
  }
  if(req.body.email) {
    opts.email = req.body.email;
  }
  if(req.body.password && req.body.passwordDitto) {
    if(req.body.password !== req.body.passwordDitto) {
      var err = errorTypes.incorrectParameters;
      return res.status(err.status).json(err.message);
    } else {
      opts.password = bcrypt.hashSync(password, 11); //TODO: Async this mofo
    }
  }
  if(req.body.role) {
    opts.role = req.body.role.toUpperCase();
  }

  User.update(opts, { where: { id: req.params.id } })
  .then(function(result) {
    res.json({ success: true });
  })
  .catch(function(err) {
    if(!err.customError) err = errorTypes.badRequest;
    res.status(err.status).json(err.message);
  });
});

/**
  * @description: Self destroys the authenticated user (Dangerous)
  */
router.delete('/me', function(req, res) {
  User.destroy({ where: { id: req.user.id } })
  .then(function(roles) {
    res.json({ 'bye': 'bye' });
  })
  .catch(function(err) {
    if(!err.customError) err = errorTypes.badRequest;
    res.status(err.status).json(err.message);
  });
});

/**
  * @description: Deletes a user by id (Dangerous)
  */
router.delete('/:id', passport.superuser, function(req, res) {
  User.destroy({ where: { id: req.params.id } })
  .then(function(roles) {
    res.json({ 'bye': 'bye' });
  })
  .catch(function(err) {
    if(!err.customError) err = errorTypes.badRequest;
    res.status(err.status).json(err.message);
  });
});

module.exports = router;
