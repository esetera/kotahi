import React from 'react'
import { ConfigurableStatus } from '../../../shared'
import reviewStatuses from '../../../../../config/journal/review-status'

const ReviewerBadge = ({ manuscript, currentUser }) => {
  const team =
    (manuscript.teams || []).find(team_ => team_.role === 'reviewer') || {}

  const currentMember =
    team.members &&
    team.members.find(member => member.user.id === currentUser.id)

  const status = currentMember && currentMember.status

  // get item in list with value === status
  const statusConfig = reviewStatuses.find(item => item.value === status)

  return (
    <ConfigurableStatus
      color={statusConfig.color}
      lightText={statusConfig.lightText}
    >
      {statusConfig.label}
    </ConfigurableStatus>
  )
}

export default ReviewerBadge
