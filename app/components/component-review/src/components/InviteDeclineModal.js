import React from 'react'
import styled from 'styled-components'
import { convertTimestampToDateString } from '../../../../shared/dateUtils'
import { UserAvatar } from '../../../component-avatar/src'
import Modal from '../../../component-kanban-modal'
import { ConfigurableStatus } from '../../../shared'

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ResponseCommentRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ModalBodyRow = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 10px;
`

const StyledH4 = styled.h4`
  font-weight: 600;
`

const DeclinedBadge = styled(ConfigurableStatus)`
  background: #c23d20;
`

const InviteDeclineModal = ({ invitation, isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      subtitle={`Declined: ${convertTimestampToDateString(
        invitation.responseDate,
      )}`}
      title={`${invitation.invitedPersonName}'s Invitation Decline`}
    >
      <ModalBody style={{ width: '600px' }}>
        <ModalBodyRow style={{ gap: '0px' }}>
          <UserAvatar
            size={56}
            style={{ marginRight: '15px' }}
            user={invitation.user}
          />
          <StyledH4 style={{ marginRight: '5px' }}>Reviewer: </StyledH4>
          <p>{invitation.invitedPersonName}</p>
        </ModalBodyRow>
        <ModalBodyRow>
          <StyledH4>Status</StyledH4>
          <DeclinedBadge lightText>Declined</DeclinedBadge>
          {invitation.declinedReason === 'DO_NOT_CONTACT' && (
            <DeclinedBadge lightText>Opted Out</DeclinedBadge>
          )}
        </ModalBodyRow>
        <ResponseCommentRow>
          <StyledH4>Declined Reason</StyledH4>
          <p>{invitation.responseComment || 'No reason provided.'}</p>
        </ResponseCommentRow>
      </ModalBody>
    </Modal>
  )
}

export default InviteDeclineModal
