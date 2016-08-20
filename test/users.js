var Promise     = require('bluebird'),
    models      = require('../models'),
    rp          = require('request-promise'),
    expect      = require('chai').expect,
    errorTypes  = require('../utils').errorTypes;

module.exports = function(testData) {
  var authToken, authSuperToken;
  describe('Users tests', function() {
    before(function(done) {
      models.Role.create({ name: 'ADMIN' }, { logging: false })
      .then(function(role) {
        return Promise.all([
          models.User.create(testData.users[0], { logging: false }),
          models.User.create(testData.users[1], { logging: false }),
          models.User.create(testData.users[2], { logging: false })
        ]);
      })
      .spread(function(u0, u1, u2) {
        console.log('~~~');
        console.log('USRS:');
        console.log(testData.users[2].email);
        console.log(testData.users[2].password);
        console.log('~~~');

        var authUser0 = rp({
          method: 'POST',
          uri: (testData.baseURL + '/auth/email'),
          form: {
            'email': testData.users[0].email,
            'password': testData.users[0].password
          }
        });

        var authUser2 = rp({
          method: 'POST',
          uri: (testData.baseURL + '/auth/email'),
          form: {
            'email': testData.users[2].email,
            'password': testData.users[2].password
          }
        });

        return Promise.all([ authUser0, authUser2 ]);
      })
      .spread(function(res0, res2) {
        authToken = res0.token;
        authSuperToken = res2.token;
        console.log('tokens:');
        console.log(authToken);
        console.log(authSuperToken);
      })
      .asCallback(done);
    });

    after(function() {
      return Promise.all([
        models.User.truncate({ logging: false }),
        models.Roles.truncate({ logging: false })
      ]);
    });

    it('Should list all users', function (done) {
      rp({
        method: 'GET',
        uri: (testData.baseURL + '/users/all'),
        headers: { 'Authorization': authSuperToken }
      })
      .then(function(response) {
        var result = JSON.parse(response);
        expect(result).to.have.lengthOf(3);
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('Should limit correctly on list all users', function (done) {
      rp({
        method: 'GET',
        uri: (testData.baseURL + '/users/all?limit=1'),
        headers: { 'Authorization': authSuperToken },

      })
      .then(function(response) {
        var result = JSON.parse(response);
        expect(result).to.have.lengthOf(1);
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('Should offset correctly on list all users', function (done) {
      rp({
        method: 'GET',
        uri: (testData.baseURL + '/users/all?offset=1'),
        headers: { 'Authorization': authSuperToken },

      })
      .then(function(response) {
        var result = JSON.parse(response);
        expect(result).to.have.lengthOf(2);
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('Should limit&offset correctly on list all users', function (done) {
      rp({
        method: 'GET',
        uri: (testData.baseURL + '/users/all?offset=1&limit=1'),
        headers: { 'Authorization': authSuperToken },

      })
      .then(function(response) {
        var result = JSON.parse(response);
        expect(result).to.have.lengthOf(1);
        expect(result[0]).to.have.property('name', testData.users[1].name);
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('Should fail to access a superuser endpoint without ADMIN role assigned', function (done) {
      rp({
        method: 'GET',
        uri: (testData.baseURL + '/users/all'),
        headers: { 'Authorization': authToken }
      })
      .then(function(response) {
        done('Should have responded with an error status when creating the user');
      })
      .catch(function(err) {
        expect(err).to.have.property('statusCode', errorTypes.emailInUse.status);
        done();
      });
    });
  });
};
