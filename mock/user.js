const { v4: uuid } = require('uuid')
const identity = require('./identity')
const { getRandomName } = require('./names')

const user = {
  generate: (prototype = {}) => {
    const now = new Date()
    const nowIso = now.toISOString()
    const id = uuid()
    const name = getRandomName()
    const username = `${name.first} ${name.initial} ${name.last}`

    const defaultIdentity =
      prototype.defaultIdentity ||
      identity.generate({ name: username, userId: id })

    const simpleUser = {
      id,
      created: nowIso,
      updated: nowIso,
      admin: false,
      email: null,
      username,
      passwordHash: null,
      online: false,
      isOnline: false,
      passwordResetToken: null,
      passwordResetTimestamp: null,
      profilePicture: null,
      lastOnline: null,
      identities: [defaultIdentity],
      defaultIdentity,
      file: null,

      __typename: 'User',
    }

    return { ...simpleUser, ...prototype }
  },
}

module.exports = user
