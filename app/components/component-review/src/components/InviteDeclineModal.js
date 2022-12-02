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
          <h4 style={{ fontWeight: 600, marginRight: '5px' }}>Reviewer: </h4>
          <p>{invitation.invitedPersonName}</p>
        </ModalBodyRow>
        <ModalBodyRow>
          <h4 style={{ fontWeight: 600 }}>Status</h4>
          <ErrorStatus>Declined</ErrorStatus>
        </ModalBodyRow>
        <DeclinedReasonRow>
          <h4 style={{ fontWeight: 600 }}>Declined Reason</h4>
          <p>{invitation.declinedReason}</p>
        </DeclinedReasonRow>
      </ModalBody>
    </Modal>
  )
}

export default InviteDeclineModal
