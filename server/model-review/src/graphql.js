const models = require('@pubsweet/models')
const { mergeWith, isArray } = require('lodash')
const File = require('@coko/server/src/models/file/file.model')
const { getFilesWithUrl } = require('../../utils/fileStorageUtils')

const {
  convertFilesToIdsOnly,
  convertFilesToFullObjects,
} = require('./reviewUtils')

const mergeArrays = (destination, source) => {
  if (isArray(destination)) return source
  return undefined
}

const getForm = async isDecision => {
  const form = await models.Form.query().where({
    category: isDecision ? 'decision' : 'review',
    purpose: isDecision ? 'decision' : 'review',
  })

  if (!form || !form.length)
    throw new Error(`No form found for "${isDecision ? 'decision' : 'review'}"`)
  return form[0]
}

const resolvers = {
  Mutation: {
    async updateReview(_, { id, input }, ctx) {
      const reviewDelta = { ...input }
      if (input.jsonData) reviewDelta.jsonData = JSON.parse(input.jsonData) // Convert the JSON input to JavaScript object
      const existingReview = (await models.Review.query().findById(id)) || {}

      const form = await getForm(existingReview.isDecision)
      await convertFilesToIdsOnly(reviewDelta, form)
      const updatedReview = mergeWith(existingReview, reviewDelta, mergeArrays)

      // Prevent reassignment of userId, manuscriptId or isDecision
      if (existingReview.userId) updatedReview.userId = existingReview.userId
      if (existingReview.manuscriptId)
        updatedReview.manuscriptId = existingReview.manuscriptId
      if (typeof existingReview.isDecision === 'boolean')
        updatedReview.isDecision = existingReview.isDecision

      const review = await models.Review.query().upsertGraphAndFetch(
        {
          id,
          ...updatedReview,
          jsonData: JSON.stringify(updatedReview.jsonData),
          canBePublishedPublicly: false,
          isHiddenFromAuthor: false,
          isHiddenReviewerName: false,
          manuscriptId: input.manuscriptId,
          userId: input.userId,
        },
        { insertMissing: true },
      )

      const userId = input.userId ? input.userId : ctx.user
      const reviewUser = await models.User.query().findById(userId)

      await convertFilesToFullObjects(
        updatedReview,
        form,
        async ids => File.query().findByIds(ids),
        getFilesWithUrl,
      )

      updatedReview.jsonData = JSON.stringify(updatedReview.jsonData) // Convert the JavaScript object back to JSON

      return {
        id: review.id,
        created: review.created,
        updated: review.updated,
        isDecision: review.isDecision,
        open: review.open,
        user: reviewUser,
        isHiddenFromAuthor: review.isHiddenFromAuthor,
        isHiddenReviewerName: review.isHiddenReviewerName,
        canBePublishedPublicly: review.canBePublishedPublicly,
        jsonData: JSON.stringify(review.jsonData),
        manuscriptId: review.manuscriptId,
      }
    },

    async completeReview(_, { id }, ctx) {
      const review = await models.Review.query().findById(id)

      const manuscript = await models.Manuscript.query()
        .findById(review.manuscriptId)
        .withGraphFetched('[submitter.[defaultIdentity], channels.members]')

      const team = await manuscript
        .$relatedQuery('teams')
        .where('role', 'reviewer')
        .first()

      const member = await team
        .$relatedQuery('members')
        .where('userId', ctx.user)
        .first()

      member.status = 'completed'
      return member.save()
    },
  },
}

const typeDefs = `
  extend type Mutation {
    updateReview(id: ID, input: ReviewInput): Review!
    completeReview(id: ID!): TeamMember
  }

  type Review implements Object {
    id: ID!
    created: DateTime!
    updated: DateTime
    isDecision: Boolean
    open: Boolean
    user: User
    isHiddenFromAuthor: Boolean
    isHiddenReviewerName: Boolean
    canBePublishedPublicly: Boolean
    jsonData: String
    userId: String
    files: [File]
  }

  input ReviewInput {
    isDecision: Boolean
    manuscriptId: ID!
    isHiddenFromAuthor: Boolean
    isHiddenReviewerName: Boolean
    canBePublishedPublicly: Boolean
    jsonData: String
    userId: String
  }
`

module.exports = { resolvers, typeDefs }
