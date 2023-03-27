const { getReferenceStructure } = require("./structuring")
const { getReference } = require("./validation")
const GraphQLJSON = require("graphql-type-json")

/* eslint-disable prefer-destructuring */
const resolvers = {
  Mutation: {
    async createReferenceValidation(_, { reference }, ctx) {
      console.log(reference)
      const response = await getReference(reference)
      console.log("reference validation response", response)
      if (response)
        return { succeeded: true, responseData: JSON.stringify(response),reference:reference }
      else
        return { succeeded: false, responseData: {},reference:reference }
    },

    async createReferenceStructuring(_, { references }, ctx) {
      console.log(references)
      const response = await getReferenceStructure(references)
      console.log("reference structure response", response)
      if (response)
        return { response: response }
      else
        return { response: {} }
    }
  },
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