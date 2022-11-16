import React from 'react'
// import Authorize from 'pubsweet-client/src/helpers/Authorize'
import { useQuery, useMutation } from '@apollo/client'

import config from 'config'
import ReactRouterPropTypes from 'react-router-prop-types'
import { Redirect } from 'react-router-dom'
import queries from '../graphql/queries'
import mutations from '../graphql/mutations'
import Dashboard from './Dashboard'
import { Spinner, CommsErrorBanner } from '../../../shared'
import prettyRoleText from '../../../../shared/prettyRoleText'
import { UPDATE_MEMBER_STATUS_MUTATION } from '../../../../queries/team'

const getLatestVersion = manuscript => {
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

const getManuscriptsUserHasRoleIn = (manuscripts, userId, roles) =>
  manuscripts.filter(m =>
    m.teams.some(
      t =>
        roles.includes(t.role) &&
        t.members.some(member => member.user.id === userId),
    ),
  )

const DashboardPage = ({ history, ...props }) => {
  const { loading, data, error } = useQuery(queries.dashboard, {
    variables: {
      sort: { field: 'created', isAscending: false },
      filters: [],
      offset: 0,
      limit: process.env.INSTANCE_NAME === 'ncrc' ? 100 : 10,
      timezoneOffsetMinutes: new Date().getTimezoneOffset(),
    },
    fetchPolicy: 'cache-and-network',
  })

  const invitationId = window.localStorage.getItem('invitationId')
    ? window.localStorage.getItem('invitationId')
    : ''

  if (invitationId) {
    return <Redirect to="/invitation/accepted" />
  }

  const [reviewerRespond] = useMutation(mutations.reviewerResponseMutation)

  const [updateMemberStatus] = useMutation(UPDATE_MEMBER_STATUS_MUTATION)
  // const [deleteManuscript] = useMutation(mutations.deleteManuscriptMutation, {
  //   update: (cache, { data: { deleteManuscript } }) => {
  //     const data = cache.readQuery({ query: queries.dashboard })
  //     const manuscripts = data.manuscripts.filter(
  //       manuscript => manuscript.id !== deleteManuscript,
  //     )
  //     cache.writeQuery({
  //       query: queries.dashboard,
  //       data: {
  //         manuscripts,
  //       },
  //     })
  //   },
  // })

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />
  const currentUser = data && data.currentUser

  const latestVersions = data.manuscriptsUserHasCurrentRoleIn.manuscripts.map(
    getLatestVersion,
  )

  const authorLatestVersions = getManuscriptsUserHasRoleIn(
    latestVersions,
    currentUser.id,
    ['author'],
  )

  const reviewerLatestVersions = getManuscriptsUserHasRoleIn(
    latestVersions,
    currentUser.id,
    ['reviewer', 'invited:reviewer', 'accepted:reviewer', 'completed:reviewer'],
  )

  const editorLatestVersions = getManuscriptsUserHasRoleIn(
    latestVersions,
    currentUser.id,
    ['seniorEditor', 'handlingEditor', 'editor'],
  )

  // Editors are always linked to the parent/original manuscript, not to versions

  const urlFrag = config.journal.metadata.toplevel_urlfragment
  const instanceName = process.env.INSTANCE_NAME

  const shouldShowShortId =
    config['client-features'].displayShortIdAsIdentifier &&
    config['client-features'].displayShortIdAsIdentifier.toLowerCase() ===
      'true'

  return (
    <Dashboard
      authorLatestVersions={authorLatestVersions}
      currentUser={currentUser}
      editorLatestVersions={editorLatestVersions}
      instanceName={instanceName}
      newSubmission={() => history.push(`${urlFrag}/newSubmission`)}
      prettyRoleText={prettyRoleText}
      reviewerLatestVersions={reviewerLatestVersions}
      reviewerRespond={reviewerRespond}
      shouldShowShortId={shouldShowShortId}
      updateMemberStatus={updateMemberStatus}
      urlFrag={urlFrag}
      applySearchQuery={null}
      currentSearchQuery={null}
    />
  )
}

DashboardPage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
}

export default DashboardPage
