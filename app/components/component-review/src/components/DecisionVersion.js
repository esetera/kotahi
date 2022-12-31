import React, { useRef, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { set, debounce } from 'lodash'
import { useLocation } from 'react-router-dom'
import DecisionReviews from './decision/DecisionReviews'
import AssignEditorsReviewers from './assignEditors/AssignEditorsReviewers'
import AssignEditor from './assignEditors/AssignEditor'
import EmailNotifications from './emailNotifications'
import ReadonlyFormTemplate from './metadata/ReadonlyFormTemplate'
import EditorSection from './decision/EditorSection'
import Publish from './Publish'
import { AdminSection } from './style'
import {
  HiddenTabs,
  SectionContent,
  SectionHeader,
  SectionRow,
  Title,
} from '../../../shared'
import DecisionAndReviews from '../../../component-submit/src/components/DecisionAndReviews'
import FormTemplate from '../../../component-submit/src/components/FormTemplate'
import TaskList from '../../../component-task-manager/src/TaskList'
import KanbanBoard from './KanbanBoard'
import InviteReviewer from './reviewers/InviteReviewer'

const createBlankSubmissionBasedOnForm = form => {
  const allBlankedFields = {}
  const fieldNames = form?.children?.map(field => field.name)
  fieldNames.forEach(fieldName => set(allBlankedFields, fieldName, ''))
  return allBlankedFields.submission ?? {}
}

const DecisionVersion = ({
  allUsers,
  addReviewer,
  decisionForm,
  form,
  currentDecisionData,
  currentUser,
  version,
  versionNumber,
  isCurrentVersion,
  parent,
  updateManuscript, // To handle manuscript editing
  onChange, // To handle form editing
  makeDecision,
  sendNotifyEmail,
  sendChannelMessageCb,
  publishManuscript,
  updateTeam,
  createTeam,
  updateReview,
  reviewForm,
  reviewers,
  teamLabels,
  canHideReviews,
  urlFrag,
  displayShortIdAsIdentifier,
  updateReviewJsonData,
  validateDoi,
  validateSuffix,
  createFile,
  deleteFile,
  threadedDiscussionProps,
  invitations,
  externalEmail,
  setExternalEmail,
  selectedEmail,
  setSelectedEmail,
  setShouldPublishField,
  isEmailAddressOptedOut,
  updateSharedStatusForInvitedReviewer,
  dois,
  refetch,
  updateTask,
  updateTasks,
  teams,
}) => {
  // Hooks from the old world
  const location = useLocation()

  const addEditor = (manuscript, label, isCurrent, user) => {
    const isThisReadOnly = !isCurrent

    const handleSave = useCallback(
      debounce(source => {
        updateManuscript(manuscript.id, { meta: { source } })
      }, 2000),
    )

    return {
      content: (
        <EditorSection
          currentUser={user}
          manuscript={manuscript}
          readonly={isThisReadOnly}
          saveSource={isThisReadOnly ? null : handleSave}
        />
      ),
      key: `editor_${manuscript.id}`,
      label,
    }
  }

  const reviewOrInitial = manuscript =>
    manuscript?.reviews?.find(review => review.isDecision) || {
      isDecision: true,
    }

  // Find an existing review or create a placeholder, and hold a ref to it
  const existingReview = useRef(reviewOrInitial(version))

  // Update the value of that ref if the manuscript object changes
  useEffect(() => {
    existingReview.current = reviewOrInitial(version)
  }, [version.reviews])

  const editorSection = addEditor(
    version,
    'Manuscript text',
    isCurrentVersion,
    currentUser,
  )

  const metadataSection = () => {
    const submissionValues = isCurrentVersion
      ? createBlankSubmissionBasedOnForm(form)
      : {}

    Object.assign(submissionValues, JSON.parse(version.submission))

    const versionValues = {
      ...version,
      submission: submissionValues,
    }

    const versionId = version.id

    return {
      content: (
        <>
          {!isCurrentVersion ? (
            <ReadonlyFormTemplate
              displayShortIdAsIdentifier={displayShortIdAsIdentifier}
              form={form}
              formData={{
                ...version,
                submission: JSON.parse(version.submission),
              }}
              manuscript={version}
              showEditorOnlyFields
              threadedDiscussionProps={threadedDiscussionProps}
            />
          ) : (
            <SectionContent>
              <FormTemplate
                createFile={createFile}
                deleteFile={deleteFile}
                displayShortIdAsIdentifier={displayShortIdAsIdentifier}
                fieldsToPublish={
                  version.formFieldsToPublish.find(
                    ff => ff.objectId === version.id,
                  )?.fieldsToPublish ?? []
                }
                form={form}
                initialValues={versionValues}
                isSubmission
                manuscriptId={version.id}
                manuscriptShortId={version.shortId}
                manuscriptStatus={version.status}
                match={{ url: 'decision' }}
                onChange={(value, path) => {
                  onChange(value, path, versionId)
                }}
                republish={() => null}
                setShouldPublishField={async (fieldName, shouldPublish) =>
                  setShouldPublishField({
                    variables: {
                      manuscriptId: version.id,
                      objectId: version.id,
                      fieldName,
                      shouldPublish,
                    },
                  })
                }
                shouldShowOptionToPublish
                showEditorOnlyFields
                threadedDiscussionProps={threadedDiscussionProps}
                urlFrag={urlFrag}
                validateDoi={validateDoi}
                validateSuffix={validateSuffix}
              />
            </SectionContent>
          )}
        </>
      ),
      key: `metadata_${version.id}`,
      label: 'Metadata',
    }
  }

  const tasksAndNotificationsSection = () => {
    return {
      content: (
        <>
          {isCurrentVersion &&
            ['aperture', 'colab'].includes(process.env.INSTANCE_NAME) && (
              <EmailNotifications
                allUsers={allUsers}
                currentUser={currentUser}
                externalEmail={externalEmail}
                isEmailAddressOptedOut={isEmailAddressOptedOut}
                manuscript={version}
                selectedEmail={selectedEmail}
                sendChannelMessageCb={sendChannelMessageCb}
                sendNotifyEmail={sendNotifyEmail}
                setExternalEmail={setExternalEmail}
                setSelectedEmail={setSelectedEmail}
              />
            )}
          <SectionContent>
            <SectionHeader>
              <Title>Tasks</Title>
            </SectionHeader>
            <SectionRow>
              <TaskList
                isReadOnly={!isCurrentVersion}
                manuscriptId={version.id}
                tasks={version.tasks}
                updateTask={updateTask}
                updateTasks={updateTasks}
                users={allUsers}
              />
            </SectionRow>
          </SectionContent>
        </>
      ),
      key: `tasks_${version.id}`,
      label: 'Tasks & Notifications',
    }
  }

  const teamSection = () => {
    return {
      content: (
        <>
          {isCurrentVersion && (
            <AssignEditorsReviewers
              allUsers={allUsers}
              AssignEditor={AssignEditor}
              createTeam={createTeam}
              manuscript={parent}
              teamLabels={teamLabels}
              updateTeam={updateTeam}
            />
          )}
          {!isCurrentVersion && (
            <SectionContent>
              <SectionHeader>
                <Title>Assigned editors</Title>
              </SectionHeader>
              <SectionRow>
                {parent?.teams?.map(team => {
                  if (
                    ['seniorEditor', 'handlingEditor', 'editor'].includes(
                      team.role,
                    )
                  ) {
                    return (
                      <p key={team.id}>
                        {teamLabels[team.role].name}:{' '}
                        {team.members?.[0]?.user?.username}
                      </p>
                    )
                  }

                  return null
                })}
              </SectionRow>
            </SectionContent>
          )}
          <KanbanBoard
            invitations={invitations}
            version={version}
            versionNumber={versionNumber}
          />
          {isCurrentVersion && (
            <AdminSection>
              <InviteReviewer
                addReviewer={addReviewer}
                currentUser={currentUser}
                isEmailAddressOptedOut={isEmailAddressOptedOut}
                manuscript={version}
                reviewerUsers={allUsers}
                sendChannelMessageCb={sendChannelMessageCb}
                sendNotifyEmail={sendNotifyEmail}
              />
            </AdminSection>
          )}
        </>
      ),
      key: `team_${version.id}`,
      label: 'Team',
    }
  }

  const decisionSection = () => {
    return {
      content: (
        <>
          {!isCurrentVersion && (
            <SectionContent>
              <SectionHeader>
                <Title>Archived version</Title>
              </SectionHeader>
              <SectionRow>
                This is not the current, but an archived read-only version of
                the manuscript.
              </SectionRow>
            </SectionContent>
          )}
          {!isCurrentVersion && (
            <DecisionAndReviews
              decisionForm={decisionForm}
              isControlPage
              manuscript={version}
              reviewForm={reviewForm}
              showEditorOnlyFields
              threadedDiscussionProps={threadedDiscussionProps}
            />
          )}
          {isCurrentVersion && (
            <DecisionReviews
              canHideReviews={canHideReviews}
              invitations={invitations}
              manuscript={version}
              reviewers={reviewers}
              reviewForm={reviewForm}
              threadedDiscussionProps={threadedDiscussionProps}
              updateReview={updateReview}
              urlFrag={urlFrag}
            />
          )}
          {isCurrentVersion && (
            <AdminSection key="decision-form">
              <SectionContent>
                <FormTemplate
                  createFile={createFile}
                  deleteFile={deleteFile}
                  fieldsToPublish={
                    version.formFieldsToPublish.find(
                      ff => ff.objectId === currentDecisionData.id,
                    )?.fieldsToPublish ?? []
                  }
                  form={decisionForm}
                  initialValues={
                    currentDecisionData?.jsonData
                      ? JSON.parse(currentDecisionData?.jsonData)
                      : { comment: '', verdict: '', discussion: '' } // TODO this should just be {}, but needs testing.
                  }
                  isSubmission={false}
                  manuscriptId={version.id}
                  manuscriptShortId={version.shortId}
                  manuscriptStatus={version.status}
                  onChange={updateReviewJsonData}
                  onSubmit={async (values, actions) => {
                    await makeDecision({
                      variables: {
                        id: version.id,
                        decision: values.verdict,
                      },
                    })
                    actions.setSubmitting(false)
                  }}
                  reviewId={currentDecisionData.id}
                  setShouldPublishField={async (fieldName, shouldPublish) =>
                    setShouldPublishField({
                      variables: {
                        manuscriptId: version.id,
                        objectId: currentDecisionData.id,
                        fieldName,
                        shouldPublish,
                      },
                    })
                  }
                  shouldShowOptionToPublish
                  shouldStoreFilesInForm
                  showEditorOnlyFields
                  submissionButtonText="Submit"
                  tagForFiles="decision"
                  threadedDiscussionProps={threadedDiscussionProps}
                  urlFrag={urlFrag}
                  validateDoi={validateDoi}
                  validateSuffix={validateSuffix}
                />
              </SectionContent>
            </AdminSection>
          )}
          {isCurrentVersion && (
            <AdminSection>
              <Publish
                dois={dois}
                manuscript={version}
                publishManuscript={publishManuscript}
              />
            </AdminSection>
          )}
        </>
      ),
      key: `decision_${version.id}`,
      label: 'Decision',
    }
  }

  const locationState =
    location.state !== undefined && location.state.tab === 'Decision'
      ? `decision_${version.id}`
      : `team_${version.id}`

  return (
    <HiddenTabs
      defaultActiveKey={locationState}
      onChange={refetch}
      sections={[
        teamSection(),
        decisionSection(),
        editorSection,
        metadataSection(),
        tasksAndNotificationsSection(),
      ]}
    />
  )
}

DecisionVersion.propTypes = {
  addReviewer: PropTypes.func.isRequired,
  updateManuscript: PropTypes.func.isRequired,
  form: PropTypes.shape({
    children: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        title: PropTypes.string,
        shortDescription: PropTypes.string,
      }).isRequired,
    ).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  isCurrentVersion: PropTypes.bool.isRequired,
  version: PropTypes.shape({
    id: PropTypes.string.isRequired,
    meta: PropTypes.shape({}).isRequired,
    files: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        storedObjects: PropTypes.arrayOf(PropTypes.object.isRequired),
      }).isRequired,
    ).isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        isDecision: PropTypes.bool.isRequired,
        decisionComment: PropTypes.shape({
          content: PropTypes.string,
        }),
        user: PropTypes.shape({
          username: PropTypes.string.isRequired,
          defaultIdentity: PropTypes.shape({
            identifier: PropTypes.string.isRequired,
          }),
        }).isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
  versionNumber: PropTypes.number.isRequired,
  parent: PropTypes.shape({
    id: PropTypes.string.isRequired,
    teams: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        members: PropTypes.arrayOf(
          PropTypes.shape({
            user: PropTypes.shape({
              id: PropTypes.string.isRequired,
              defaultIdentity: PropTypes.shape({
                name: PropTypes.string.isRequired,
              }),
            }),
          }).isRequired,
        ),
        role: PropTypes.string.isRequired,
      }).isRequired,
    ),
  }).isRequired,
}

export default DecisionVersion
