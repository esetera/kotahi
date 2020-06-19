const logger = require('@pubsweet/logger')
const { AuthorizationError, ConflictError } = require('@pubsweet/errors')

const eager = undefined

const resolvers = {
  Query: {
    user(_, { id }, ctx) {
      return ctx.connectors.User.fetchOne(id, ctx, { eager })
    },
    async users(_, { sort, offset, limit, filter }, ctx) {
      const query = ctx.connectors.User.model.query()

      if (filter && filter.admin) {
        query.where({ admin: true })
      }

      if (sort) {
        // e.g. 'created_DESC' into 'created' and 'DESC' arguments
        query.orderBy(...sort.split('_'))
      }

      if (limit) {
        query.limit(limit)
      }

      if (offset) {
        query.offset(offset)
      }

      return query
      // return ctx.connectors.User.fetchAll(where, ctx, { eager })
    },
    // Authentication
    currentUser(_, vars, ctx) {
      if (!ctx.user) return null
      return ctx.connectors.User.model.find(ctx.user, { eager })
    },
    searchUsers(_, { teamId, query }, ctx) {
      if (teamId) {
        return ctx.connectors.User.model
          .query()
          .where({ teamId })
          .where('username', 'ilike', `${query}%`)
      }
      return ctx.connectors.User.model
        .query()
        .where('username', 'ilike', `${query}%`)
    },
  },
  Mutation: {
    async createUser(_, { input }, ctx) {
      const user = {
        username: input.username,
        email: input.email,
        passwordHash: await ctx.connectors.User.model.hashPassword(
          input.password,
        ),
      }

      const identity = {
        type: 'local',
        aff: input.aff,
        name: input.name,
        isDefault: true,
      }
      user.defaultIdentity = identity

      try {
        const result = await ctx.connectors.User.create(user, ctx, {
          eager: 'defaultIdentity',
        })

        return result
      } catch (e) {
        if (e.constraint) {
          throw new ConflictError(
            'User with this username or email already exists',
          )
        } else {
          throw e
        }
      }
    },
    deleteUser(_, { id }, ctx) {
      return ctx.connectors.User.delete(id, ctx)
    },
    async updateUser(_, { id, input }, ctx) {
      if (input.password) {
        input.passwordHash = await ctx.connectors.User.model.hashPassword(
          input.password,
        )
        delete input.password
      }

      return ctx.connectors.User.update(id, input, ctx)
    },
    // Authentication
    async loginUser(_, { input }, ctx) {
      const authentication = require('pubsweet-server/src/authentication')

      let isValid = false
      let user
      try {
        user = await ctx.connectors.User.model.findByUsername(input.username)
        isValid = await user.validPassword(input.password)
      } catch (err) {
        logger.debug(err)
      }
      if (!isValid) {
        throw new AuthorizationError('Wrong username or password.')
      }
      return {
        user,
        token: authentication.token.create(user),
      }
    },
    async updateCurrentUsername(_, { username }, ctx) {
      const user = await ctx.connectors.User.model.find(ctx.user)
      user.username = username
      await user.save()
      return user
    },
  },
  User: {
    async defaultIdentity(parent, args, ctx) {
      const identity = await ctx.connectors.Identity.model
        .query()
        .where({ userId: parent.id, isDefault: true })
        .first()
      return identity
    },
    async identities(parent, args, ctx) {
      const identities = await ctx.connectors.Identity.model
        .query()
        .where({ userId: parent.id })
      return identities
    },
  },
  LocalIdentity: {
    __isTypeOf: (obj, context, info) => obj.type === 'local',
    async email(obj, args, ctx, info) {
      // Emails stored on user, but surfaced in local identity too
      return (await ctx.loaders.User.load(obj.userId)).email
    },
  },
  ExternalIdentity: {
    __isTypeOf: (obj, context, info) => obj.type !== 'local',
  },
}

const typeDefs = `
  extend type Query {
    user(id: ID, username: String): User
    users(sort: UsersSort, offset: Int, limit: Int, filter: UsersFilter): [User]
    searchUsers(teamId: ID, query: String): [User]
  }

  extend type Mutation {
    createUser(input: UserInput): User
    deleteUser(id: ID): User
    updateUser(id: ID, input: UserInput): User
    updateCurrentUsername(username: String): User
  }

  input UsersFilter {
    admin: Boolean
  }

  enum UsersSort {
    username_ASC
    username_DESC
    email_ASC
    email_DESC
    admin_ASC
    admin_DESC
    created_ASC
    created_DESC
  }

  type User {
    id: ID!
    created: DateTime!
    updated: DateTime
    username: String
    email: String
    admin: Boolean
    identities: [Identity]
    defaultIdentity: Identity
    profilePicture: String
    online: Boolean
  }

  type Name {
    surname: String
    givenNames: String
    title: String
  }

  interface Identity {
    name: Name
    aff: String # JATS <aff>
    email: String # JATS <aff>
    type: String
  }

  # union Identity = Local | External

  # local identity (not from ORCID, etc.)
  type LocalIdentity implements Identity {
    name: Name
    email: String
    aff: String
    type: String
  }

  type ExternalIdentity implements Identity {
    name: Name
    identifier: String
    email: String
    aff: String
    type: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String
    rev: String
  }

  # Authentication

  extend type Query {
    # Get the currently authenticated user based on the JWT in the HTTP headers
    currentUser: User
  }

  extend type Mutation {
    # Authenticate a user using username and password
    loginUser(input: LoginUserInput): LoginResult
  }

  # User details and bearer token
  type LoginResult {
    user: User!
    token: String!
  }

  input LoginUserInput {
    username: String!
    password: String!
  }
`

module.exports = { resolvers, typeDefs }
