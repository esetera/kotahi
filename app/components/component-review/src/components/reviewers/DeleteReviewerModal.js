import { grid, th } from '@pubsweet/ui-toolkit'
import React from 'react'
import styled from 'styled-components'
import { UserAvatar } from '../../../../component-avatar/src'
import Modal, { StackedHeader } from '../../../../component-kanban-modal'
import {
  ActionButton,
  LooseColumn,
  MediumRow,
  Primary,
  Secondary,
  UserCombo,
  UserInfo,
} from '../../../../shared'

const ModalContainer = styled(LooseColumn)`
  background-color: ${th('colorBackground')};
  padding: ${grid(2.5)} ${grid(3)};
`

const ReviewerName = styled.span`
  font-weight: normal;
`

const DeleteReviewerModal = ({
  reviewer,
  manuscript,
  isOpen,
  onClose,
  removeReviewer,
}) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalContainer>
        <StackedHeader title="Delete this reviewer?" />
        <UserCombo>
          <UserAvatar user={reviewer.user} />
          <UserInfo>
            <Primary>
              Reviewer: <ReviewerName>{reviewer.user?.username}</ReviewerName>
            </Primary>
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
              onClose()
            }}
            primary
          >
            Ok
          </ActionButton>
          &nbsp;
          <ActionButton onClick={onClose}>Cancel</ActionButton>
        </MediumRow>
      </ModalContainer>
    </Modal>
  )
}

export default DeleteReviewerModal
