import React, { useEffect } from 'react'
// import Authorize from 'pubsweet-client/src/helpers/Authorize'
import { useQuery, useMutation } from '@apollo/client'

import config from 'config'
import { Redirect } from 'react-router-dom'
import ReactRouterPropTypes from 'react-router-prop-types'
import Dashboard from './Dashboard'

const DashboardPage = ({ history, ...props }) => {
  const invitationId = window.localStorage.getItem('invitationId')
    ? window.localStorage.getItem('invitationId')
    : ''

  if (invitationId) {
    return <Redirect to="/invitation/accepted" />
  }

  const [reviewerRespond] = useMutation(mutations.reviewerResponseMutation)

  const [updateMemberStatus] = useMutation(UPDATE_MEMBER_STATUS_MUTATION)

  const [removeTaskAlertsForCurrentUser] = useMutation(
    mutations.removeTaskAlertsForCurrentUserMutation,
  )

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

  // eslint-disable-next-line no-unused-vars
  const [createNewTaskAlerts] = useMutation(
    mutations.createNewTaskAlertsMutation,
  )

  // Dismiss any alerts only after the page is fully loaded, so the alert indicator remains visible
  useEffect(() => {
    const removeAlertsFunc = async () => removeTaskAlertsForCurrentUser()
    if (data) removeAlertsFunc()
  }, [!!data])

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />
  const currentUser = data && data.currentUser

  const latestVersions = data.manuscriptsUserHasCurrentRoleIn.map(
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
      createNewTaskAlerts={null /* For testing only: createNewTaskAlerts */}
      currentUser={currentUser}
      editorLatestVersions={editorLatestVersions}
      instanceName={instanceName}
      newSubmission={() => history.push(`${urlFrag}/newSubmission`)}
      shouldShowShortId={shouldShowShortId}
      urlFrag={urlFrag}
    />
  )
}

DashboardPage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
}

export default DashboardPage
