var Promise     = require('bluebird'),
    models      = require('../models'),
    utils       = require('../utils'),
    rp          = require('request-promise'),
    expect      = require('chai').expect,
    errorTypes  = require('../utils').errorTypes;

module.exports = function(testData) {
  describe('Roles tests', function() {
    var user, token;
    var testUser = {
      'name': 'test user',
      'email': 'test@email.com',
      'password': 'pass123'
    };

    after(function(done) {
      models.User.destroy({ where: { email: testUser.email }, logging: false })
      .asCallback(done);
    });

    before(function(done) {
      rp({
        method: 'POST',
        uri: (testData.baseURL + '/auth/register'),
        form: testUser
      })
      .then(function(res) {
        res = JSON.parse(res);
        token = res.token;
        user = res.user;
        return models.User.update({ //Hard ADMIN role assignment
          role: utils.roles.admin
        }, {
          where: { id: user.id },
          logging: false
        });
      })
      .asCallback(done);
    });


    it('should list existing roles', function (done) {
      rp({
        method: 'GET',
        uri: (testData.baseURL + '/roles'),
        headers: { 'Authorization': token }
      })
      .then(function(response) {
        var result = JSON.parse(response);
        expect(result).to.have.length.of.at.least(2);
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('should add a new role', function (done) {
      rp({
        method: 'POST',
        uri: (testData.baseURL + '/roles'),
        headers: { 'Authorization': token },
        form: { 'name': 'MASTER_OF_DISGUISE' }
      })
      .then(function(response) {
        var result = JSON.parse(response);
        expect(result).to.have.property('name', 'MASTER_OF_DISGUISE');
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('should delete an existing role', function (done) {
      rp({
        method: 'DELETE',
        uri: (testData.baseURL + '/roles/' + 'MASTER_OF_DISGUISE'),
        headers: { 'Authorization': token }
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
