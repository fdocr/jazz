var Promise     = require('bluebird'),
    models      = require('../models'),
    rp          = require('request-promise'),
    expect      = require('chai').expect,
    errorTypes  = require('../utils').errorTypes;

module.exports = function(testData) {
  var authToken1;
  describe('Auth tests', function() {
    after(function() {
      return models.User.truncate({ logging: false });
    });

    it('Should register a new user', function (done) {
      rp({
        method: 'POST',
        uri: (testData.baseURL + '/auth/register'),
        form: testData.users[0]
      })
      .then(function(response) {
        var result = JSON.parse(response);
        expect(result).to.have.property('token');
        authToken1 = result.token;
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('Should fail to register an existing (email) user', function (done) {
      rp({
        method: 'POST',
        uri: (testData.baseURL + '/auth/register'),
        form: testData.users[0]
      })
      .then(function(response) {
        done('Should have responded with an error status when creating the user');
      })
      .catch(function(err) {
        expect(err).to.have.property('statusCode', errorTypes.emailInUse.status);
        done();
      });
    });

    it('Should login an existing user', function (done) {
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
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('Should refresh a valid token', function (done) {
      Promise.delay(1000).then(function() {
        return rp({
          method: 'POST',
          uri: (testData.baseURL + '/auth/refresh'),
          headers: { 'Authorization': authToken1 }
        });
      })
      .then(function(response) {
        var result = JSON.parse(response);
        expect(result).to.have.property('token').and.not.equal(authToken1);
        authToken1 = result.token;
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('Should fail to access a secured endpoint without a valid JWT Auth header', function (done) {
      rp({
        method: 'POST',
        uri: (testData.baseURL + '/auth/refresh')
      })
      .then(function() {
        done('Should have responded with an unauthorized error');
      })
      .catch(function(err) {
        expect(err).to.have.property('statusCode', errorTypes.unauthorized.status);
        done();
      });
    });

    it('Should fail to access a secured endpoint with a valid JWT but non-existing user', function (done) {
      models.User.truncate({ logging: false })
      .then(function() {
        return rp({
          method: 'POST',
          uri: (testData.baseURL + '/auth/refresh'),
          headers: { 'Authorization': authToken1 }
        });
      })
      .then(function() {
        done('Should have responded with an unauthorized error');
      })
      .catch(function(err) {
        expect(err).to.have.property('statusCode', errorTypes.unauthorized.status);
        done();
      });
    });
  });
};
