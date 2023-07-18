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
        id: { type: 'integer' },
        created: { type: 'datetime', notNull: true },
        updated: { type: 'datetime' },
        user_id: { type: 'integer', notNull: true },
        object_id: { type: ['integer', 'null'] },
        path: { type: 'array', items: { type: 'string' }, notNull: true },
        option: { type: 'string', notNull: true },
      },
    }
  }
}

module.exports = NotificationUserOption
