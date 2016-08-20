var expect    = require('chai').expect,
    authTest  = require('./auth.js'),
    usersTest = require('./users.js'),
    testData  = {
      baseURL: process.env.TEST_URL || 'http://localhost:5000',
      users: [
        {
          'name': 'test user',
          'email': 'test@email.com',
          'password': 'pass123'
        },
        {
          'name': 'test user2',
          'email': 'test2@email.com',
          'password': 'pass123'
        },
        {
          'name': 'test user3',
          'email': 'test3@email.com',
          'password': 'pass123',
          'RoleName': 'ADMIN'
        }
      ]
    };

describe('Test Suite', function() {
  this.timeout(5000);

  authTest(testData);

  usersTest(testData);
});
