var expect    = require('chai').expect,
    authTest  = require('./auth.js'),
    usersTest = require('./users.js'),
    rolesTest = require('./roles.js'),
    testData  = {
      baseURL: process.env.TEST_URL || 'http://localhost:5000'
    };

describe('Test Suite', function() {
  this.timeout(5000);

  authTest(testData);

  usersTest(testData);

  rolesTest(testData);
});
