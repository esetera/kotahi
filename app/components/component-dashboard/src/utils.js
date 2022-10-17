export const getLatestVersion = manuscript => {
  if (
    !manuscript ||
    !manuscript.manuscriptVersions ||
    manuscript.manuscriptVersions.length <= 0
  )
    return manuscript

  return manuscript.manuscriptVersions[0]
}

/** Filter to return those manuscripts with the given user in one of the given roles.
 * Roles is an array of role-name strings.
 */
export const getManuscriptsUserHasRoleIn = (manuscripts, userId, roles) =>
  manuscripts.filter(m =>
    m.teams.some(
      t =>
        roles.includes(t.role) &&
        t.members.some(member => member.user.id === userId),
    ),
  )

export const getRoles = (m, userId) =>
  m.teams
    .filter(t => t.members.some(member => member.user.id === userId))
    .map(t => t.role)
