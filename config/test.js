const { deferConfig } = require('config/defer')

module.exports = {
  'pubsweet-server': {
    db: { database: 'test' },
    port: 4000,
    baseUrl: deferConfig(
      cfg => `http://localhost:${cfg['pubsweet-server'].port}`,
    ),
    secret: 'secret-string',
  },
  secret: 'test',
  mailer: {
    transport: {
      sendmail: false,
      port: 1025,
      auth: {
        user: 'user',
        pass: 'pass',
      },
    },
  },
}
