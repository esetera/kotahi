/* eslint-disable global-require */

module.exports = {
  ...require('./graphql'),
  models: [
    { modelName: 'Alert', model: require('./alert') },
    {
      modelName: 'NotificationUserOption',
      model: require('./notificationUserOption'),
    },
    { modelName: 'NotificationDigest', model: require('./notificationDigest') },
  ],
}
