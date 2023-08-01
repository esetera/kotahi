/* eslint-disable global-require */

module.exports = {
  ...require('./graphql'),
  models: [{ modelName: 'Alert', model: require('./alert') }],
}
