const config = require('config');

module.exports = {
  development: config.get('pg'),
  production: config.get('pg')
};
