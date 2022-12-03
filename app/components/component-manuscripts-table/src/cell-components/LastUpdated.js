import React from 'react'
import styled from 'styled-components'
import { getMembersOfTeam } from '../../../../shared/manuscriptUtils'
import { convertTimestampToRelativeDateString } from '../../../../shared/dateUtils'

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
