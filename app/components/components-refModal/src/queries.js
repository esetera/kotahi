import { gql } from '@apollo/client'

export const GET_REFERENCES_WITH_DOI = gql`
  query getReference($doi: String!) {
    getReference(doi: $doi) {
      success
      message
      reference {
        doi
        title
        journalTitle
        page
        issue
        volume
        author {
          given
          family
          sequence
        }
      }
    }
  }
`

export const GET_MATCHING_REFERENCES = gql`
  query getMatchingReferences($text: String!) {
    getMatchingReferences(input: { text: $text }) {
      success
      message
      matches {
        doi
        title
        journalTitle
        page
        issue
        volume
        author {
          given
          family
          sequence
        }
      }
    }
  }
`
