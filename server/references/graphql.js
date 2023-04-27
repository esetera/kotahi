const GraphQLJSON = require('graphql-type-json')
const { getReferenceStructure } = require('./structuring')
const { getReference } = require('./validation')

/* eslint-disable prefer-destructuring */
const resolvers = {
  Mutation: {
    async createReferenceValidation(_, { reference }, ctx) {
      /* eslint-disable no-console */
      console.log('Reference sent to mutation: ', reference)
      const response = await getReference(reference)
      /* eslint-disable no-console */
      console.log('Reference validation response: ', response)
      if (response)
        return {
          succeeded: true,
          responseData: JSON.stringify(response),
          reference,
        }
      return { succeeded: false, responseData: {}, reference }
    },

    // Do we need this?

    async createReferenceStructuring(_, { references }, ctx) {
      // console.log('createReferenceStructuring: ', references)
      const response = await getReferenceStructure(references)
      // console.log('Reference structure response: ', response)
      if (response) return { response }
      return { response: {} }
    },
  },
  // NOTE: is there a more Kotahi-like way to do this?
  JSON: GraphQLJSON,
}

const typeDefs = `
  extend type Mutation {
    createReferenceValidation(reference:String!) : ReferenceValidationResult
    createReferenceStructuring(references:[String]!) : ReferenceStructureData
  }

  scalar JSON

  type ReferenceValidationResult {
    responseData: JSON!
    succeeded: Boolean!
    errorMessage: String
    reference:String
  }  

  type ReferenceStructureData{
    response: JSON
  }
`

module.exports = {
  typeDefs,
  resolvers,
}
