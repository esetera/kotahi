const typeDefs = `
type ArticleImports implements Object {
    id: ID!
    date: DateTime
    source: String
  }
`

module.exports = { typeDefs }