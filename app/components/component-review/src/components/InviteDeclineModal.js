import React from 'react'
import Modal from '../../../component-kanban-modal'

const InviteDeclineModal = invitation => {
  return (
    <Modal
      isOpen
      subtitle={`Declined: ${invitation.responseDate}`}
      title={`${invitation.user.username}'s Invitation Decline`}
    >
        <div>
            <img src={invitation.user.profilePicture} alt={${invitation.}}></img>
        </div>
    </Modal>
  )
}

export default InviteDeclineModal
