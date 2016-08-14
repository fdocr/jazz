var currentEnv = process.env.NODE_ENV || 'development';
module.exports = require('./env/' + currentEnv + '.js');
