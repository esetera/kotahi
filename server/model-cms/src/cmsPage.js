const { BaseModel } = require('@coko/server')

class CMSPage extends BaseModel {
  static get tableName() {
    return 'cms_pages'
  }

  constructor(properties) {
    super(properties)
    this.type = 'CMSPage'
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
      },
    }
  }
}

CMSPage.type = 'CMSPage'
module.exports = CMSPage
