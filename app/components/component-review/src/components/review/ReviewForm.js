import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Field } from 'formik'
import {
  Button,
  RadioGroup as UnstableRadioGroup,
  Checkbox,
} from '@pubsweet/ui'
import SimpleWaxEditor from '../../../../wax-collab/src/SimpleWaxEditor'
import { JournalContext } from '../../../../xpub-journal/src'
import { reviewWithComment } from './util'
import {
  AdminSection,
  Title,
  SectionHeader,
  SectionRowGrid,
  SectionRow,
  SectionAction,
  RecommendationInputContainer,
} from '../style'

import { SectionContent, FilesUpload } from '../../../../shared'

// See issue #38
const RadioGroup = styled(UnstableRadioGroup)`
  position: relative;
`

const NoteInput = ({ field, updateReview }) => (
  <>
    <div>Comments to the author:</div>
    <SimpleWaxEditor
      data-testid="reviewComment"
      key="note-comment"
      placeholder="Enter your review…"
      {...field}
      onChange={val => {
        updateReview({ reviewComment: { content: val } })
      }}
      value={field.value?.content || ''}
    />
  </>
)

NoteInput.propTypes = {
  field: PropTypes.shape({
    value: PropTypes.shape({
      content: PropTypes.string,
    }),
  }).isRequired,
  updateReview: PropTypes.func.isRequired,
}

const ConfidentialInput = ({ field, updateReview }) => (
  <>
    <div>Confidential comments to editor (optional):</div>
    <SimpleWaxEditor
      data-testid="confidentialComment"
      key="confidential-comment"
      placeholder="Enter a confidential note to the editor (optional)…"
      {...field}
      onChange={val => {
        updateReview({ confidentialComment: { content: val } })
      }}
      value={field.value?.content || ''}
    />
  </>
)

ConfidentialInput.propTypes = {
  field: PropTypes.shape({
    value: PropTypes.shape({
      content: PropTypes.string,
    }),
  }).isRequired,
  updateReview: PropTypes.func.isRequired,
}

const RecommendationInput = ({ field, updateReview }) => {
  const journal = useContext(JournalContext)
  return (
    <RecommendationInputContainer>
      <RadioGroup
        inline
        {...field}
        data-testid="recommendation"
        onChange={val => {
          updateReview({ recommendation: val })
        }}
        options={journal.recommendations}
      />
    </RecommendationInputContainer>
  )
}

RecommendationInput.propTypes = {
  field: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,
  updateReview: PropTypes.func.isRequired,
}

const ReviewComment = ({ updateReview }) => (
  <>
    <AdminSection>
      <div name="note">
        <Field key="noteField" name="reviewComment">
          {formikBag => (
            <>
              <NoteInput updateReview={updateReview} {...formikBag} />
              <FilesUpload
                containerId={formikBag.field.value?.id}
                containerName="reviewComment"
                fieldName="reviewComment.files"
                initializeContainer={async () => {
                  // If the container for the uploaded files is not present,
                  // we have to create it. InitializeContainer will be called
                  // if containerId is undefined
                  const review = reviewWithComment({
                    commentType: 'review',
                    values: formikBag.form.values,
                    name: 'reviewComment',
                  })

                  // This is an upsert
                  const { data } = await updateReview(review)
                  // And we the return the file container id, so
                  // that we have somewhere to attach uploaded files
                  return data.updateReview.reviewComment.id
                }}
              />
            </>
          )}
        </Field>
      </div>
    </AdminSection>
    <AdminSection>
      <div name="confidential">
        <Field key="confidentialField" name="confidentialComment">
          {formikBag => (
            <>
              <ConfidentialInput updateReview={updateReview} {...formikBag} />
              <FilesUpload
                containerId={formikBag.field.value?.id}
                containerName="reviewComment"
                fieldName="confidentialComment.files"
                initializeContainer={async () => {
                  // If the container for the uploaded files is not present,
                  // we have to create it. InitializeContainer will be called
                  // if containerId is undefined
                  const review = reviewWithComment({
                    commentType: 'confidential',
                    values: formikBag.form.values,
                    name: 'confidentialComment',
                  })

                  // This is an upsert
                  const { data } = await updateReview(review)
                  // And we the return the file container id, so
                  // that we have somewhere to attach uploaded files
                  return data.updateReview.confidentialComment.id
                }}
              />
            </>
          )}
        </Field>
      </div>
    </AdminSection>
    {process.env.INSTANCE_NAME === 'colab' && (
      <Field key="canBePublishedPublicly" name="canBePublishedPublicly">
        {formikBag => {
          return (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Checkbox
                {...formikBag.field}
                checked={formikBag.field.value}
                label="I accept review can be published publicly."
                onChange={e => {
                  formikBag.field.onChange(e)
                  updateReview({ canBePublishedPublicly: e.target.checked })
                }}
              />
            </div>
          )
        }}
      </Field>
    )}
  </>
)

ReviewComment.propTypes = {
  updateReview: PropTypes.func.isRequired,
}

const ReviewForm = ({ isValid, isSubmitting, handleSubmit, updateReview }) => (
  <SectionContent>
    <form onSubmit={handleSubmit}>
      <AdminSection>
        <SectionHeader>
          <Title>Review</Title>
        </SectionHeader>
        <SectionRow key="note">
          <ReviewComment updateReview={updateReview} />
        </SectionRow>
        <SectionHeader>
          <Title>Recommendation</Title>
        </SectionHeader>
        <SectionRowGrid>
          <Field name="recommendation" updateReview={updateReview}>
            {props => (
              <RecommendationInput updateReview={updateReview} {...props} />
            )}
          </Field>
          <SectionAction key="submit">
            <Button disabled={!isValid || isSubmitting} primary type="submit">
              Submit
            </Button>
          </SectionAction>
        </SectionRowGrid>
      </AdminSection>
    </form>
  </SectionContent>
)

ReviewForm.propTypes = {
  isValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  updateReview: PropTypes.func.isRequired,
}

ReviewForm.defaultProps = {
  isSubmitting: false,
}

export default ReviewForm
