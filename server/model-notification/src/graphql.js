const NotificationUserOption = require('./notificationUserOption')

const resolvers = {
  Query: {
    notificationOption: async (_, { path }, ctx) => {
      if (!ctx.user) {
        throw new Error(
          'Cannot retrieve notificationOption for an unregistered user',
        )
      }

      const groupId = ctx.req.headers['group-id']

      const notificationOption = await NotificationUserOption.query().findOne({
        userId: ctx.user,
        path: JSON.stringify(path),
        groupId,
      })

      // If notificationOption is null, treat it as unmuted (inherit)
      if (!notificationOption) {
        return { userId: ctx.user, path, groupId, option: 'inherit' }
      }

      return notificationOption
    },
  },
  Mutation: {
    updateNotificationOption: async (_, { path, option }, ctx) => {
      if (!ctx.user)
        throw new Error(
          'Cannot updateNotificationOption for an unregistered user',
        )
      if (!['off', 'inherit', '30MinSummary'].includes(option))
        throw new Error(
          `Unrecognized option '${option}' passed to updateNotificationOption`,
        )

      const groupId = ctx.req.headers['group-id']
      const userId = ctx.user

      // Find the existing record based on userId, path, and groupId
      const existingOption = await NotificationUserOption.query().findOne({
        userId,
        path: JSON.stringify(path),
        groupId,
      })

      if (existingOption) {
        // Update the 'option' field of the existing record
        return NotificationUserOption.query().patchAndFetchById(
          existingOption.id,
          { option },
        )
      }

      // If no existing record, create a new one
      return NotificationUserOption.query().upsertGraphAndFetch(
        { userId, path, groupId, option },
        { insertMissing: true },
      )
    },
  },
}

const typeDefs = `
  type NotificationUserOption {
    id: ID!
    created: DateTime!
    updated: DateTime
    userId: ID!
    path: [String!]!
    option: String!
    groupId: ID!
  }

  extend type Query {
    notificationOption(path: [String!]!): NotificationUserOption
  }

  extend type Mutation {
    updateNotificationOption(path: [String!]!, option: String!): NotificationUserOption
  }
`

module.exports = { typeDefs, resolvers }
