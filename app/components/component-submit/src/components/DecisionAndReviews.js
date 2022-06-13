import React from 'react'
import { Attachment } from '@pubsweet/ui'

// TODO: Sort out the imports, perhaps make DecisionReview a shared component?
import DecisionReview from '../../../component-review/src/components/decision/DecisionReview'
import { UserAvatar } from '../../../component-avatar/src'
import useCurrentUser from '../../../../hooks/useCurrentUser'

import {
  SectionHeader,
  SectionRow,
  Title,
  SectionContent,
} from '../../../shared'
import ThreadedDiscussion from '../../../component-formbuilder/src/components/builderComponents/ThreadedDiscussion'

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

const Decision = ({ decision, editor }) =>
  decision ? (
    <>
      <SectionRow>
        <p>Decision: {decision.recommendation}.</p>
      </SectionRow>
      <SectionRow>
        <p>Comment:</p>
        <p
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: decision?.decisionComment?.content,
          }}
        />
      </SectionRow>
      {decision?.decisionComment?.files?.length > 0 && (
        <SectionRow>
          {decision.decisionComment.files.map(f => (
            <Attachment
              file={{ ...f, url: f.storedObjects[0].url }}
              key={f.storedObjects[0].url}
              uploaded
            />
          ))}
        </SectionRow>
      )}
      <SectionRow>
        <UserAvatar username={editor?.username} />
        Written by {editor?.username}
      </SectionRow>
    </>
  ) : (
    <SectionRow>Pending.</SectionRow>
  )

const DecisionAndReviews = ({ manuscript }) => {
  const currentUser = useCurrentUser()

  const decision =
    manuscript.reviews &&
    !!manuscript.reviews.length &&
    manuscript.reviews.find(review => review.isDecision)

  const reviews =
    manuscript.reviews &&
    !!manuscript.reviews.length &&
    manuscript.reviews.filter(review => !review.isDecision)

  if (!currentUser) return null

  const authorTeam =
    manuscript.teams &&
    !!manuscript.teams.length &&
    manuscript.teams.find(team => {
      return team.role.toLowerCase().includes('author')
    })

  const isCurrentUserAuthor = authorTeam
    ? authorTeam.members.find(member => member.user.id === currentUser.id)
    : false

  const reviewsToShow = reviews.filter(
    review => !review.isHiddenFromAuthor && isCurrentUserAuthor,
  )

  return (
    <>
      <SectionContent>
        <SectionHeader>
          <Title>Decision</Title>
        </SectionHeader>
        <Decision decision={decision} editor={decision?.user} />
        <ThreadedDiscussion {...threadedDiscussiondata} />
      </SectionContent>
      <SectionContent>
        <SectionHeader>
          <Title>Reviews</Title>
        </SectionHeader>

        {reviewsToShow.length ? (
          reviewsToShow.map((review, index) => (
            <SectionRow key={review.id}>
              <DecisionReview
                open
                review={review}
                reviewer={{
                  name: review.user.username,
                  ordinal: index + 1,
                  user: review.user,
                }}
                teams={manuscript.teams}
              />
            </SectionRow>
          ))
        ) : (
          <SectionRow>
            {reviews.length ? 'No reviews to show.' : 'No completed reviews.'}
          </SectionRow>
        )}
      </SectionContent>
    </>
  )
}

export default DecisionAndReviews
