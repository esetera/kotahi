const typeDefs = `
extend type Query {
  threadedDiscussion(id: ID!): ThreadedDiscussion!
  threadedDiscussions(manuscriptId: ID): [ThreadedDiscussion]!
}

type ThreadedDiscussion {
  id: ID!
  created: DateTime!
  updated: DateTime
  manuscriptId: ID!
  threads: [DiscussionThread!]!
  userCanAddComment: Boolean
  userCanEditOwnComment: Boolean
  userCanEditAnyComment: Boolean
}

type DiscussionThread {
  id: ID
  created: DateTime
  updated: DateTime
  comments: [ThreadComment]
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

input CreateCommentInput {
  comment: String
  manuscriptId: ID!
}

extend type Mutation {
  addThread(manuscriptId: ID, comment: String, created: DateTime, updated: DateTime): ThreadedDiscussion
}
extend type Mutation{
  updateThread(manuscriptId: ID, comment: String, created: DateTime, updated: DateTime): ThreadedDiscussion
}
`
module.exports = typeDefs
