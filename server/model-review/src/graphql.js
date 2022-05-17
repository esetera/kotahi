// const { flatten } = require('lodash')
// const Review = require('./review')
const models = require('@pubsweet/models')
const { mergeWith, isArray } = require('lodash')
const File = require('../../model-file/src/file')
const { getFilesWithUrl } = require('../../utils/fileStorageUtils')

const mergeArrays = (destination, source) => {
  if (isArray(destination)) return source
  return undefined
}

const resolvers = {
  Mutation: {
    async updateReview(_, { id, input }, ctx) {
      const reviewDelta = { jsonData: JSON.parse(input.jsonData) } // Convert the JSON input to JavaScript object
      const existingReview = (await models.Review.query().findById(id)) || {}
      const updatedReview = mergeWith(existingReview, reviewDelta, mergeArrays)

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

      const files = await File.query().where({ objectId: review.id })

      return {
        id: review.id,
        created: review.created,
        updated: review.updated,
        isDecision: review.isDecision,
        open: review.open,
        user: review.user,
        isHiddenFromAuthor: review.isHiddenFromAuthor,
        isHiddenReviewerName: review.isHiddenReviewerName,
        canBePublishedPublicly: review.canBePublishedPublicly,
        jsonData: JSON.stringify(review.jsonData),
        userId: review.userId,
        files: getFilesWithUrl(files),
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
