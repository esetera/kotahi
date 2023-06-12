const { BaseModel } = require('@coko/server')

class CMSPage extends BaseModel {
  static get tableName() {
    return 'cms_pages'
  }

  static get relationMappings() {
    /* eslint-disable-next-line global-require */
    const { User } = require('@pubsweet/models')
    return {
      creator: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'cms_pages.creatorId',
          to: 'users.id',
        },
      },
    }
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
        published: { type: ['string', 'object', 'null'], format: 'date-time' },
        edited: { type: ['string', 'object', 'null'], format: 'date-time' },
      },
    }
  }
}

module.exports = CMSPage
