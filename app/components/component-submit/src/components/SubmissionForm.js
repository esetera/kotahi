import React from 'react'
import { SectionContent } from '../../../shared'
import FormTemplate from './FormTemplate'

const SubmissionForm = ({
  currentUser,
  versionValues,
  form,
  onSubmit,
  versionId,
  onChange,
  republish,
  match,
  manuscript,
  createFile,
  deleteFile,
  threadedDiscussions,
  updatePendingComment,
  validateDoi,
}) => {
  return (
    <SectionContent>
      <FormTemplate
        createFile={createFile}
        currentUser={currentUser}
        deleteFile={deleteFile}
        firstVersionManuscriptId={manuscript.parentId || manuscript.id}
        form={form}
        initialValues={versionValues}
        manuscriptId={manuscript.id}
        manuscriptShortId={manuscript.shortId}
        manuscriptStatus={manuscript.status}
        onChange={(value, path) => {
          onChange(value, path, versionId)
        }}
        onSubmit={async (values, { validateForm, setSubmitting, ...other }) => {
          // TODO: Change this to a more Formik idiomatic form
          const isValid = Object.keys(await validateForm()).length === 0
          return isValid
            ? onSubmit(versionId, values) // values are currently ignored!
            : setSubmitting(false)
        }}
        republish={republish}
        showEditorOnlyFields={false}
        submissionButtonText={
          match.url.includes('/evaluation')
            ? 'Submit Evaluation'
            : 'Submit your research object'
        }
        threadedDiscussions={threadedDiscussions}
        updatePendingComment={updatePendingComment}
        validateDoi={validateDoi}
      />
    </SectionContent>
  )
}

export default SubmissionForm
