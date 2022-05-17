import React from 'react'
import config from 'config'
import { SectionContent } from '../../../../shared'
import FormTemplate from '../../../../component-submit/src/components/FormTemplate'

const DecisionForm = ({
  createFile,
  dirty,
  deleteFile,
  decisionForm,
  handleSubmit,
  updateReviewJsonData,
  reviewByCurrentUser,
  manuscriptId,
  manuscriptShortId,
  manuscriptStatus,
  validateDoi,
}) => {
  const [confirming, setConfirming] = React.useState(false)

  const toggleConfirming = () => {
    setConfirming(confirm => !confirm)
  }

  return (
    <SectionContent>
      <FormTemplate
        confirming={confirming}
        createFile={createFile}
        deleteFile={deleteFile}
        form={decisionForm}
        initialValues={
          reviewByCurrentUser?.jsonData
            ? JSON.parse(reviewByCurrentUser?.jsonData)
            : {}
        }
        isSubmission={false}
        manuscriptId={manuscriptId}
        manuscriptShortId={manuscriptShortId}
        manuscriptStatus={manuscriptStatus}
        republish={() => null}
        reviewId={reviewByCurrentUser.id}
        showEditorOnlyFields
        submissionButtonText="Submit"
        toggleConfirming={toggleConfirming}
        updateReviewJsonData={updateReviewJsonData}
        urlFrag={config.journal.metadata.toplevel_urlfragment}
        validateDoi={validateDoi}
      />
    </SectionContent>
  )
}

export default DecisionForm
