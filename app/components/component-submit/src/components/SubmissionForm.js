import React from 'react'
import { SectionContent } from '../../../shared'
import { FormTemplate } from '../../../component-form/src'
import { articleStatuses } from '../../../../globals'

const SubmissionForm = ({
  version,
  submissionForm,
  submissionFormComponents,
  onSubmit,
  onChange,
  republish,
  match,
  manuscript,
  createFile,
  deleteFile,
  setShouldPublishField,
  validateDoi,
  validateSuffix,
}) => {
  let submissionButtonText = 'Submit your research object'
  let submitButtonShouldRepublish = false

  if (match.url.includes('/evaluation')) {
    if (manuscript.status === articleStatuses.published) {
      submitButtonShouldRepublish = true
      submissionButtonText = 'Republish'
    } else submissionButtonText = 'Submit Evaluation'
  }

  return (
    <SectionContent>
      <FormTemplate
        createFile={createFile}
        customComponents={submissionFormComponents}
        deleteFile={deleteFile}
        fieldsToPublish={
          manuscript.formFieldsToPublish.find(
            ff => ff.objectId === manuscript.id,
          )?.fieldsToPublish ?? []
        }
        form={submissionForm}
        formData={version}
        isSubmission
        manuscriptId={manuscript.id}
        manuscriptShortId={manuscript.shortId}
        manuscriptStatus={manuscript.status}
        onChange={(value, path) => {
          onChange(value, path, manuscript.id)
        }}
        onSubmit={async (values, { validateForm, setSubmitting, ...other }) => {
          // TODO: Change this to a more Formik idiomatic form
          const isValid = Object.keys(await validateForm()).length === 0
          return isValid
            ? onSubmit(manuscript.id, values) // values are currently ignored!
            : setSubmitting(false)
        }}
        republish={submitButtonShouldRepublish && republish}
        setShouldPublishField={async (fieldName, shouldPublish) =>
          setShouldPublishField({
            variables: {
              manuscriptId: manuscript.id,
              objectId: manuscript.id,
              fieldName,
              shouldPublish,
            },
          })
        }
        shouldShowOptionToPublish={!!setShouldPublishField}
        showEditorOnlyFields={false}
        submissionButtonText={submissionButtonText}
        validateDoi={validateDoi}
        validateSuffix={validateSuffix}
      />
    </SectionContent>
  )
}

export default SubmissionForm
