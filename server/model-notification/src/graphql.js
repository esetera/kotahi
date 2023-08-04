const { getNotificationOptionForUser } = require('./notificationCommsUtils')
const NotificationUserOption = require('./notificationUserOption')

const resolvers = {
  Query: {
    getGlobalChatNotificationOption: async (_, __, ctx) => {
      const notificationUserOption = await getNotificationOptionForUser({
        userId: ctx.user,
        type: 'globalChat',
        groupId: ctx.req.headers['group-id'],
      })

      return notificationUserOption === '30MinSummary'
    },
  },
  Mutation: {
    updateGlobalChatNotificationOption: async (_, { option }, ctx) => {
      const groupId = ctx.req.headers['group-id']

      const globalChatOption = await NotificationUserOption.query()
        .skipUndefined()
        .where({
          userId: ctx.user,
          path: ['chat'],
          groupId,
        })
        .first()

      if (!globalChatOption) {
        const notificationOptionData = {
          created: new Date(),
          userId: ctx.user,
          path: '{chat}',
          option: 'off',
        }

        if (option === 'on') {
          notificationOptionData.option = '30MinSummary'
        }

        await new NotificationUserOption(notificationOptionData)
          .$query()
          .insert()
      } else {
        let optionToSave = 'off'

        if (option === 'on') {
          optionToSave = '30MinSummary'
        }

        await NotificationUserOption.query()
          .where({ userId: ctx.user, path: ['chat'], groupId })
          .patch({ option: optionToSave })
      }
    },
  },
}

const typeDefs = `
  type NotificationUserOption {
    id: ID
    created: DateTime!
    updated: DateTime
    userId: ID!
    path: [String!]!
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
