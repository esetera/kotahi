const Alert = require('./alert')
const NotificationUserOption = require('./notificationUserOption')

const resolvers = {
  Query: {
    alert: async (_, { id }, context) => {
      return Alert.find(id)
    },
    alerts: async (_, __, context) => {
      return Alert.all()
    },
  },
  Mutation: {
    createAlert: async (
      _,
      { input: { title, userId, messageId } },
      context,
    ) => {
      const alert = await new Alert({
        title,
        userId,
        messageId,
        triggerTime: new Date(),
        isSent: false,
      }).save()

      return alert
    },
    updateGlobalChatNotificationOptionForUser: async (
      _,
      { userId, option },
    ) => {
      const globalChatOption = await NotificationUserOption.query()
        .skipUndefined()
        .where('user_id', userId)
        .where('path', ['chat'])

      // TODO: the code below can be replaced by a single upsert statement
      if (!globalChatOption || globalChatOption.length === 0) {
        const notificationOptionData = {
          created: new Date(),
          userId,
          path: '{chat}',
          option: 'off',
        }

        if (option === 'on') {
          notificationOptionData.option = '30MinDigest'
        }

        await new NotificationUserOption(notificationOptionData).save()
      } else {
        let optionToSave = 'off'

        if (option === 'on') {
          optionToSave = '30MinDigest'
        }

        await NotificationUserOption.query()
          .where('path', ['chat'])
          .where('user_id', userId)
          .patch({ option: optionToSave })
      }
    },
  },
}

const typeDefs = `
  type Alert {
    id: ID
    title: String!
    user: User!
    message: Message
    triggerTime: DateTime
    isSent: Boolean!
    created: DateTime!
    updated: DateTime
  }

  input AlertInput {
    title: String!
    userId: ID!
    messageId: ID
  }

  extend type Query {
    alert(id: ID): Alert
    alerts: [Alert]
  }

  extend type Mutation {
    createAlert(input: AlertInput): Alert
  }
`

module.exports = { typeDefs, resolvers }
