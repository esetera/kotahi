import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { Tabs } from '@pubsweet/ui'

import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import ReviewForm from './ReviewForm'
import ReadonlyFormTemplate from '../metadata/ReadonlyFormTemplate'
import Review from './Review'
import EditorSection from '../decision/EditorSection'
import { Columns, Manuscript, Chat, SectionContent } from '../../../../shared'
import MessageContainer from '../../../../component-chat/src/MessageContainer'
import ArticleEvaluationSummaryPage from '../../../../component-decision-viewer'
import SharedReviewerGroupReviews from './SharedReviewerGroupReviews'
import FormTemplate from '../../../../component-submit/src/components/FormTemplate'

const Reviewerdisclaimer = styled.span`
  color: ${th('colorTextPlaceholder')};
  display: grid;
  font-size: 14px;
  padding: 0 5px;
  place-items: center;
`

const hasManuscriptFile = manuscript =>
  !!manuscript?.files?.find(file => file.tags.includes('manuscript'))

const ReviewLayout = ({
  currentUser,
  versions,
  review,
  reviewForm,
  handleSubmit,
  isValid,
  status,
  updateReview,
  uploadFile,
  channelId,
  submissionForm,
  createFile,
  deleteFile,
  validateDoi,
}) => {
  const [confirming, setConfirming] = React.useState(false)

  const toggleConfirming = () => {
    setConfirming(confirm => !confirm)
  }

  const reviewSections = []
  const latestVersion = versions[0]
  const priorVersions = versions.slice(1)
  priorVersions.reverse() // Convert to chronological order (was reverse-chron)

  const decisionComment =
    latestVersion.reviews.find(
      reviewIsDecision => reviewIsDecision.isDecision,
    ) || {}

  const decisionRadio = latestVersion.status

  const formatDecisionComment = input => {
    const comment = input.decisionComment ? input.decisionComment.content : ''
    const placeholder = '"<i>The evaluation summary will appear here.</i>"'

    if (comment === '<p class="paragraph"></p>' || comment === '') {
      return placeholder
    }

    return comment
  }

  priorVersions.forEach(msVersion => {
    if (msVersion.reviews?.some(r => !r.user))
      console.error(
        `Malformed review objects in manuscript ${msVersion.id}:`,
        msVersion.reviews,
      )

    const reviewForCurrentUser = msVersion.reviews?.find(
      r => r.user?.id === currentUser.id && !r.isDecision,
    )

    const reviewData = reviewForCurrentUser?.jsonData
      ? JSON.parse(reviewForCurrentUser.jsonData)
      : {}

    console.log('reviewData:', reviewData)

    const label = moment().format('YYYY-MM-DD')
    reviewSections.push({
      content: (
        <div key={msVersion.id}>
          <Reviewerdisclaimer>
            By completing this review, you agree that you do not have any
            conflict of interests to declare. For any questions about what
            constitutes a conflict of interest, contact the administrator.
          </Reviewerdisclaimer>
          {hasManuscriptFile(msVersion) && (
            <EditorSection manuscript={msVersion} readonly />
          )}
          <ReadonlyFormTemplate
            form={submissionForm}
            formData={reviewData}
            manuscript={msVersion}
            showEditorOnlyFields={false}
          />
          <SharedReviewerGroupReviews
            manuscript={msVersion}
            reviewerId={currentUser.id}
            reviewForm={reviewForm}
          />
          <Review review={reviewForCurrentUser} reviewForm={reviewForm} />
        </div>
      ),
      key: msVersion.id,
      label,
    })
  }, [])

  if (latestVersion.status !== 'revising') {
    const reviewForCurrentUser = latestVersion.reviews?.find(
      r => r.user?.id === currentUser.id && !r.isDecision,
    )

    const reviewData = reviewForCurrentUser?.jsonData
      ? JSON.parse(reviewForCurrentUser.jsonData)
      : {}

    const label = moment().format('YYYY-MM-DD')

    reviewSections.push({
      content: (
        <div key={latestVersion.id}>
          <Reviewerdisclaimer>
            By completing this review, you agree that you do not have any
            conflict of interests to declare. For any questions about what
            constitutes a conflict of interest, contact the administrator.
          </Reviewerdisclaimer>
          {hasManuscriptFile(latestVersion) && (
            <EditorSection manuscript={latestVersion} readonly />
          )}
          <ReadonlyFormTemplate // Display manuscript metadata
            form={submissionForm}
            formData={{
              ...latestVersion,
              submission: JSON.parse(latestVersion.submission),
            }}
            manuscript={latestVersion}
            showEditorOnlyFields={false}
          />
          <SharedReviewerGroupReviews
            manuscript={latestVersion}
            reviewerId={currentUser.id}
          />
          {status === 'completed' ? (
            <Review review={review} />
          ) : (
            <SectionContent>
              <FormTemplate
                confirming={confirming}
                createFile={createFile}
                deleteFile={deleteFile}
                form={reviewForm}
                initialValues={reviewData}
                manuscript={latestVersion}
                onChange={(value, path) => null}
                onSubmit={() => null}
                republish={() => null}
                showEditorOnlyFields={false}
                submissionButtonText="Submit"
                toggleConfirming={toggleConfirming}
                validateDoi={validateDoi}
              />
            </SectionContent>

            /* <ReviewForm
              createFile={createFile}
              deleteFile={deleteFile}
              handleSubmit={handleSubmit}
              isValid={isValid}
              manuscriptId={latestVersion.id}
              updateReview={updateReview}
              uploadFile={uploadFile}
              validateDoi={validateDoi}
            /> */
          )}
          {['colab'].includes(process.env.INSTANCE_NAME) && (
            <ArticleEvaluationSummaryPage
              decisionComment={formatDecisionComment(decisionComment)}
              decisionRadio={decisionRadio}
              updateReview={updateReview}
            />
          )}
        </div>
      ),
      key: latestVersion.id,
      label,
    })
  }

  return (
    <Columns>
      <Manuscript>
        <Tabs
          activeKey={reviewSections[reviewSections.length - 1].key}
          sections={reviewSections}
          title="Versions"
        />
      </Manuscript>
      <Chat>
        <MessageContainer channelId={channelId} />
      </Chat>
    </Columns>
  )
}

