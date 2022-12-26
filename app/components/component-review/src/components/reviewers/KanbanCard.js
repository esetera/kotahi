import { grid, th } from '@pubsweet/ui-toolkit'
import { Action } from '@pubsweet/ui/dist/molecules'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Send } from 'react-feather'
import styled from 'styled-components'
import { convertTimestampToRelativeDateString } from '../../../../../shared/dateUtils'
import { UserAvatar } from '../../../../component-avatar/src'
import DeleteReviewerModal from './DeleteReviewerModal'

const Card = styled.div`
  background-color: #f8f8f9;
  border-bottom: 0.8px solid #bfbfbf;
  border-radius: 8px;
  display: flex;
  padding: 10px;
  width: 100%;

  &:hover {
    box-shadow: 0px 9px 5px -6px #bfbfbf;
    cursor: pointer;
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
  isInvitation,
  manuscript,
  onClickAction,
  removeReviewer,
}) => {
  const [confirmingDelete, setConfirmingDelete] = useState(false)
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
        {isInvitation ? (
          <EmailInvitedReviewer>
            Email invited
            <SendIcon invitationStatus={reviewer.status.toLowerCase()} />
          </EmailInvitedReviewer>
        ) : (
          <DateDisplay>
            Last updated{' '}
            {convertTimestampToRelativeDateString(reviewer.updated)}
          </DateDisplay>
        )}
      </InfoGrid>
      <Action onClick={() => setConfirmingDelete(true)}>Delete</Action>
      <DeleteReviewerModal
        isOpen={confirmingDelete}
        manuscript={manuscript}
        onClose={() => setConfirmingDelete(false)}
        removeReviewer={removeReviewer}
        reviewer={reviewer}
      />
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
  isInvitation: PropTypes.bool.isRequired,
}

export default KanbanCard
