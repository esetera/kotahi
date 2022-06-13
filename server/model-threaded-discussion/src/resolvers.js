const models = require('@pubsweet/models')
const ThreadedDiscussion = require('./threadedDiscussion')

const resolvers = {
  Query: {
    async threadedDiscussions(_,{manuscriptId}) {
      // console.log(manuscriptId, 'manuscriptId')
      return models.ThreadedDiscussion.query().where({manuscriptId}).orderBy('created', 'desc')
    },
  },

  Mutation: {
    async addThread(_, { comment, ...rest }) {
      const threadedDiscussion = await ThreadedDiscussion.query().insertAndFetch(
        {
          ...rest,
          threads: [comment],
        },
      )

      return { ...threadedDiscussion }
    },

    // async updateThreadedDiscussions(_, { id, thread }) {
    //   return models.ThreadedDiscussion.query().updateAndFetchById(id, JSON.parse(thread))
    // },
  },
}

module.exports = resolvers
