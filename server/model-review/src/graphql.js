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
      const customReviewForms = true
      let review

      if (customReviewForms) {
        const reviewDelta = { jsonData: JSON.parse(input.jsonData) } // Convert the JSON input to JavaScript object

        let existingReview
        try {
          existingReview = await models.Review.query().findById(id) // Find the existing review by id
        } catch (e) {
          existingReview = {}
          console.log('No existing reivew found.')
        }

        const updatedReview = mergeWith(
          existingReview,
          reviewDelta,
          mergeArrays,
        )

        updatedReview.jsonData = JSON.stringify(updatedReview.jsonData) // Convert the JavaScript object back to JSON

        delete updatedReview.reviewComment
        delete updatedReview.confidentialComment
        delete updatedReview.decisionComment

        review = await models.Review.query().upsertGraphAndFetch(
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
      } else {
        // We process comment fields into array
        const userId = input.userId ? input.userId : ctx.user

        const reviewUser = await models.User.query().where({
          id: userId,
        })

        const processedReview = { ...input, user: reviewUser }

        processedReview.comments = [
          input.reviewComment,
          input.confidentialComment,
          input.decisionComment,
        ].filter(Boolean)

        delete processedReview.reviewComment
        delete processedReview.confidentialComment
        delete processedReview.decisionComment

        review = await models.Review.query().upsertGraphAndFetch(
          {
            id,
            ...processedReview,
          },
          {
            relate: true,
            noUnrelate: true,
            noDelete: true,
          },
        )
      }

      return {
        id: review.id,
        created: review.created,
        updated: review.updated,
        recommendation: review.recommendation,
        isDecision: review.isDecision,
        open: review.open,
        user: review.user,
        reviewComment: review.reviewComment,
        confidentialComment: review.confidentialComment,
        decisionComment: review.decisionComment,
        isHiddenFromAuthor: review.isHiddenFromAuthor,
        isHiddenReviewerName: review.isHiddenReviewerName,
        canBePublishedPublicly: review.canBePublishedPublicly,
        jsonData: JSON.stringify(review.jsonData),
        userId: review.userId,
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
  ReviewComment: {
    async files(parent, _, ctx) {
      const files = await File.query().where({ objectId: parent.id })
      return getFilesWithUrl(files)
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
    recommendation: String
    isDecision: Boolean
    open: Boolean
    user: User
    reviewComment: ReviewComment
    confidentialComment: ReviewComment
    decisionComment: ReviewComment
    isHiddenFromAuthor: Boolean
    isHiddenReviewerName: Boolean
    canBePublishedPublicly: Boolean
    jsonData: String
    userId: String
  }

  input ReviewInput {
    reviewComment: ReviewCommentInput
    confidentialComment: ReviewCommentInput
    decisionComment: ReviewCommentInput
    recommendation: String
    isDecision: Boolean
    manuscriptId: ID!
    isHiddenFromAuthor: Boolean
    isHiddenReviewerName: Boolean
    canBePublishedPublicly: Boolean
    jsonData: String
    userId: String
  }

  type ReviewComment implements Object {
    id: ID!
    created: DateTime!
    updated: DateTime
    commentType: String
    content: String
    files: [File]
  }

  input ReviewCommentInput {
    id: ID
    commentType: String
    content: String
  }
`

module.exports = { resolvers, typeDefs }
