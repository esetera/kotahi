import React from 'react'
import config from 'config'
import { SectionContent } from '../../../../shared'
import FormTemplate from '../../../../component-submit/src/components/FormTemplate'

// TODO Get rid of this component and use FormTemplate directly from DecisionVersion
const DecisionForm = ({
  createFile,
  deleteFile,
  decisionForm,
  onSubmit,
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
        onChange={updateReviewJsonData}
        onSubmit={onSubmit}
        republish={() => null}
        reviewId={reviewByCurrentUser.id}
        showEditorOnlyFields
        submissionButtonText="Submit"
        toggleConfirming={toggleConfirming}
        urlFrag={config.journal.metadata.toplevel_urlfragment} // TODO pass from higher up rather than import config in this file
        validateDoi={validateDoi}
      />
    </SectionContent>
  )
}

export default DecisionForm
