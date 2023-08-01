const journal = require('../../config/journal')

module.exports = (roles = []) => {
  const prettyRoles = journal.roles

  const roleText = roles.map(r => prettyRoles[r] || r).join(', ')
  return roleText
}
