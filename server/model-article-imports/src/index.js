const graphql = require('./graphql')
const model = require('./articles')

module.exports = {
  model,
  modelName: 'ArticleImports',
  ...graphql,
}