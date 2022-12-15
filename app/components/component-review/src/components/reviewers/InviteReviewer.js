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
  reviewerUsers,
  manuscript,
  addReviewer,
  updateSharedStatusForInvitedReviewer,
}) => {
  // eslint-disable-next-line
  const toggleEmailInvitedReviewerSharedStatus = async (
    invitationId,
    isShared,
  ) => {
    await updateSharedStatusForInvitedReviewer({
      variables: {
        invitationId,
        isShared,
      },
    })
    // TODO: do we need this? From Reviewers.js
    // refetchManuscriptData()
  }

  return (
    <Formik
      displayName="reviewers"
      initialValues={{ user: undefined }}
      onSubmit={values =>
        addReviewer({
          variables: {
            userId: values.user.id,
            manuscriptId: manuscript.id,
          },
        })
      }
    >
      {props => (
        <SectionContent>
          <SectionHeader>
            <Title>Invite Reviewers</Title>
          </SectionHeader>
          <SectionRow>
            <ReviewerForm {...props} reviewerUsers={reviewerUsers} />
          </SectionRow>
        </SectionContent>
      )}
    </Formik>
  )
}

export default InviteReviewer