ReviewLayout.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  versions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      reviews: PropTypes.arrayOf(
        PropTypes.shape({
          reviewComment: PropTypes.shape({
            content: PropTypes.string.isRequired,
            files: PropTypes.arrayOf(
              PropTypes.shape({
                name: PropTypes.string.isRequired,
                storedObjects: PropTypes.arrayOf(PropTypes.object.isRequired),
              }).isRequired,
            ).isRequired,
          }),
          confidentialComment: PropTypes.shape({
            content: PropTypes.string.isRequired,
            files: PropTypes.arrayOf(
              PropTypes.shape({
                name: PropTypes.string.isRequired,
                storedObjects: PropTypes.arrayOf(PropTypes.object.isRequired),
              }).isRequired,
            ).isRequired,
          }),
          recommendation: PropTypes.string,
        }),
      ),
      status: PropTypes.string.isRequired,
      meta: PropTypes.shape({
        notes: PropTypes.arrayOf(
          PropTypes.shape({
            notesType: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
          }).isRequired,
        ).isRequired,
      }).isRequired,
      files: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          storedObjects: PropTypes.arrayOf(PropTypes.object.isRequired),
        }).isRequired,
      ).isRequired,
    }).isRequired,
  ).isRequired,
  review: PropTypes.shape({
    reviewComment: PropTypes.string,
    confidentialComment: PropTypes.string,
    recommendation: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  status: PropTypes.string,
  updateReview: PropTypes.func.isRequired,
  uploadFile: PropTypes.func,
  channelId: PropTypes.string.isRequired,
  submissionForm: PropTypes.shape({
    children: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        title: PropTypes.string,
        shortDescription: PropTypes.string,
      }).isRequired,
    ).isRequired,
  }).isRequired,
}

ReviewLayout.defaultProps = {
  review: undefined,
  status: undefined,
  uploadFile: undefined,
}

export default ReviewLayout
