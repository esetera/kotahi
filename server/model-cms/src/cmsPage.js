const { BaseModel } = require('@coko/server')

class CMSPage extends BaseModel {
  static get tableName() {
    return 'cms_pages'
  }

  static get schema() {
    return {
      properties: {
        shortcode: { type: 'string' },
        title: { type: 'string' },
        status: { type: 'string' },
        content: { type: 'string' },
        meta: {},
        creatorId: { type: ['string', 'null'], format: 'uuid' },
      },
    }
  }
}

module.exports = CMSPage
