var Promise = require('bluebird'),
    bcrypt  = Promise.promisifyAll(require('bcrypt')),
    config  = require('../config');

exports.errorTypes = errorTypes();
exports.JazzError = JazzError;

function JazzError(err) {
  this.status = err.status;
  this.message = err.message;
  this.customError = true;
  Error.captureStackTrace(this, JazzError);
}
JazzError.prototype = Object.create(Error.prototype);
JazzError.prototype.constructor = JazzError;

function errorTypes() {
  return {
    //https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    badRequest: {
      status: 400,
      message: 'Bad request.'
    },
    incorrectParameters: {
      status: 400,
      message: 'Incorrect or missing parameters.'
    },
    unauthorized: {
      status: 401,		//http://stackoverflow.com/a/6937030/3462026
      message: 'Unauthorized.'
    },
    accessDenied: {
      status: 403,		//http://stackoverflow.com/a/6937030/3462026
      message: 'Forbidden - Access denied.'
    },
    notFound: {
      status: 404,
      message: 'Not found.'
    },
    noTokenProvided: {
      status: 405,
      message: 'No token provided.'
    },
    emailInUse: {
      status: 420,
      message: 'Email already in use. Forgot your password?'
    },
    mustProvideUserId: {
      status: 421,
      message: 'Must provide a user id'
    },
    internalServerError: {
      status: 500,
      message: 'Internal server error.'
    },
    databaseError: {
      status: 501,
      message: 'Database connection error'
    }
  };
}
