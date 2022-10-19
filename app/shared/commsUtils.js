import gql from 'graphql-tag'

const VALIDATE_DOI = gql`
  query validateDOI($articleURL: String) {
    validateDOI(articleURL: $articleURL) {
      isDOIValid
    }
  }
`

/** 2nd-order function to get a validator for DOIs.
 * E.g. `const errorMessage = validateDoi(client)(value)`
 * If value is not a valid, existing DOI, return an error string for display.
 * Else return undefined. This contacts the server for the result,
 * which in turn attempts to retrieve the DOI.
 */
// eslint-disable-next-line import/prefer-default-export
export const validateDoi = client => async value => {
  return client
    .query({
      query: VALIDATE_DOI,
      variables: {
        articleURL: value,
      },
    })
    .then(result => {
      if (!result.data.validateDOI.isDOIValid) return 'DOI is invalid'
      return undefined
    })
}

const VALIDATE_SUFFIX = gql`
  query validateSuffix($suffix: String) {
    validateSuffix(suffix: $suffix) {
      isDOIValid
    }
  }
`

export const validateSuffix = client => async value => {
  const res = await client.query({
    query: VALIDATE_SUFFIX,
    variables: {
      suffix: value,
    },
  })

  if (res.data.validateSuffix.isDOIValid) {
    return null
  }

  return 'Suffix is invalid or not available'
  // testing
  // const res = await Promise.resolve('suffix is invalid')
  // return res
}
