const BaseModel = require('@pubsweet/base-model')

class ArticleSources extends BaseModel {
  static get tableName() {
    return 'article_import_sources'
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

ArticleSources.type = 'ArticleSources'
module.exports = ArticleSources
