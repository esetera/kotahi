import React from 'react'
import DecisionVersion from './DecisionVersion'
import gatherManuscriptVersions from '../../../../shared/manuscript_versions'

import {
  VersionSwitcher,
  ErrorBoundary,
  Columns,
  Manuscript,
  Chat,
} from '../../../shared'
import MessageContainer from '../../../component-chat/src/MessageContainer'

const DecisionVersions = props => {
  const {
    allUsers,
    currentUser,
    decisionForm,
    form,
    handleChange,
    updateManuscript,
    manuscript,
    sendNotifyEmail,
    sendChannelMessageCb,
    makeDecision,
    updateReviewJsonData,
    publishManuscript,
    updateTeam,
    createTeam,
    updateReview,
    reviewByCurrentUser,
    reviewForm,
    reviewers,
    teamLabels,
    canHideReviews,
    urlFrag,
    displayShortIdAsIdentifier,
    deleteFile,
    createFile,
    threadedDiscussions,
    validateDoi,
  } = props

  const versions = gatherManuscriptVersions(manuscript)

  // Protect if channels don't exist for whatever reason
  let editorialChannelId, allChannelId

  if (Array.isArray(manuscript.channels) && manuscript.channels.length) {
    editorialChannelId = manuscript.channels.find(c => c.type === 'editorial')
      .id
    allChannelId = manuscript.channels.find(c => c.type === 'all').id
  }

  const channels = [
    { id: allChannelId, name: 'Discussion with author' },
    { id: editorialChannelId, name: 'Editorial discussion' },
  ]

  return (
    <Columns>
      <Manuscript>
        <ErrorBoundary>
          <VersionSwitcher>
            {versions.map((version, index) => (
              <DecisionVersion
                allUsers={allUsers}
                canHideReviews={canHideReviews}
                createFile={createFile}
                createTeam={createTeam}
                current={index === 0}
                currentUser={currentUser}
                decisionForm={decisionForm}
                deleteFile={deleteFile}
                displayShortIdAsIdentifier={displayShortIdAsIdentifier}
                form={form}
                key={version.manuscript.id}
                makeDecision={makeDecision}
                onChange={handleChange}
                parent={manuscript}
                publishManuscript={publishManuscript}
                reviewByCurrentUser={reviewByCurrentUser}
                reviewers={reviewers}
                reviewForm={reviewForm}
                sendChannelMessageCb={sendChannelMessageCb}
                sendNotifyEmail={sendNotifyEmail}
                teamLabels={teamLabels}
                threadedDiscussions={threadedDiscussions}
                updateManuscript={updateManuscript}
                updateReview={updateReview}
                updateReviewJsonData={updateReviewJsonData}
                updateTeam={updateTeam}
                urlFrag={urlFrag}
                validateDoi={validateDoi}
                version={version.manuscript}
              />
            ))}
          </VersionSwitcher>
        </ErrorBoundary>
      </Manuscript>
      <Chat>
        <MessageContainer channels={channels} manuscriptId={manuscript.id} />
      </Chat>
    </Columns>
  )
}

export default DecisionVersions
