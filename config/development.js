const { deferConfig } = require('config/defer')

module.exports = {
  'pubsweet-server': {
    secret: 'hi',
    baseUrl: deferConfig(
      cfg => `http://localhost:${cfg['pubsweet-server'].port}`,
    ),
    secret: 'secret-string',
  },
  dbManager: {
    username: 'admin',
    password: 'password',
    email: 'admin@example.com',
    admin: true,
  },
}
