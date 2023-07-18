const Alert = require('./alert')
const { getNotificationOptionForUser } = require('./alertCommsUtils')
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
      return getNotificationOptionForUser({
        userId: context.user,
        type: 'globalChat',
      })
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
        .where({ userId: context.user, path: ['chat'] })
        .first()

      // [TODO-1344]: the code below can be replaced by a single upsert statement
      if (!globalChatOption) {
        const notificationOptionData = {
          created: new Date(),
          userId: context.user,
          path: '{chat}',
          option: 'off',
        }

        if (option === 'on') {
          notificationOptionData.option = '30MinDigest'
        }

        // [TODO-1344]: need to use model.save() instead of model.query().insert()
        await new NotificationUserOption(notificationOptionData)
          .$query()
          .insert()
      } else {
        let optionToSave = 'off'

        if (option === 'on') {
          optionToSave = '30MinDigest'
        }

        await NotificationUserOption.query()
          .where({ userId: context.user, path: ['chat'] })
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
