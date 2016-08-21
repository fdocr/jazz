var Promise     = require('bluebird'),
    models      = require('../models'),
    utils       = require('../utils'),
    rp          = require('request-promise'),
    expect      = require('chai').expect,
    errorTypes  = require('../utils').errorTypes;

module.exports = function(testData) {
  var ids = [], tokens = [];
  describe('Users tests', function() {
    after(function() {
      return models.User.truncate({ logging: false });
    });

    before(function(done) {
      rp({  //Ordered inserts to test sort/limit/offset endpoints
        method: 'POST',
        uri: (testData.baseURL + '/auth/register'),
        form: testData.users[0]
      })
      .then(function(usr) {
        usr = JSON.parse(usr);
        tokens.push(usr.token);
        ids.push(usr.user.id);
        return rp({
          method: 'POST',
          uri: (testData.baseURL + '/auth/register'),
          form: testData.users[1]
        });
      })
      .then(function(usr) {
        usr = JSON.parse(usr);
        tokens.push(usr.token);
        ids.push(usr.user.id);
        return rp({
          method: 'POST',
          uri: (testData.baseURL + '/auth/register'),
          form: testData.users[2]
        });
      })
      .then(function(usr) {
        usr = JSON.parse(usr);
        tokens.push(usr.token);
        ids.push(usr.user.id);

        return models.User.update({ //Hard ADMIN role assignment
          role: utils.roles.admin
        }, {
          where: { id: ids[0] },
          logging: false
        });
      })
      .asCallback(done);
    });

    it('should fail to access a superuser endpoint without ADMIN role assigned', function (done) {
      rp({
        method: 'GET',
        uri: (testData.baseURL + '/users/all'),
        headers: { 'Authorization': tokens[1] }
      })
      .then(function(response) {
        done('should have responded with an error status when creating the user');
      })
      .catch(function(err) {
        expect(err).to.have.property('statusCode', errorTypes.unauthorized.status);
        done();
      });
    });

    it('should list all users with valid credentials', function (done) {
      rp({
        method: 'GET',
        uri: (testData.baseURL + '/users/all'),
        headers: { 'Authorization': tokens[0] }
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

    it('should limit correctly on list all users', function (done) {
      rp({
        method: 'GET',
        uri: (testData.baseURL + '/users/all?limit=1'),
        headers: { 'Authorization': tokens[0] },

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

    it('should offset correctly on list all users', function (done) {
      rp({
        method: 'GET',
        uri: (testData.baseURL + '/users/all?offset=1'),
        headers: { 'Authorization': tokens[0] },

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

    it('should limit&offset correctly on list all users', function (done) {
      rp({
        method: 'GET',
        uri: (testData.baseURL + '/users/all?offset=1&limit=1'),
        headers: { 'Authorization': tokens[0] },

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

    it('should return the authenticated user', function (done) {
      rp({
        method: 'GET',
        uri: (testData.baseURL + '/users/me'),
        headers: { 'Authorization': tokens[0] },

      })
      .then(function(response) {
        var result = JSON.parse(response);
        expect(result).to.have.property('name', testData.users[0].name);
        expect(result).to.have.property('email', testData.users[0].email);
        expect(result).to.not.have.property('password');
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('should get user by id', function (done) {
      rp({
        method: 'GET',
        uri: (testData.baseURL + '/users/' + ids[1]),
        headers: { 'Authorization': tokens[0] },

      })
      .then(function(response) {
        var result = JSON.parse(response);
        expect(result).to.have.property('name', testData.users[1].name);
        expect(result).to.have.property('email', testData.users[1].email);
        expect(result).to.not.have.property('password');
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('should edit my user data', function (done) {
      rp({
        method: 'PUT',
        uri: (testData.baseURL + '/users/me'),
        headers: { 'Authorization': tokens[2] },
        form: {
          'name': 'NEW NAME',
          'trolls': 'gonna troll'
        }
      })
      .then(function(response) {
        var result = JSON.parse(response);
        expect(result).to.have.property('success', true);
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('should edit user data by id', function (done) {
      rp({
        method: 'PUT',
        uri: (testData.baseURL + '/users/' + ids[2]),
        headers: { 'Authorization': tokens[0] },
        form: {
          'email': 'fancy@email.com',
          'rubbish': 'data'
        }
      })
      .then(function(response) {
        var result = JSON.parse(response);
        expect(result).to.have.property('success', true);
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('should delete my own user', function (done) {
      rp({
        method: 'DELETE',
        uri: (testData.baseURL + '/users/me'),
        headers: { 'Authorization': tokens[2] }
      })
      .then(function(response) {
        var result = JSON.parse(response);
        expect(result).to.have.property('bye', 'bye');
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('should delete user by id', function (done) {
      rp({
        method: 'DELETE',
        uri: (testData.baseURL + '/users/' + ids[1]),
        headers: { 'Authorization': tokens[0] }
      })
      .then(function(response) {
        var result = JSON.parse(response);
        expect(result).to.have.property('bye', 'bye');
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });
  });
};
