// const models = require('@pubsweet/models')
// const ThreadedDiscussion = require('./threadedDiscussion')

// const resolvers = {
//     Query: {
//       async threadedDiscussions(_, { manuscriptId }) {
//         console.log(threadedDiscussions,'threadedDiscussions')
//         console.log(manuscriptId, 'manuscriptId')
//         const result = await models.ThreadedDiscussion.query()
//           .where({ manuscriptId: manuscriptId })
//           .orderBy('created', 'desc')

//         // return result.map(discussion => ({
//         //   ...discussion,
//         //   threads: JSON.parse(discussion.threads),
//         // }))
//       },
//     },

//   Mutation: {
//     async addThread(_, { comment, ...rest }) {
//       const threadedDiscussion = await ThreadedDiscussion.query().insertAndFetch(
//         {
//           ...rest,
//           threads: [comment],
//         },
//       )

//       return { ...threadedDiscussion }
//     },
//   },
// }

// module.exports = resolvers
