import React, { useEffect } from 'react'
// import Authorize from 'pubsweet-client/src/helpers/Authorize'
import { useQuery, useMutation } from '@apollo/client'

import config from 'config'
import { Redirect } from 'react-router-dom'
import ReactRouterPropTypes from 'react-router-prop-types'
import Dashboard from './Dashboard'
import mutations from '../graphql/mutations'
import { UPDATE_MEMBER_STATUS_MUTATION } from '../../../../queries/team'


const DashboardPage = ({ history, ...props }) => {
  const invitationId = window.localStorage.getItem('invitationId')
    ? window.localStorage.getItem('invitationId')
    : ''

  if (invitationId) {
    return <Redirect to="/invitation/accepted" />
  }

  // Editors are always linked to the parent/original manuscript, not to versions

  const urlFrag = config.journal.metadata.toplevel_urlfragment
  const instanceName = process.env.INSTANCE_NAME

  const shouldShowShortId =
    config['client-features'].displayShortIdAsIdentifier &&
    config['client-features'].displayShortIdAsIdentifier.toLowerCase() ===
      'true'

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
