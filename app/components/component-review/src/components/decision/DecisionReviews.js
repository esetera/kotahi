import React from 'react'
import { Action } from '@pubsweet/ui'
import PropTypes from 'prop-types'
import DecisionReview from './DecisionReview'
import { SectionHeader, SectionRow, Title } from '../style'
import { SectionContent } from '../../../../shared'
import ThreadedDiscussion from '../../../../component-formbuilder/src/components/builderComponents/ThreadedDiscussion'

// TODO: read reviewer ordinal and name from project reviewer
// const { status } =
//     getUserFromTeam(manuscript, 'reviewer').filter(
//       member => member.user.id === currentUser.id,
//     )[0] || {}
//   return status
const threadedDiscussiondata = {
  isValid: true,
  isSubmitting: true,
  createdAt: '2022-04-27',
  updatedAt: '2022-04-28',
  channelId: '8542101c-fc13-4d3f-881f-67243beaf83a',
  comments: [
    {
      id: 123,
      value:
        '<p>lLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
      author: {
        __typename: 'User',
        id: '20ca2a8d-d78e-4260-baed-86369992353f',
        username: 'Kotahi Author',
        profilePicture: null,
        online: null,
      },
      createdAt: '2022-04-27 12:12:12',
      updatedAt: '2022-04-28 00:00:00',
      userCanEditOwnComment: false,
      userCanEditAnyComment: false,
    },
    {
      id: 124,
      value:
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>',
      author: {
        __typename: 'User',
        id: '20ca2a8d-d78e-4260-baed-86369992353f',
        username: 'Kotahi Author',
        profilePicture: null,
        online: null,
      },
      createdAt: '2022-04-27 00:00:00',
      updatedAt: '2022-04-28 00:00:00',
      userCanEditOwnComment: false,
      userCanEditAnyComment: false,
    },
    {
      id: 125,
      value:
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>',
      author: {
        __typename: 'User',
        id: '20ca2a8d-d78e-4260-baed-86369992353f',
        username: 'Kotahi Author',
        profilePicture: null,
        online: null,
      },
      createdAt: '2022-04-27 00:00:00',
      updatedAt: '2022-04-28 00:00:00',
      userCanEditOwnComment: false,
      userCanEditAnyComment: false,
    },
  ],
  autoFocus: true,
  placeholder: 'Add your feedback here',
  user: {
    __typename: 'User',
    id: '20ca2a8d-d78e-4260-baed-86369992353f',
    username: 'Kotahi Author',
    profilePicture: null,
    online: null,
  },
}

const getCompletedReviews = (manuscript, currentUser) => {
  const team = manuscript.teams.find(team_ => team_.role === 'reviewer') || {}

  if (!team.members) {
    return null
  }

  const currentMember = team.members.find(m => m.user?.id === currentUser?.id)
  return currentMember && currentMember.status
}

const DecisionReviews = ({
  reviewers,
  reviewForm,
  manuscript,
  updateReview,
  canHideReviews,
  urlFrag,
}) => {
  return (
    <SectionContent>
      <SectionHeader>
        <Title>Reviews</Title>
        <ThreadedDiscussion {...threadedDiscussiondata}/>
      </SectionHeader>
      {manuscript.reviews && manuscript.reviews.length ? (
        manuscript.reviews
          .filter(
            review =>
              getCompletedReviews(manuscript, review.user) === 'completed' &&
              review.isDecision === false,
          )
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
          .map((review, index) => (
            <SectionRow key={review.id}>
              <DecisionReview
                canHideReviews={canHideReviews}
                isControlPage
                manuscriptId={manuscript.id}
                open
                review={review}
                reviewer={{ user: review.user, ordinal: index + 1 }}
                reviewForm={reviewForm}
                teams={manuscript.teams}
                updateReview={updateReview}
              />
            </SectionRow>
          ))
      ) : (
        <SectionRow>No reviews completed yet.</SectionRow>
      )}
      <SectionRow>
        <Action to={`${urlFrag}/versions/${manuscript.id}/reviewers`}>
          Manage Reviewers
        </Action>
      </SectionRow>
    </SectionContent>
  )
}

DecisionReviews.propTypes = {
  manuscript: PropTypes.shape({
    id: PropTypes.string.isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.shape({
          id: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    ).isRequired,
    teams: PropTypes.arrayOf(
      PropTypes.shape({
        role: PropTypes.string.isRequired,
        members: PropTypes.arrayOf(
          PropTypes.shape({
            user: PropTypes.shape({
              id: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
        ).isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
}

export default DecisionReviews
