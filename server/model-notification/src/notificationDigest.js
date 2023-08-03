const { BaseModel } = require('@coko/server')

class NotificationDigest extends BaseModel {
  static get tableName() {
    return 'notification_digest'
  }

  static get relationMappings() {
    // eslint-disable-next-line global-require
    const { User } = require('@pubsweet/models')

    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'notification_digest.user_id',
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
        time: { type: 'datetime', notNull: true },
        maxNotificationTime: { type: 'datetime', notNull: true },
        pathString: { type: 'string' },
        userId: { type: ['string'], format: 'uuid' },
        userIsMentioned: { type: 'boolean', default: false },
        option: { type: 'string' },
        actioned: { type: 'boolean', default: false },
        context: {
          type: 'object',
          properties: { messageId: { type: 'string' } },
          nullable: true,
        },
      },
    }
  }
}

module.exports = NotificationDigest
