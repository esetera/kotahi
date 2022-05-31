const models = require('@pubsweet/models')

const resolvers = {
  Query: {
    async threadedDiscussions(_, { where }, ctx) {
      return (
        models.ThreadedDiscussion.query()
          // .where({ parentId: null, isHidden: null })
          .orderBy('created', 'desc')
      )
    },
  },
}

module.exports = resolvers
