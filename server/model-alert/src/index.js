const alert = require('./alert')
const notificationUserOption = require('./notificationUserOption')
const graphql = require('./graphql')
const resolvers = require('./graphql')

module.exports = {
  // model,
  model: [
    { model: alert, modelName: 'Alert' },
    { model: notificationUserOption, modelName: 'NotificationUserOption' },
  ],
  modelName: 'Alert',
  resolvers,
  ...graphql,
}
