const typeDefs = `
extend type Query {
  threadedDiscussion(id: ID!): ThreadedDiscussion!
  threadedDiscussions: [ThreadedDiscussion]!
}

type ThreadedDiscussion {
  id: ID!
  created: DateTime!
  updated: DateTime
  manuscriptId: ID!
  threads: [DiscussionThread!]!
  userCanAddComment: Boolean!
  userCanEditOwnComment: Boolean!
  userCanEditAnyComment: Boolean!
}

type DiscussionThread {
  id: ID!
  created: DateTime!
  updated: DateTime
  comments: [ThreadComment!]!
}

type ThreadComment {
  id: ID!
  created: DateTime!
  updated: DateTime
  commentVersions: [ThreadedCommentVersion!]!
  pendingVersions: [ThreadedCommentVersion!]!
}

type ThreadedCommentVersion {
  id: ID!
  created: DateTime!
  updated: DateTime
  userId: ID!
  comment: String!
}

input CreateThreadedDiscussionsInput {
  created: DateTime
  comment: String
  manuscriptId: ID!
}

extend type Mutation {
  createThreadedDiscussions(threadedDiscussion: CreateThreadedDiscussionsInput!): ThreadedDiscussion
}
`

module.exports = typeDefs
