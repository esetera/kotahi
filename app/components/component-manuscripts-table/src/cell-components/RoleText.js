import React from 'react'
import Moment from 'react-moment'
import { getSubmitedDate, getRoles } from '../../../../shared/manuscriptUtils'
import prettyRoleText from '../../../../shared/prettyRoleText'

const MetadataSubmittedDate = ({ submitted }) => (
  <span>
    Submitted on <Moment format="YYYY-MM-DD">{submitted}</Moment>.
  </span>
)

const RoleText = ({ manuscript, currentUser }) => {
  const currentRoles = getRoles(manuscript, currentUser.id)
  return (
    <>
      {getSubmitedDate(manuscript) ? (
        <MetadataSubmittedDate submitted={getSubmitedDate(manuscript).date} />
      ) : null}
      &nbsp;You are {prettyRoleText(currentRoles)}.
    </>
  )
}

export default RoleText
