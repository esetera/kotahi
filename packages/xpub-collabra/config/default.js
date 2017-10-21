const path = require('path')
const authsome = require('./authsome')
const components = require('./components.json')
const validations = require('./validations')

const environment = process.env.NODE_ENV || 'development'

module.exports = {
  authsome,
  validations,
  pubsweet: {
    components
  },
  'pubsweet-client': {
    'API_ENDPOINT': 'http://localhost:3000/api',
    'login-redirect': '/',
    'redux-log': false,
    theme: process.env.PUBSWEET_THEME
  },
  'pubsweet-server': {
    dbPath: process.env.PUBSWEET_DB || path.join(__dirname, '..', 'api', 'db', environment),
  },
  'mail-transport': {
    sendmail: true
  },
  'password-reset': {
    url: process.env.PUBSWEET_PASSWORD_RESET_URL || 'http://localhost:3000/password-reset',
    sender: process.env.PUBSWEET_PASSWORD_RESET_SENDER || 'dev@example.com'
  },
  'pubsweet-component-ink-backend': {
    inkEndpoint: process.env.INK_ENDPOINT || 'http://ink-api.coko.foundation',
    email: process.env.INK_USERNAME,
    password: process.env.INK_PASSWORD,
    maxRetries: 500
  },
}
