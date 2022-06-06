const { BaseModel } = require('@coko/server')

class ThreadedDiscussion extends BaseModel {
  static get tableName() {
    return 'threaded_discussions'
  }

  constructor(properties) {
    super(properties)
    this.type = 'ThreadedDiscussion'
  }

  static get modifiers() {
    return {
      orderByCreated(builder) {
        builder.orderBy('created', 'desc')
      },
    }
  }

  static get schema() {
    return {
      properties: {
        manuscript_id: { type: 'string', format: 'uuid' },
        threads: {
          type: 'array',
          default: [],
          properties: {
            id: { type: 'string', format: 'uuid' },
          }
        },
      },
    }
  }
}

ThreadedDiscussion.type = 'ThreadedDiscussion'
module.exports = ThreadedDiscussion
