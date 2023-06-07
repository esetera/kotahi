const models = require('@pubsweet/models')

const stringifyResponse = cmsPage => {
  const data = cmsPage

  if (data) {
    data.meta = JSON.stringify(cmsPage.meta)
  }

  return data
}

const resolvers = {
  Query: {
    async cmsPages(_, vars, ctx) {
      const pages = await models.CMSPage.query()

      if (!pages) {
        return pages
      }

      return pages.map(page => stringifyResponse(page))
    },

    async cmsPage(_, { id }, ctx) {
      if (id) {
        const cmsPage = await models.CMSPage.query().findById(id)
        return stringifyResponse(cmsPage)
      }

      return null
    },

    async cmsPageByShortcode(_, { shortcode }, ctx) {
      if (shortcode) {
        const cmsPage = await models.CMSPage.query().findOne({ shortcode })
        return stringifyResponse(cmsPage)
      }

      return null
    },
  },
  Mutation: {
    async updateCMSPage(_, { id, input }, ctx) {
      const attrs = input

      if (attrs?.meta) {
        attrs.meta = JSON.parse(input.meta)
      }

      const cmsPage = await models.CMSPage.query().updateAndFetchById(id, input)
      return stringifyResponse(cmsPage)
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
    meta: String
  }

`

module.exports = { resolvers, typeDefs }
