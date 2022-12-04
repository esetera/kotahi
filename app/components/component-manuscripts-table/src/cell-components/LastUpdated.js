import React from 'react'
import styled from 'styled-components'
import { getMembersOfTeam } from '../../../../shared/manuscriptUtils'
import { convertTimestampToRelativeDateString } from '../../../../shared/dateUtils'

const DateDisplay = styled.div`
  font-size: 14px;
  line-height: 1.2;
`

const LastUpdated = ({ manuscript }) => {
  let updatedTimes = getMembersOfTeam(manuscript, 'reviewer').map(reviewer => reviewer.updated)
  let timestamp = 'N/A'
  if (updatedTimes.length > 0) {
    timestamp = convertTimestampToRelativeDateString(updatedTimes.reduce((min, b) => (new Date(b) < new Date(min) ? b : min)))
  }
  return (
    <DateDisplay>
      {timestamp}
    </DateDisplay>
  )
}

export default LastUpdated
