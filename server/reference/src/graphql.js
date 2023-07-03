const { logger } = require('@coko/server')
const config = require('config')

const {
  getMatchingReferencesFromCrossRef,
  getReferenceWithDoi,
} = require('./validation')

const { formatReference } = require('./formatting')

const { crossRefEmail, crossRefCount } = config.references

/* eslint-disable prefer-destructuring */
const resolvers = {
  Query: {
    async getMatchingReferences(_, { input }, ctx) {
      try {
        const matches = await getMatchingReferencesFromCrossRef(
          input.text,
          input.count || crossRefCount || 3,
          crossRefEmail,
        )

        return { matches, success: true, message: '' }
      } catch (error) {
        logger.error('Response Error:', error.message)
        return { matches: [], success: false, message: 'error' }
      }
    },
    async getReference(_, { doi }, ctx) {
      try {
        const reference = await getReferenceWithDoi(doi, crossRefEmail)

        return { reference, success: true, message: '' }
      } catch (error) {
        logger.error('Response Error:', error.message)
        return { reference: {}, success: false, message: 'error' }
      }
    },
    async formatReferences(_, { input }, ctx) {
      try {
        const references = input.map(ref => {
          const { result, error } = formatReference(ref)

          if (error) {
            throw error
          }

          return result || ''
        })

        return { references, success: true, message: '' }
      } catch (error) {
        logger.error('Response Error:', error)
        return { references: [], success: false, message: 'error' }
      }
    },
  },
}

const typeDefs = `
  input ReferenceInput {
    text:String!
    count: Int 
  }

  extend type Query {
    getMatchingReferences(input: ReferenceInput): References
    getReference(doi:String!): SingleReference
		formatReferences(input: [String]): FormattedReferences
  }

  type SingleReference {
    success: Boolean
    message: String
    reference: Reference
  }

  type References {
    success: Boolean
    message: String
    matches: [Reference]
  }

  type ReferenceAuthor {
    given: String
    family: String
    sequence: String
  }

  type Reference {
    doi: String
    author: [ReferenceAuthor]
    issue: String
    page: String
    title: String
    volume: String
    journalTitle: String
  }

	type FormattedReferences {
		success: Boolean
    message: String
		references: [String]
	}
`

module.exports = {
  typeDefs,
  resolvers,
}
