const models = require('@pubsweet/models')
const ThreadedDiscussion = require('./threadedDiscussion')

const getOriginalVersionManuscriptId = async manuscriptId => {
  const ms = await models.Manuscript.query()
    .select('parentId')
    .findById(manuscriptId)

  const parentId = ms ? ms.parentId : null
  return parentId || manuscriptId
}

/** Returns a threadedDiscussion that strips out all pendingVersions not for this userId,
 * then all comments that don't have any remaining pendingVersions or commentVersions,
 * then all threads that don't have any remaining comments.
 * Also adds flags indicating what the user is permitted to do.
 */
const stripHiddenAndAddUserFlags = (discussion, userId) => ({
  ...discussion,
  threads: discussion.threads
    .map(thread => ({
      ...thread,
      comments: thread.comments
        .map(c => ({
          ...c,
          pendingVersions: c.pendingVersions.filter(pv => pv.userId === userId),
        }))
        .filter(c => c.commentVersions.length || c.pendingVersions.length),
    }))
    .filter(t => t.comments.length),
  userCanAddComment: true, // TODO give a sensible value
  userCanEditOwnComment: true, // TODO give a sensible value
  userCanEditAnyComment: true, // TODO give a sensible value
})

const resolvers = {
  Query: {
    async threadedDiscussions(_, { manuscriptId: msVersionId }) {
      const manuscriptId = await getOriginalVersionManuscriptId(msVersionId)

      const result = await models.ThreadedDiscussion.query()
        .where({ manuscriptId })
        .orderBy('created', 'desc')

      return result.map(discussion =>
        stripHiddenAndAddUserFlags({
          ...discussion,
          threads: JSON.parse(discussion.threads),
        }),
      )
    },
  },

  Mutation: {
    async updatePendingComment(
      _,
      {
        manuscriptId: msVersionId,
        threadedDiscussionId,
        threadId,
        commentId,
        pendingVersionId,
        comment,
      },
      ctx,
    ) {
      // TODO ensure that the current user is permitted to comment
      // TODO update dates at the appropriate places
      const manuscriptId = await getOriginalVersionManuscriptId(msVersionId)

      let discussion = await ThreadedDiscussion.query().where({
        id: threadedDiscussionId,
      })
      if (discussion) discussion.threads = JSON.parse(discussion.threads)
      else discussion = { id: threadedDiscussionId, manuscriptId, threads: [] }

      let thread = discussion.threads.find(t => t.id === threadId)

      if (!thread) {
        thread = { id: threadId, comments: [] }
        discussion.threads.push(thread)
      }

      let commnt = thread.comments.find(c => c.id === commentId)

      if (!commnt) {
        commnt = { id: commentId, commentVersions: [], pendingVersions: [] }
        thread.comments.push(commnt)
      }

      let pendingVersion = comment.pendingVersions.find(
        pv => pv.id === pendingVersionId,
      )

      if (!pendingVersion) {
        pendingVersion = { id: pendingVersionId, userId: ctx.user }
        comment.pendingVersions.push(pendingVersion)
      }

      if (pendingVersion.userId !== ctx.user)
        throw new Error(
          `Illegal attempt by user ${ctx.user} to edit a pending comment by user ${pendingVersion.userId}`,
        )

      pendingVersion.comment = comment

      await ThreadedDiscussion.query().updateAndFetchById(
        threadedDiscussionId,
        { ...discussion, threads: JSON.stringify(discussion.threads) },
      )

      return stripHiddenAndAddUserFlags(discussion, ctx.user)
    },
    async completeComment(
      _,
      { threadedDiscussionId, threadId, commentId, pendingVersionId },
      ctx,
    ) {
      // TODO ensure that the current user is permitted to comment
      // TODO update dates at the appropriate places
      const discussion = await ThreadedDiscussion.query().where({
        id: threadedDiscussionId,
      })

      if (!discussion)
        throw new Error(
          `threadedDiscussion with ID ${threadedDiscussionId} not found`,
        )
      discussion.threads = JSON.parse(discussion.threads)
      const thread = discussion.threads.find(t => t.id === threadId)
      if (!thread) throw new Error(`thread with ID ${threadId} not found`)
      const comment = thread.comments.find(c => c.id === commentId)
      if (!comment)
        throw new Error(`thread comment with ID ${commentId} not found`)

      const pendingVersion = comment.pendingVersions.find(
        pv => pv.id === pendingVersionId,
      )

      if (!pendingVersion)
        throw new Error(`pendingVersion with ID ${pendingVersionId} not found`)
      if (pendingVersion.userId !== ctx.user)
        throw new Error(
          `Illegal attempt by user ${ctx.user} to complete a pending comment by user ${pendingVersion.userId}`,
        )

      comment.pendingVersions = comment.pendingVersions.filter(
        pv => pv.id !== pendingVersionId,
      )
      comment.commentVersions.push({
        id: pendingVersionId,
        userId: ctx.user,
        comment: pendingVersion.comment,
      })
      await ThreadedDiscussion.query().updateAndFetchById(
        threadedDiscussionId,
        { ...discussion, threads: JSON.stringify(discussion.threads) },
      )

      return stripHiddenAndAddUserFlags(discussion, ctx.user)
    },
  },
}

const typeDefs = `
extend type Query {
  threadedDiscussions(manuscriptId: ID!): [ThreadedDiscussion!]!
}
extend type Mutation {
  updatePendingComment(manuscriptId: ID!, threadedDiscussionId: ID!, threadId: ID!, commentId: ID!, pendingVersionId: ID!, comment: String): ThreadedDiscussion!
  completeComment(threadedDiscussionId: ID!, threadId: ID!, commentId: ID!, pendingVersionId: ID!): ThreadedDiscussion!
}

type ThreadedDiscussion {
  id: ID!
  created: DateTime!
  updated: DateTime
  manuscriptId: ID!
  threads: [DiscussionThread!]!
  userCanAddComment: Boolean!
  userCanEditOwnComment: Boolean!
  userCanEditAnyComment: Boolean!
}

type DiscussionThread {
  id: ID
  created: DateTime
  updated: DateTime
  comments: [ThreadComment]
}

type ThreadComment {
  id: ID!
  created: DateTime!
  updated: DateTime
  commentVersions: [ThreadedCommentVersion!]!
  pendingVersions: [ThreadedCommentVersion!]!
}

type ThreadedCommentVersion {
  id: ID!
  created: DateTime!
  updated: DateTime
  userId: ID!
  comment: String!
}

input CreateThreadedDiscussionsInput {
  comment: String
  manuscriptId: ID!
}

input CreateCommentInput {
  comment: String
  manuscriptId: ID!
}
`

module.exports = { typeDefs, resolvers }
