import React from 'react'
import { Formik } from 'formik'
import ReviewerForm from './ReviewerForm'
import {
  SectionRow,
  SectionContent,
  SectionHeader,
  Title,
} from '../../../../shared'

const InviteReviewer = ({
  handleSubmit,
  isValid,
  reviewerUsers,
  manuscript,
  addReviewer,
}) => {
  return (
    <Formik
      displayName="reviewers"
      initialValues={{ user: undefined }}
      onSubmit={values =>
        addReviewer({
          variables: {
            userId: values.user.id,
            manuscriptId: manuscript.id,
            status: 'invited',
          },
        })
      }
    >
      <SectionContent>
        <SectionHeader>
          <Title>Invite Reviewers</Title>
        </SectionHeader>
        <SectionRow>
          <ReviewerForm
            handleSubmit={handleSubmit}
            isValid={isValid}
            reviewerUsers={reviewerUsers}
          />
        </SectionRow>
      </SectionContent>
    </Formik>
  )
}

export default InviteReviewer
