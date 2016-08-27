var Promise     = require('bluebird'),
    models      = require('../models'),
    utils       = require('../utils'),
    rp          = require('request-promise'),
    expect      = require('chai').expect,
    errorTypes  = require('../utils').errorTypes;

module.exports = function(testData) {
  var authToken;
  describe('Auth tests', function() {
    after(function(done) {
      models.User.truncate({ logging: false })
      .asCallback(done);
    });

    it('should register a new user', function (done) {
      rp({
        method: 'POST',
        uri: (testData.baseURL + '/auth/register'),
        form: testData.users[0]
      })
      .then(function(response) {
        var result = JSON.parse(response);
        expect(result).to.have.property('token');
        expect(result).to.have.property('user');
        expect(result.user).to.have.property('role', utils.roles.user);
        expect(result.user).to.not.have.property('password');
        authToken = result.token;
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('should fail to register an existing (email) user', function (done) {
      rp({
        method: 'POST',
        uri: (testData.baseURL + '/auth/register'),
        form: testData.users[0]
      })
      .then(function(response) {
        done('should have responded with an error status when creating the user');
      })
      .catch(function(err) {
        expect(err).to.have.property('statusCode', errorTypes.emailInUse.status);
        done();
      });
    });

    it('should login an existing user', function (done) {
      rp({
        method: 'POST',
        uri: (testData.baseURL + '/auth/email'),
        form: {
          'email': testData.users[0].email,
          'password': testData.users[0].password
        }
      })
      .then(function(response) {
        var result = JSON.parse(response);
        expect(result).to.have.property('token');
        expect(result.user).to.not.have.property('password');
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('should refresh a valid token', function (done) {
      Promise.delay(1000).then(function() {
        return rp({
          method: 'POST',
          uri: (testData.baseURL + '/auth/refresh'),
          headers: { 'Authorization': authToken }
        });
      })
      .then(function(response) {
        var result = JSON.parse(response);
        expect(result).to.have.property('token').and.not.equal(authToken);
        authToken = result.token;
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('should fail to access a secured endpoint without a valid JWT Auth header', function (done) {
      rp({
        method: 'POST',
        uri: (testData.baseURL + '/auth/refresh')
      })
      .then(function() {
        done('should have responded with an unauthorized error');
      })
      .catch(function(err) {
        expect(err).to.have.property('statusCode', errorTypes.unauthorized.status);
        done();
      });
    });

    it('should fail to access a secured endpoint with a valid JWT but non-existing user', function (done) {
      models.User.truncate({ logging: false })
      .then(function() {
        return rp({
          method: 'POST',
          uri: (testData.baseURL + '/auth/refresh'),
          headers: { 'Authorization': authToken }
        });
      })
      .then(function() {
        done('should have responded with an unauthorized error');
      })
      .catch(function(err) {
        expect(err).to.have.property('statusCode', errorTypes.unauthorized.status);
        done();
      });
    });
  });
};
