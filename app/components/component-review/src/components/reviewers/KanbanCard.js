import React from 'react'
import { grid } from '@pubsweet/ui-toolkit'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { UserAvatar } from '../../../../component-avatar/src'

const Card = styled.div`
  background-color: #f8f8f9;
  border-radius: 8px;
  display: flex;
  max-width: 20vw;
  padding: 10px;

  &:hover {
    box-shadow: 0px 9px 5px -6px #868686;
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
`

export const KanbanCard = ({ reviewer }) => {
  return (
    <Card>
      <AvatarGrid>
        <UserAvatar user={reviewer} />
      </AvatarGrid>
      <InfoGrid>
        <NameDisplay>{reviewer.username}</NameDisplay>
        <DateDisplay>Placeholder date</DateDisplay>
      </InfoGrid>
    </Card>
  )
}

// Refering to Reviwers.js props
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
}

export default KanbanCard
