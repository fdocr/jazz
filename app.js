var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    passport = require('./config/passport.js'),
    app = express();

if(config.env === 'production') {
  app.use(logger('tiny'));
} else {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.strategy.initialize());

app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if(config.env !== 'production') {
  app.use(function(err, req, res, next) {
	  res.status(err.status || 500).json({
      message: err.message || 'Internal server error',
      stack: err.stack || 'No stacktrace available'
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error'
  });
});


module.exports = app;
