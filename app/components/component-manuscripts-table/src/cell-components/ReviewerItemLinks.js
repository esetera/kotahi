import React from 'react'
import { useHistory } from 'react-router-dom'
import { Action, ActionGroup } from '@pubsweet/ui'

/**
 * ReviewLink
 * @param {string} urlFrag urlFragment
 * @param {function} reviewerRespond graphQL query callback
 * @param {function} updateMemberStatus graphQL query callback
 * @param {object} currentUser current user
 * @param {function} setMainActionLink callback to set main action link
 */
const ReviewerItemLinks = ({
  manuscript,
  urlFrag,
  reviewerRespond,
  currentUser,
  updateMemberStatus,
  setMainActionLink,
}) => {
  const team =
    (manuscript.teams || []).find(team_ => team_.role === 'reviewer') || {}

  const currentMember =
    team.members &&
    team.members.find(member => member.user.id === currentUser.id)

  const status = currentMember && currentMember.status

  const history = useHistory()

  const mainActionLink =
    status === 'invited' || status === 'rejected'
      ? `${urlFrag}/versions/${manuscript.id}/reviewPreview`
      : `${urlFrag}/versions/${manuscript.parentId || manuscript.id}/review`

  setMainActionLink(mainActionLink)

  const reviewLinkText = {
    completed: 'Completed',
    accepted: 'Do Review',
    inProgress: 'Continue Review',
  }

  if (['accepted', 'completed', 'inProgress'].includes(status)) {
    return (
      <ActionGroup>
        <Action
          onClick={async e => {
            e.stopPropagation()
            // on click, update review status before forwarding to link

            if (status === 'accepted') {
              await updateMemberStatus({
                variables: {
                  manuscriptId: manuscript.id,
                  status: 'inProgress',
                },
              })
            }

            history.push(mainActionLink)
          }}
        >
          {reviewLinkText[status]}
        </Action>
      </ActionGroup>
    )
  }

  if (status === 'invited') {
    return (
      <ActionGroup>
        <Action
          data-testid="accept-review"
          onClick={e => {
            e.stopPropagation()
            reviewerRespond({
              variables: {
                currentUserId: currentUser.id,
                action: 'accepted',
                teamId: team.id,
              },
            })
          }}
        >
          Accept
        </Action>
        <Action
          data-testid="reject-review"
          onClick={e => {
            e.stopPropagation()
            reviewerRespond({
              variables: {
                currentUserId: currentUser.id,
                action: 'rejected',
                teamId: team.id,
              },
            })
          }}
        >
          Reject
        </Action>
      </ActionGroup>
    )
  }

  return (
    <ActionGroup>
      <Action disabled>{status}</Action>
    </ActionGroup>
  )
}

export default ReviewerItemLinks
