// const { flatten } = require('lodash')
// const Review = require('./review')
const models = require('@pubsweet/models')
const { mergeWith, isArray } = require('lodash')
// const File = require('@coko/server/src/models/file/file.model')
// const { getFilesWithUrl } = require('../../utils/fileStorageUtils')

const mergeArrays = (destination, source) => {
  if (isArray(destination)) return source
  return undefined
}

const resolvers = {
  Mutation: {
    async updateReview(_, { id, input }, ctx) {
      const reviewDelta = { ...input, jsonData: JSON.parse(input.jsonData) } // Convert the JSON input to JavaScript object
      const existingReview = (await models.Review.query().findById(id)) || {}
      const updatedReview = mergeWith(existingReview, reviewDelta, mergeArrays)

      // Prevent reassignment of userId, manuscriptId or isDecision
      if (existingReview.userId) updatedReview.userId = existingReview.userId
      if (existingReview.manuscriptId)
        updatedReview.manuscriptId = existingReview.manuscriptId
      if (typeof existingReview.isDecision === 'boolean')
        updatedReview.isDecision = existingReview.isDecision

      updatedReview.jsonData = JSON.stringify(updatedReview.jsonData) // Convert the JavaScript object back to JSON

      const review = await models.Review.query().upsertGraphAndFetch(
        {
          id,
          ...updatedReview,
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
      // TODO insert files into correct location in jsonData
      // const files = await File.query().where({ objectId: review.id })
      // files: getFilesWithUrl(files),

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
