const models = require('@pubsweet/models')
const { v4: uuid } = require('uuid')

const hasValue = value =>
typeof value === 'string' &&
  value &&
  value !== '<p></p>' &&
  value !== '<p class="paragraph"></p>'

const getOriginalVersionManuscriptId = async manuscriptId => {
  const ms = await models.Manuscript.query()
    .select('parentId')
    .findById(manuscriptId)

  const parentId = ms ? ms.parentId : null
  return parentId || manuscriptId
}

const filterDistinct = (id, index, arr) => arr.indexOf(id) === index

const userIsEditorOfLatestVersion = async (
  userId,
  firstVersionManuscriptId,
) => {
  const latestVersionMs = (
    await models.Manuscript.query()
      .select('id')
      .where({ parentId: firstVersionManuscriptId })
      .orWhere({ id: firstVersionManuscriptId })
      .orderBy('created', 'desc')
      .limit(1)
      .withGraphFetched('teams.members')
  )[0]

  return latestVersionMs.teams.some(
    t =>
      ['seniorEditor', 'handlingEditor', 'editor'].includes(t.role) &&
      t.members.some(m => m.userId === userId),
  )
}

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
    .concat([userId]) // Getting user info for the current user too, as it's convenient
    .filter(filterDistinct)

  const users = await models.User.query().findByIds(userIds)
  const usersMap = {}
  users.forEach(u => (usersMap[u.id] = u))

  const userIsAdminOrEditor =
    usersMap[userId].admin ||
    (await userIsEditorOfLatestVersion(userId, discussion.manuscriptId))

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
    userCanAddComment: true, // Current logic is that all users can add comments
    userCanEditOwnComment: userIsAdminOrEditor,
    userCanEditAnyComment: userIsAdminOrEditor,
  }
}

/* eslint-disable no-restricted-syntax, no-param-reassign */
const convertUsersPendingVersionsToCommentVersions = (userId, comment, now) => {
  let hasUpdated = false

  // Should be only one pendingVersion for a user, but to be safe we assume there could be multiple
  for (const pendingVersion of comment.pendingVersions.filter(
    pv => pv.userId === userId && hasValue(pv.comment),
  )) {
    if (!comment.commentVersions) comment.commentVersions = []

    comment.commentVersions.push({
      id: uuid(),
      created: now,
      updated: now,
      userId,
      comment: pendingVersion.comment,
    })
    comment.pendingVersions = comment.pendingVersions.filter(
      pv => pv.id !== pendingVersion.id,
    )
    hasUpdated = true
    comment.updated = now
  }

  return hasUpdated
}
/* eslint-enable no-restricted-syntax, no-param-reassign */

const resolvers = {
  Query: {
    async threadedDiscussions(_, { manuscriptId: msVersionId }, ctx) {
      const manuscriptId = await getOriginalVersionManuscriptId(msVersionId)

      const result = await models.ThreadedDiscussion.query()
        .where({ manuscriptId })
        .orderBy('created', 'desc')

      return Promise.all(
        result.map(async discussion => {
          return stripHiddenAndAddUserInfo(discussion, ctx.user)
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
      const now = new Date().toISOString()
      const manuscriptId = await getOriginalVersionManuscriptId(msVersionId)

      let discussion = await models.ThreadedDiscussion.query().findById(
        threadedDiscussionId,
      )
      if (!discussion)
        discussion = {
          id: threadedDiscussionId,
          manuscriptId,
          threads: [],
          created: now,
        }

      let thread = discussion.threads.find(t => t.id === threadId)

      if (!thread) {
        thread = { id: threadId, comments: [], created: now }
        discussion.threads.push(thread)
      }

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

      await models.ThreadedDiscussion.query().upsertGraphAndFetch(
        { ...discussion, threads: JSON.stringify(discussion.threads) },
        { insertMissing: true },
      )

      return stripHiddenAndAddUserInfo(discussion, ctx.user)
    },
    /* eslint-disable no-restricted-syntax */
    async completeComments(_, { threadedDiscussionId }, ctx) {
      const now = new Date().toISOString()
      let hasUpdated = false

      const discussion = await models.ThreadedDiscussion.query().findById(
        threadedDiscussionId,
      )

      if (!discussion)
        throw new Error(
          `threadedDiscussion with ID ${threadedDiscussionId} not found`,
        )

      for (const thread of discussion.threads) {
        for (const comment of thread.comments) {
          if (
            convertUsersPendingVersionsToCommentVersions(ctx.user, comment, now)
          ) {
            hasUpdated = true
            thread.updated = now
            discussion.updated = now
          }
        }
      }

      if (hasUpdated)
        await models.ThreadedDiscussion.query()
          .update({
            updated: discussion.updated,
            threads: JSON.stringify(discussion.threads),
          })
          .where({ id: threadedDiscussionId })

      return stripHiddenAndAddUserInfo(discussion, ctx.user)
    },
    /* eslint-enable no-restricted-syntax */
    async completeComment(
      _,
      { threadedDiscussionId, threadId, commentId },
      ctx,
    ) {
      const now = new Date().toISOString()

      const discussion = await models.ThreadedDiscussion.query().findById(
        threadedDiscussionId,
      )

      if (!discussion)
        throw new Error(
          `threadedDiscussion with ID ${threadedDiscussionId} not found`,
        )

      const thread = discussion.threads.find(t => t.id === threadId)
      if (!thread) throw new Error(`thread with ID ${threadId} not found`)
      const comment = thread.comments.find(c => c.id === commentId)
      if (!comment) throw new Error(`comment with ID ${commentId} not found`)

      if (
        convertUsersPendingVersionsToCommentVersions(ctx.user, comment, now)
      ) {
        thread.updated = now
        discussion.updated = now

        await models.ThreadedDiscussion.query()
          .update({
            updated: discussion.updated,
            threads: JSON.stringify(discussion.threads),
          })
          .where({ id: threadedDiscussionId })
      }

      return stripHiddenAndAddUserInfo(discussion, ctx.user)
    },
    async deletePendingComment(
      _,
      { threadedDiscussionId, threadId, commentId },
      ctx,
    ) {
      const discussion = await models.ThreadedDiscussion.query().findById(
        threadedDiscussionId,
      )

      if (!discussion)
        throw new Error(
          `threadedDiscussion with ID ${threadedDiscussionId} not found`,
        )

      const thread = discussion.threads.find(t => t.id === threadId)
      if (!thread) throw new Error(`thread with ID ${threadId} not found`)
      const comment = thread.comments.find(c => c.id === commentId)
      if (!comment) throw new Error(`comment with ID ${commentId} not found`)

      comment.pendingVersions = comment.pendingVersions.filter(
        pv => pv.userId !== ctx.user,
      )

      await models.ThreadedDiscussion.query()
        .update({
          updated: discussion.updated,
          threads: JSON.stringify(discussion.threads),
        })
        .where({ id: threadedDiscussionId })

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
  completeComments(threadedDiscussionId: ID!): ThreadedDiscussion!
  completeComment(threadedDiscussionId: ID!, threadId: ID!, commentId: ID!): ThreadedDiscussion!
  deletePendingComment(threadedDiscussionId: ID!, threadId: ID!, commentId: ID!): ThreadedDiscussion!
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
`

module.exports = { typeDefs, resolvers }
