// const { flatten } = require('lodash')
// const Review = require('./review')
const models = require('@pubsweet/models')
const { mergeWith, isArray } = require('lodash')

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
        const existingReview = await models.Review.query().findById(id) // Find the existing review by id

        const updatedReview = mergeWith(
          existingReview,
          reviewDelta,
          mergeArrays,
        )

        delete updatedReview.reviewComment
        delete updatedReview.confidentialComment
        delete updatedReview.decisionComment

        review = await models.Review.query().upsertGraphAndFetch({
          id,
          ...updatedReview,
        })
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

      return review
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
      return parent.files
        ? parent.files
        : models.File.query().where({ reviewCommentId: parent.id })
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
