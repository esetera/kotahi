import React, { useState } from 'react'
import { grid, th } from '@pubsweet/ui-toolkit'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Action } from '@pubsweet/ui'
import { gql, useMutation } from '@apollo/client'
import { UserAvatar } from '../../../../component-avatar/src'
import { convertTimestampToRelativeDateString } from '../../../../../shared/dateUtils'
import Modal from '../../../../component-modal/src'
import {
  LooseColumn,
  ActionButton,
  MediumRow,
  UserCombo,
  Primary,
  Secondary,
  UserInfo,
} from '../../../../shared'

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

const ModalContainer = styled(LooseColumn)`
  background-color: ${th('colorBackground')};
  padding: ${grid(2.5)} ${grid(3)};
  z-index: 10000;
`

const teamFields = `
  id
  role
  name
  objectId
  objectType
  members {
    id
    user {
      id
      username
      profilePicture
      isOnline
      defaultIdentity {
        id
        identifier
      }
    }
    status
    isShared
  }
`

const removeReviewerMutation = gql`
  mutation($manuscriptId: ID!, $userId: ID!) {
    removeReviewer(manuscriptId: $manuscriptId, userId: $userId) {
      ${teamFields}
    }
  }
`

const KanbanCard = ({ reviewer, manuscript, onClickAction }) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [removeReviewer] = useMutation(removeReviewerMutation)
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
      <Action onClick={() => setIsConfirmingDelete(true)}>Delete</Action>
      <Modal isOpen={isConfirmingDelete}>
        <ModalContainer>
          Delete this reviewer?
          <UserCombo>
            <UserAvatar user={reviewer.user} />
            <UserInfo>
              <Primary>{`Reviewer: ${reviewer.user?.username}`}</Primary>
              <Secondary>{reviewer.user?.defaultIdentity.identifier}</Secondary>
            </UserInfo>
          </UserCombo>
          <MediumRow>
            <ActionButton
              onClick={() => {
                removeReviewer({
                  variables: {
                    userId: reviewer.user.id,
                    manuscriptId: manuscript.id,
                  },
                })
                setIsConfirmingDelete(false)
              }}
              primary
            >
              Ok
            </ActionButton>
            &nbsp;
            <ActionButton onClick={() => setIsConfirmingDelete(false)}>
              Cancel
            </ActionButton>
          </MediumRow>
        </ModalContainer>
      </Modal>
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
