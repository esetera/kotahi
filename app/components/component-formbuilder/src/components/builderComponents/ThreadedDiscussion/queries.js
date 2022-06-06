import { gql } from '@apollo/client'
/* eslint-disable import/prefer-default-export */
export const GET_THREADED_DISCUSSIONS = gql`
  query GetThreadedDiscussions {
    threadedDiscussions {
      id
      created
      updated
      manuscriptId
      threads {
        id
        comments {
          id
          commentVersions {
            id
            userId
            comment
          }
          pendingVersions {
            id
            userId
            comment
          }
        }
      }
    }
  }
`
