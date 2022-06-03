const models = require('@pubsweet/models')
const ThreadedDiscussion = require('./threadedDiscussion')

const resolvers = {
  Query: {
    async threadedDiscussions(_,) {
      return (
        models.ThreadedDiscussion.query().orderBy('created', 'desc')
      )
    }
  },

  Mutation: {
    // async deleteThreadedDiscussions(_, { id }) {
    //   return models.ThreadedDiscussion.query().deleteById(id)
    // },

    async createThreadedDiscussions(_, { threadedDiscussion }) {
      return ThreadedDiscussion.query().insertAndFetch(threadedDiscussion)
    },
    
    // async updateThreadedDiscussions(_, { id, thread }) {
    //   return models.ThreadedDiscussion.query().updateAndFetchById(id, JSON.parse(thread))
    // },
  },
}

module.exports = resolvers
