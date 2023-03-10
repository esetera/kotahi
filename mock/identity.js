const { v4: uuid } = require('uuid')
const { getRandomName } = require('./names')

const intToZeroPaddedString = (num, length) => {
  let result = Math.floor(num).toString(10)
  while (result.length < length) result = `0${result}`
}

const getRandom4Digits = (limit = 10000) => {
  return intToZeroPaddedString(Math.random() * limit, 4)
}

const identity = {
  generate: (prototype = {}) => {
    const now = new Date()
    const nowIso = now.toISOString()
    const id = uuid()
    const name = getRandomName()

    const simpleIdentity = {
      id,
      created: nowIso,
      updated: nowIso,
      type: 'orcid',
      isDefault: true,
      aff: null,
      name: `${name.first} ${name.initial} ${name.last}`,
      email: `${name.first}.${name.last}@example.com`.replaceAll("'", ''),
      identifier: `0000-${getRandom4Digits(
        6,
      )}-${getRandom4Digits()}-${getRandom4Digits()}`,
      userId: uuid(),
      oauth: { accessToken: uuid(), refreshToken: uuid() },
      __typename: 'Identity',
    }

    return { ...simpleIdentity, ...prototype }
  },
}

module.exports = identity
