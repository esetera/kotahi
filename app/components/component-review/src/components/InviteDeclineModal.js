import React from 'react'
import styled from 'styled-components'
import { UserAvatar } from '../../../component-avatar/src'
import Modal from '../../../component-kanban-modal'
import { ErrorStatus } from '../../../shared'

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const DeclinedReasonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ModalBodyRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`

const StyledH4 = styled.h4`
  font-weight: 600;
`

const DeclinedBadge = styled(ErrorStatus)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #c23d20;
  width: 125px;
`

const InviteDeclineModal = () => {
  const invitation = {
    responseDate: 'May 17, 2021',
    declinedReason:
      'I am too busy with CS374. I don’t have time to deal with reviewing this manuscript. I will be able to review it in the future. Thank you. No worries lol. ',
    invitedPersonName: 'Aditya Jain',
    user: {
      profilePicture: null,
    },
  }

  return (
    <Modal
      isOpen
      subtitle={`Declined: ${invitation.responseDate}`}
      title={`${invitation.invitedPersonName}'s Invitation Decline`}
    >
      <ModalBody>
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
          <DeclinedBadge>Declined</DeclinedBadge>
        </ModalBodyRow>
        <DeclinedReasonRow>
          <StyledH4>Declined Reason</StyledH4>
          <p>{invitation.declinedReason}</p>
        </DeclinedReasonRow>
      </ModalBody>
    </Modal>
  )
}

export default InviteDeclineModal
