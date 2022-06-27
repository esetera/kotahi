const models = require('@pubsweet/models')

const getOriginalVersionManuscriptId = async manuscriptId => {
  const ms = await models.Manuscript.query()
    .select('parentId')
    .findById(manuscriptId)

  const parentId = ms ? ms.parentId : null
  return parentId || manuscriptId
}

const filterDistinct = (id, index, arr) => arr.indexOf(id) === index

/** Returns a threadedDiscussion that strips out all pendingVersions not for this userId,
 * then all comments that don't have any remaining pendingVersions or commentVersions,
 * then all threads that don't have any remaining comments.
 * Also adds flags indicating what the user is permitted to do.
 */
const stripHiddenAndAddUserInfo = async (discussion, userId) => {
  const userIds = discussion.threads
    .map(t =>
      t.comments.map(c =>
        c.commentVersions
          .map(v => v.userId)
          .concat(c.pendingVersions.map(v => v.userId)),
      ),
    )
    .flat(2)
    .filter(filterDistinct)

  const users = await models.User.query().findByIds(userIds)
  const usersMap = {}
  users.forEach(u => (usersMap[u.id] = u))

  return {
    ...discussion,
    threads: discussion.threads
      .map(thread => ({
        ...thread,
        comments: thread.comments
          .map(c => ({
            ...c,
            commentVersions: c.commentVersions.map(cv => ({
              ...cv,
              author: usersMap[cv.userId],
            })),
            pendingVersions: c.pendingVersions
              .filter(pv => pv.userId === userId)
              .map(pv => ({ ...pv, author: usersMap[pv.userId] })),
          }))
          .filter(c => c.commentVersions.length || c.pendingVersions.length),
      }))
      .filter(t => t.comments.length),
    userCanAddComment: true, // TODO give a sensible value
    userCanEditOwnComment: true, // TODO give a sensible value
    userCanEditAnyComment: true, // TODO give a sensible value
  }
}

const resolvers = {
  Query: {
    async threadedDiscussions(_, { manuscriptId: msVersionId }, ctx) {
      const manuscriptId = await getOriginalVersionManuscriptId(msVersionId)

      const result = await models.ThreadedDiscussion.query()
        .where({ manuscriptId })
        .orderBy('created', 'desc')

      // TODO This is TEST DATA: remove once we're getting useful values from the DB.
      // TODO Modify the query to embed full user objects instead of just userIds.
      // const threadedDiscussions = [
      //   {
      //     id: '7416150c-2b25-4839-a94c-e4e1a0e35aeb',
      //     created: 1655825019000,
      //     updated: 1655825019000,
      //     manuscriptId: '07a26ea9-872f-4c04-8d3f-8e0097aa58dd', // Your manuscriptId here!
      //     threads: [
      //       {
      //         id: '26af5cc0-4e1d-4361-bcc3-432030ec2356',
      //         created: 1655825019000,
      //         updated: 1655825019000,
      //         comments: [
      //           {
      //             id: 'd9693775-4203-442a-9620-f11adc889f6a',
      //             created: 1655825019000,
      //             updated: 1655825019000,
      //             commentVersions: [
      //               {
      //                 id: 'ffa8357a-a589-4469-9d84-bbbad1c793af',
      //                 created: 1655825019000,
      //                 updated: 1655825019000,
      //                 userId: '3c0beafa-4dbb-46c7-9ea8-dc6d6e8f4436', // '906f42a3-64da-4cb0-8f72-f6a51d3a3452', // Someone's user ID here
      //                 comment: '<p class="paragraph">Existing comment</p>',
      //               },
      //             ],
      //             pendingVersions: [],
      //           },
      //           {
      //             id: '3e85a7e6-b223-4994-90f6-9173c4a8a284',
      //             created: 1655825019000,
      //             updated: 1655825019000,
      //             commentVersions: [],
      //             pendingVersions: [
      //               {
      //                 id: 'a37d2394-8e1e-48dd-bba9-d16e2dd535c3',
      //                 created: 1655825019000,
      //                 updated: 1655825019000,
      //                 userId: '3c0beafa-4dbb-46c7-9ea8-dc6d6e8f4436', // Your user ID here
      //                 comment: '<p class="paragraph">Hello!</p>',
      //               },
      //             ],
      //           },
      //         ],
      //       },
      //     ],
      //     userCanAddComment: true,
      //     userCanEditOwnComment: true,
      //     userCanEditAnyComment: true,
      //   },
      // ].map(d => ({ ...d, threads: JSON.stringify(d.threads) }))

      return Promise.all(
        result.map(async discussion =>
          stripHiddenAndAddUserInfo(
            {
              ...discussion,
              threads: JSON.parse(discussion.threads),
            },
            ctx.user,
          ),
        ),
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
      const now = new Date().toISOString()
      const manuscriptId = await getOriginalVersionManuscriptId(msVersionId)

      let discussion = await models.ThreadedDiscussion.query().findById(
        threadedDiscussionId,
      )
      if (discussion) discussion.threads = JSON.parse(discussion.threads)
      else
        discussion = {
          id: threadedDiscussionId,
          manuscriptId,
          threads: [],
          created: now,
        }
      discussion.updated = now

      let thread = discussion.threads.find(t => t.id === threadId)

      if (!thread) {
        thread = { id: threadId, comments: [], created: now }
        discussion.threads.push(thread)
      }

      thread.updated = now

      let commnt = thread.comments.find(c => c.id === commentId)

      if (!commnt) {
        commnt = {
          id: commentId,
          commentVersions: [],
          pendingVersions: [],
          created: now,
        }
        thread.comments.push(commnt)
      }

      commnt.updated = now

      let pendingVersion = commnt.pendingVersions.find(
        pv => pv.id === pendingVersionId,
      )

      if (!pendingVersion) {
        pendingVersion = {
          id: pendingVersionId,
          userId: ctx.user,
          created: now,
        }
        commnt.pendingVersions.push(pendingVersion)
      }

      pendingVersion.updated = now

      if (pendingVersion.userId !== ctx.user)
        throw new Error(
          `Illegal attempt by user ${ctx.user} to edit a pending comment by user ${pendingVersion.userId}`,
        )

      pendingVersion.comment = comment

      // TODO Why is this not upserting? Why does it return undefined?
      const result = await models.ThreadedDiscussion.query().updateAndFetchById(
        threadedDiscussionId,
        { ...discussion, threads: JSON.stringify(discussion.threads) },
      )

      console.log(result)

      return stripHiddenAndAddUserInfo(discussion, ctx.user)
    },
    async completeComment(
      _,
      { threadedDiscussionId, threadId, commentId, pendingVersionId },
      ctx,
    ) {
      // TODO ensure that the current user is permitted to comment
      // TODO update dates at the appropriate places
      const discussion = await models.ThreadedDiscussion.query().where({
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
      await models.ThreadedDiscussion.query().updateAndFetchById(
        threadedDiscussionId,
        { ...discussion, threads: JSON.stringify(discussion.threads) },
      )

      return stripHiddenAndAddUserInfo(discussion, ctx.user)
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
  author: User!
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
