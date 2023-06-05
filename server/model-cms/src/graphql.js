const models = require('@pubsweet/models')

const resolvers = {
  Query: {
    async cmsPages(_, vars, ctx) {
      return models.CMSPage.query()
    },

    async cmsPage(_, { id }, ctx) {
      if (id) {
        const cmsPage = await models.CMSPage.query().findById(id)
        return cmsPage
      }
      return null
    },

    async cmsPageByShortcode(_, { shortcode }, ctx) {
      if (shortcode) {
        const cmsPage = await models.CMSPage.query().findOne({ shortcode })
        return cmsPage
      }
      return null
    },
  },
  Mutation: {
    async updateCMSPage(_, { id, input }, ctx) {
      return models.CMSPage.query().updateAndFetchById(id, input)
    },
  },
}

const typeDefs = `
  extend type Query {
    cmsPage(id: ID): CMSPage
    cmsPageByShortcode(shortcode: String!): CMSPage
    cmsPages: [CMSPage]
  }

  extend type Mutation {
    updateCMSPage(id: ID, input: CMSPageInput): CMSPage
  }

  type CMSPage {
    id: ID!
    shortcode: String!
    title: String!
    status: String!
    content: String
    meta: String
    creator: User
    created: DateTime!
    updated: DateTime
  }

  type Content {
    title: String
    header: String
    body: String
    footer: String
  }

  input CMSPageInput {
    title: String
    content: String
  }

 
`

module.exports = { resolvers, typeDefs }
