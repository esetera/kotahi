import React from 'react'
import styled from 'styled-components'
import { getMembersOfTeam } from '../../../../shared/manuscriptUtils'
import { convertTimestampToRelativeDateString } from '../../../../shared/dateUtils'
// https://gitlab.coko.foundation/kotahi/kotahi/-/blob/peer-review-dashboard/app/components/component-review/src/components/reviewers/KanbanCard.js
// convertTimestampToRelativeDateString(reviewer.updated)
// https://gitlab.coko.foundation/kotahi/kotahi/-/blob/sort-kanban-cards/app/components/component-review/src/components/KanbanBoard.js
//   const reviewersTeam = teams.find(team => team.role === 'reviewer') || {}
// const reviewers = reviewersTeam.members || []

const DateDisplay = styled.div`
  font-size: 14px;
  line-height: 1.2;
`

const LastUpdated = ({ manuscript }) => {
  return (
    <DateDisplay>
      {convertTimestampToRelativeDateString(
        getMembersOfTeam(manuscript, 'reviewer')
          .map(reviewer => reviewer.updated)
          .reduce((min, b) => (new Date(b) < new Date(min) ? b : min)),
      )}
    </DateDisplay>
  )
}

export default LastUpdated
