import config from 'config'
import React from 'react'
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

  const instanceName = process.env.INSTANCE_NAME

  const shouldShowShortId =
    config['client-features'].displayShortIdAsIdentifier &&
    config['client-features'].displayShortIdAsIdentifier.toLowerCase() ===
      'true'

  const urlFrag = config.journal.metadata.toplevel_urlfragment

  return (
    <Dashboard
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
