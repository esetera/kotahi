const BaseModel = require('@pubsweet/base-model')

class ArticleImports extends BaseModel {
  static get tableName() {
    return 'article_imports'
  }

  static get schema() {
    return {
      properties: {
        date: { type: ['string', 'object', 'null'], format: 'date-time' },
        source: { type: ['string', 'null'] },
      },
    }
  }
}

ArticleImports.type = 'ArticleImports'
module.exports = ArticleImports
