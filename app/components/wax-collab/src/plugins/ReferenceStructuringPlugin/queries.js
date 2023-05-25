import gql from 'graphql-tag'

const GET_REFERENCE_STRUCTURING = gql`
  mutation getreferencestructuring($references: [String]!) {
    createReferenceStructuring(references: $references) {
      response
    }
  }
`

export default GET_REFERENCE_STRUCTURING
