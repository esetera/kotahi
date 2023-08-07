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
        path: `{${path.join(',')}}`,
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
      const existingOptions = await NotificationUserOption.query()
        .where({ userId, groupId })
        .whereRaw('path = ?', `{${path.join(',')}}`)

      if (existingOptions.length > 0) {
        // Update the 'option' field of the existing record
        // eslint-disable-next-line no-restricted-syntax
        for (const existingOption of existingOptions) {
          return NotificationUserOption.query().patchAndFetchById(
            existingOption.id,
            { option },
          )
        }
      }

      // If no existing record, create a new one
      // eslint-disable-next-line no-return-await
      return await NotificationUserOption.query().insert({
        userId,
        path,
        groupId,
        option,
      })
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
