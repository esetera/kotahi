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
    getGlobalChatNotificationOption: async (_, __, context) => {
      // [TODO-1344]: need to move this logic to a separate utility function
      // [TODO-1344]: this only returns the one option. Ideally it should return ['chat'] as well as [] for user
      const notificationUserOption = await NotificationUserOption.query()
        .where('userId', context.user)
        .where('path', ['chat'])
        .first()

      if (notificationUserOption) {
        return notificationUserOption.option === '30MinDigest'
      }

      return true // hardcoded default. [TODO-1344]: move to config
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
    updateGlobalChatNotificationOption: async (_, { option }, context) => {
      const globalChatOption = await NotificationUserOption.query()
        .skipUndefined()
        .where('user_id', context.user)
        .where('path', ['chat'])

      // [TODO-1344]: the code below can be replaced by a single upsert statement
      if (!globalChatOption || globalChatOption.length === 0) {
        const notificationOptionData = {
          created: new Date(),
          userId: context.user,
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
          .where('user_id', context.user)
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

  type NotificationUserOption {
    id: ID
    created: String
    updated: String
    userId: ID!
    path: [String]
    option: String!
  }

  extend type Query {
    alert(id: ID): Alert
    alerts: [Alert]
    getGlobalChatNotificationOption: Boolean
  }

  extend type Mutation {
    createAlert(input: AlertInput): Alert
    updateGlobalChatNotificationOption(option: String!): NotificationUserOption
  }
`

module.exports = { typeDefs, resolvers }
