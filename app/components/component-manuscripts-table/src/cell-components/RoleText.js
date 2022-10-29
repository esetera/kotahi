import React from 'react'
import Moment from 'react-moment'
import { getSubmittedDate, getRoles } from '../../../../shared/manuscriptUtils'
import prettyRoleText from '../../../../shared/prettyRoleText'

const MetadataSubmittedDate = ({ submitted }) => (
  <span>
    Submitted on <Moment format="YYYY-MM-DD">{submitted}</Moment>.
  </span>
)

/*
Depreciated Component to display your roles
*/

const RoleText = ({ manuscript, currentUser }) => {
  const currentRoles = getRoles(manuscript, currentUser.id)
  return (
    <>
      {getSubmittedDate(manuscript) ? (
        <MetadataSubmittedDate submitted={getSubmittedDate(manuscript).date} />
      ) : null}
      &nbsp;You are {prettyRoleText(currentRoles)}.
    </>
  )
}

export default RoleText
