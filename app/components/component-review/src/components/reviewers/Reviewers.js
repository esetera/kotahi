import React from 'react'
import styled from 'styled-components'
import { Action, Checkbox } from '@pubsweet/ui'
import { grid } from '@pubsweet/ui-toolkit'
import PropTypes from 'prop-types'
import config from 'config'
import ReviewerForm from './ReviewerForm'
import { AdminSection } from '../style'
import {
  SectionRow,
  SectionContent,
  SectionHeader,
  Title,
  StatusBadge,
  Primary,
  Secondary,
} from '../../../../shared'

// TODO: Make this a proper shared component?
import { UserAvatar } from '../../../../component-avatar/src'

const ReviewersList = styled.div`
  display: grid;
  grid-gap: ${grid(2)};
  grid-template-columns: repeat(auto-fill, minmax(${grid(20)}, 1fr));
`

const Reviewer = styled.div``

// const urlFrag = config.journal.metadata.toplevel_urlfragment

const InviteReviewer = ({ handleSubmit, isValid, reviewerUsers }) => {
  return (
    <>
      <SectionContent>
        <SectionHeader>
          <Title>Invite Reviewers</Title>
        </SectionHeader>
        <SectionRow>
          <ReviewerForm
            handleSubmit={handleSubmit}
            isValid={isValid}
            reviewerUsers={reviewerUsers}
          />
        </SectionRow>
      </SectionContent>
    </>
  )
}

const Reviewers = ({
  reviewers,
  manuscript,
  removeReviewer,
  updateTeamMember,
  refetchManuscriptData,
  isValid,
  reviewerUsers,
  handleSubmit,
}) => {
  const toggleReviewerSharedStatus = async (id, delta) => {
    await updateTeamMember({
      variables: {
        id,
        input: JSON.stringify(delta),
      },
    })
    refetchManuscriptData()
  }

  return (
    <>
      <AdminSection>
        <InviteReviewer
          handleSubmit={handleSubmit}
          isValid={isValid}
          reviewerUsers={reviewerUsers}
        />
      </AdminSection>
      <AdminSection>
        <SectionContent>
          <SectionHeader>
            <Title>Reviewer Status</Title>
          </SectionHeader>
          <SectionRow>
            {reviewers && reviewers.length ? (
              <ReviewersList>
                {reviewers
                  .slice()
                  .sort((reviewOne, reviewTwo) => {
                    // Get the username of reviewer and convert to uppercase
                    const usernameOne = reviewOne.user.username.toUpperCase()
                    const usernameTwo = reviewTwo.user.username.toUpperCase()

                    // Sort by username
                    if (usernameOne < usernameTwo) return -1
                    if (usernameOne > usernameTwo) return 1

                    // If the username don't match then sort by reviewId
                    if (reviewOne.id < reviewTwo.id) return -1
                    if (reviewOne.id > reviewTwo.id) return 1

                    return 0
                  })
                  .map(reviewer => (
                    <Reviewer key={reviewer.id}>
                      <StatusBadge minimal status={reviewer.status} />
                      <UserAvatar key={reviewer.id} user={reviewer.user} />
                      <Primary>{reviewer.user.username}</Primary>
                      <Secondary>
                        {reviewer.user.defaultIdentity.identifier}
                      </Secondary>
                      {config.review.shared === 'true' && (
                        <Checkbox
                          checked={reviewer.isShared}
                          label="Shared"
                          name={`checkbox-shared-reviewer-${reviewer.id}`}
                          onChange={() =>
                            toggleReviewerSharedStatus(reviewer.id, {
                              isShared: !reviewer.isShared,
                            })
                          }
                        />
                      )}
                      <div>
                        <Action
                          onClick={() =>
                            removeReviewer({
                              variables: {
                                userId: reviewer.user.id,
                                manuscriptId: manuscript.id,
                              },
                            })
                          }
                        >
                          Delete
                        </Action>
                      </div>
                    </Reviewer>
                  ))}
              </ReviewersList>
            ) : (
              <p>No reviewers have been invited yet</p>
            )}
          </SectionRow>
        </SectionContent>
      </AdminSection>
    </>
  )
}

Reviewers.propTypes = {
  isValid: PropTypes.bool.isRequired,
  reviewers: PropTypes.arrayOf(
    PropTypes.shape({
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
  ).isRequired,
  reviewerUsers: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  manuscript: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  removeReviewer: PropTypes.func.isRequired,
}

export default Reviewers
