const { BaseModel } = require('@coko/server')
const File = require('@coko/server/src/models/file/file.model')
const Group = require('../../model-group/src/group')

class CMSLayout extends BaseModel {
  static get tableName() {
    return 'cms_layouts'
  }

  static get relationMappings() {
    /* eslint-disable-next-line global-require */
    return {
      logo: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: File,
        join: {
          from: 'cms_layouts.logoId',
          to: 'files.id',
        },
      },
      group: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Group,
        join: {
          from: 'cms_layouts.groupId',
          to: 'groups.id',
        },
      },
    }
  }

  static get schema() {
    const arrayOfStoredPartners = {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id'],
        properties: {
          id: { type: 'string', format: 'uuid' },
          url: { type: 'string' },
          sequenceIndex: { type: ['integer', 'null'] },
        },
      },
    }

    return {
      properties: {
        active: { type: ['boolean'] },
        primaryColor: { type: 'string' },
        secondaryColor: { type: 'string' },
        logoId: { type: ['string', 'null'], format: 'uuid' },
        partners: arrayOfStoredPartners,
        footerText: { type: 'string' },
        published: { type: ['string', 'object', 'null'], format: 'date-time' },
        edited: { type: ['string', 'object', 'null'], format: 'date-time' },
        groupId: { type: ['string', 'null'], format: 'uuid' },
      },
    }
  }
}

module.exports = CMSLayout
