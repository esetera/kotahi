const { BaseModel } = require('@coko/server')
const { User } = require('@pubsweet/models')

class NotificationUserOption extends BaseModel {
  static get tableName() {
    return 'notification_user_options'
  }

  static get relationMappings() {
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
        userId: { type: 'string', format: 'uuid' },
        objectId: { type: ['string'], format: 'uuid' },
        path: { type: 'array', items: { type: 'string' } },
        option: { type: 'string' },
        groupId: { type: ['string'], format: 'uuid' },
      },
    }
  }

  // eslint-disable-next-line class-methods-use-this
  $formatDatabaseJson(json) {
    if (json.path) {
      // eslint-disable-next-line no-param-reassign
      json.path = `{${json.path.join(',')}}`
    }

    return json
  }
}

module.exports = NotificationUserOption
