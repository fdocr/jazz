var expect = require('chai').expect,
		bcrypt = require('bcrypt'),
		config = require('../config');

module.exports = function() {
	describe('Auth test suite', function() {
		it('Should register a user correctly', function(done) {
			
		});


	  it('Should return a JWT from a valid user request to authenticate', function(done) {
			var testPassword = 'password123';
			console.log('DATA');
			console.log(testPassword);
			console.log(config.secretHash);
			var syncHash = bcrypt.hashSync(testPassword, config.secretHash);

			utils.encryptPass(testPassword)
			.then(function(promisifiedHash) {
				expect(syncHash).to.be.equal.to(promisifiedHash);
				done();
			})
			.catch(function(err) {
				done(err);
			});
		});
	});
};
