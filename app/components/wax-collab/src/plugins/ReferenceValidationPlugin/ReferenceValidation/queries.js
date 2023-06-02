import gql from 'graphql-tag'

const UPDATE_VALIDATION = gql`
  mutation getreferencevalidation($reference: String!) {
    createReferenceValidation(reference: $reference) {
      responseData
      succeeded
      errorMessage
    }
  }
`

export default UPDATE_VALIDATION
