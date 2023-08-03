const { BaseModel } = require('@coko/server')

class NotificationUserOption extends BaseModel {
  static get tableName() {
    return 'notification_user_options'
  }

  static get relationMappings() {
    // eslint-disable-next-line global-require
    const { User } = require('@pubsweet/models')

    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'notification_user_options.user_id',
          to: 'users.id',
        },
      },
    }
  }

  static get schema() {
    return {
      properties: {
        created: { type: 'datetime', notNull: true },
        updated: { type: 'datetime' },
        userId: { type: ['string'], format: 'uuid' },
        objectId: { type: ['string'], format: 'uuid' },
        path: { type: 'array', items: { type: 'string' }, notNull: true },
        option: { type: 'string', notNull: true },
        groupId: { type: ['string'], format: 'uuid' },
      },
    }
  }
}

module.exports = NotificationUserOption
