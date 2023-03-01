const { BaseModel } = require('@coko/server')

class TaskEmailNotification extends BaseModel {
  static get tableName() {
    return 'task_email_notifications'
  }

  static get modifiers() {
    return {
      orderByCreated(builder) {
        builder.orderBy('created', 'asc')
      },
    }
  }

  static get relationMappings() {
    /* eslint-disable-next-line global-require */
    const { User } = require('@pubsweet/models')
    /* eslint-disable-next-line global-require */
    const Task = require('./task')

    return {
      recipientUser: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'task_email_notifications.recipientUserId',
          to: 'users.id',
        },
      },
      task: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Task,
        join: {
          from: 'task_email_notifications.taskId',
          to: 'tasks.id',
        },
      },
    }
  }

  static get schema() {
    return {
      properties: {
        taskId: { type: 'string', format: 'uuid' },
        recipientUserId: { type: ['string', 'null'], format: 'uuid' },
        recipientType: { type: ['string', 'null'] },
        notificationElapsedDays: { type: ['integer', 'null'] },
        emailTemplateKey: { type: ['string', 'null'] },
        recipientName: { type: ['string', 'null'] },
        recipientEmail: { type: ['string', 'null'] },
        sentAt: { type: ['string', 'object', 'null'], format: 'date-time' },
      },
    }
  }
}

TaskEmailNotification.type = 'TaskEmailNotification'
module.exports = TaskEmailNotification