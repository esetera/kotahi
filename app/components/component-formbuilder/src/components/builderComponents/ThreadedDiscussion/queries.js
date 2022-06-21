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

export const CREATE_THREAD = gql`
  mutation(
    $manuscriptId: ID,
    $comment: String,
    $created: DateTime,
    $updated: DateTime,
  ) {
    addThread(
      manuscriptId: $manuscriptId,
      comment: $comment,
      created: $created,
      updated: $updated,
    ) {
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

export const UPDATE_THREAD = gql`
mutation(
  $manuscriptId: ID
  $comment: String
  $created: DateTime
  $updated: DateTime
) {
  updateThread(
    manuscriptId: $manuscriptId
    comment: $comment
    created: $created
    updated: $updated
  ) {
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