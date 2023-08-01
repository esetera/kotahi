const { getNotificationOptionForUser } = require('./notificationCommsUtils')
const NotificationUserOption = require('./notificationUserOption')

const resolvers = {
  Query: {
    getGlobalChatNotificationOption: async (_, __, context) => {
      const notificationUserOption = await getNotificationOptionForUser({
        userId: context.user,
        type: 'globalChat',
      })

      return notificationUserOption === '30MinDigest'
    },
  },
  Mutation: {
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
  type NotificationUserOption {
    id: ID
    created: String
    updated: String
    userId: ID!
    path: [String]
    option: String!
  }

  extend type Query {
    getGlobalChatNotificationOption: Boolean
  }

  extend type Mutation {
    updateGlobalChatNotificationOption(option: String!): NotificationUserOption
  }
`

module.exports = { typeDefs, resolvers }
