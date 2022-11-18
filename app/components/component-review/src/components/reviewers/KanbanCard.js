import React from 'react'
import { grid } from '@pubsweet/ui-toolkit'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { UserAvatar } from '../../../../component-avatar/src'
import { convertTimestampToRelativeDateString } from '../../../../../shared/dateUtils'

const Card = styled.div`
  background-color: #f8f8f9;
  border-bottom: 0.8px solid #bfbfbf;
  border-radius: 8px;
  display: flex;
  padding: 10px;
  width: 100%;

  &:hover {
    box-shadow: 0px 9px 5px -6px #bfbfbf;
    transition: 0.3s ease;
  }
`

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${grid(1)};
`

const AvatarGrid = styled.div`
  align-items: center;
  display: flex;
`

const NameDisplay = styled.div`
  font-weight: bold;
`

const DateDisplay = styled.div`
  color: gray;
  font-size: 14px;
  line-height: 1.2;
`

const KanbanCard = ({ reviewer, onClickAction }) => {
  return (
    <Card onClick={onClickAction}>
      <AvatarGrid>
        <UserAvatar user={reviewer.user} />
      </AvatarGrid>
      <InfoGrid>
        <NameDisplay>{reviewer.user.username}</NameDisplay>
        <DateDisplay>
          Last updated {convertTimestampToRelativeDateString(reviewer.updated)}
        </DateDisplay>
      </InfoGrid>
    </Card>
  )
}

KanbanCard.propTypes = {
  reviwer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      defaultIdentity: PropTypes.shape({
        identifier: PropTypes.string.isRequired,
      }),
    }).isRequired,
  }).isRequired,
  onClickAction: PropTypes.func.isRequired,
}

export default KanbanCard