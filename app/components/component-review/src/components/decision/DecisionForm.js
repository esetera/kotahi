import React from 'react'
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
  urlFrag,
  validateDoi,
}) => {
  return (
    <SectionContent>
      <FormTemplate
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
        reviewId={reviewByCurrentUser.id}
        showEditorOnlyFields
        submissionButtonText="Submit"
        urlFrag={urlFrag}
        validateDoi={validateDoi}
      />
    </SectionContent>
  )
}

export default DecisionForm
