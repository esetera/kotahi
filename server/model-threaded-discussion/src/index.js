const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')
const model = require('./threadedDiscussion')

module.exports = {
  model,
  modelName: 'ThreadedDiscussion',
  resolvers,
  typeDefs,
}
