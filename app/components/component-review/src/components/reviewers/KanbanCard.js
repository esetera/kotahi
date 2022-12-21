import { Action } from '@pubsweet/ui'
import { grid, th } from '@pubsweet/ui-toolkit'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Send } from 'react-feather'
import styled from 'styled-components'
import { convertTimestampToRelativeDateString } from '../../../../../shared/dateUtils'
import { UserAvatar } from '../../../../component-avatar/src'
import Modal from '../../../../component-modal/src'
import {
  ActionButton,
  LooseColumn,
  MediumRow,
  Primary,
  Secondary,
  UserCombo,
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

const EmailInvitedReviewer = styled.div`
  color: ${th('colorPrimary')};
  display: flex;
`

const SendIcon = styled(Send)`
  height: 25px;
  margin-bottom: -8px;
  margin-left: 5px;
  stroke: ${props =>
    props.invitationStatus === 'rejected'
      ? th('colorError')
      : th('colorPrimary')};
  width: 15px;
`

const KanbanCard = ({
  reviewer,
  manuscript,
  onClickAction,
  removeReviewer,
}) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  return (
    <Card onClick={onClickAction}>
      <AvatarGrid>
        <UserAvatar
          showHoverProfile={false}
          user={
            reviewer.user ?? {
              username: reviewer.invitedPersonName,
              isOnline: false,
            }
          }
        />
      </AvatarGrid>
      <InfoGrid>
        <NameDisplay>
          {reviewer.user?.username ?? reviewer.invitedPersonName}
        </NameDisplay>
        {reviewer.updated ? (
          <DateDisplay>
            Last updated{' '}
            {convertTimestampToRelativeDateString(reviewer.updated)}
          </DateDisplay>
        ) : (
          <EmailInvitedReviewer>
            Email invited
            <SendIcon invitationStatus={reviewer.status.toLowerCase()} />
          </EmailInvitedReviewer>
        )}
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
  reviewer: PropTypes.shape({
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
