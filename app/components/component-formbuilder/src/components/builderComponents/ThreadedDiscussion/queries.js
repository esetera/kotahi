import { gql } from '@apollo/client'

const discussionFields = `
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
        author {
          id
          username
          profilePicture
        }
        comment
        created
      }
      pendingVersions {
        id
        author {
          id
          username
          profilePicture
        }
        comment
      }
    }
  }
`

export const GET_THREADED_DISCUSSIONS = gql`
  query GetThreadedDiscussions($manuscriptId: ID!) {
    threadedDiscussions(manuscriptId: $manuscriptId) {
      ${discussionFields}
    }
  }
`

export const UPDATE_PENDING_COMMENT = gql`
  mutation(
    $manuscriptId: ID!
    $threadedDiscussionId: ID!
    $threadId: ID!
    $commentId: ID!
    $pendingVersionId: ID!
    $comment: String
  ) {
    updatePendingComment(
      manuscriptId: $manuscriptId
      threadedDiscussionId: $threadedDiscussionId
      threadId: $threadId
      commentId: $commentId
      pendingVersionId: $pendingVersionId
      comment: $comment
    ) {
      ${discussionFields}
    }
  }
`

export const COMPLETE_COMMENT = gql`
  mutation(
    $threadedDiscussionId: ID!
    $threadId: ID!
    $commentId: ID!
    $pendingVersionId: ID!
  ) {
    completeComment(
      threadedDiscussionId: $threadedDiscussionId
      threadId: $threadId
      commentId: $commentId
      pendingVersionId: $pendingVersionId
    ) {
      ${discussionFields}
    }
  }
`