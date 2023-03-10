const { v4: uuid } = require('uuid')

const team = {
  generate: (prototype = {}) => {
    const now = new Date()
    const nowIso = now.toISOString()
    const id = uuid()

    const simpleTeam = {
      id,
      created: nowIso,
      updated: nowIso,
      type: 'team',
      role: 'author', // 'author', 'editor', 'handlingEditor', 'seniorEditor', 'reviewer'
      name: 'Author', // 'Author', 'Editor', 'Handling Editor', 'Senior Editor', 'Reviewers'
      object: {
        objectId: uuid(),
        objectType: 'manuscript',
        __typename: 'TeamObject',
      },
      members: [],
      owners: null,
      global: false,
      __typename: 'Team',
    }

    return {
      ...simpleTeam,
      ...prototype,
      object: { ...simpleTeam.object, ...(prototype.object || {}) },
    }
  },
}

module.exports = team
