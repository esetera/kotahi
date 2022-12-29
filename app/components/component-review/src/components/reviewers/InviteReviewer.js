import React, { useState } from 'react'
import { Formik } from 'formik'
import ReviewerForm from './ReviewerForm'
import { Checkbox } from '@pubsweet/ui'
import {
  SectionRow,
  SectionContent,
  SectionHeader,
  Title,
} from '../../../../shared'
import { sendEmailHandler } from '../emailNotifications/emailUtils'

const InviteReviewer = ({
  reviewerUsers,
  manuscript,
  addReviewer,
  updateSharedStatusForInvitedReviewer,
  currentUser,
  sendNotifyEmail,
  sendChannelMessageCb,
  selectedEmail,
  isEmailAddressOptedOut,
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

  const [isNewUser, setIsNewUser] = useState(false)
  const [optedOut, setOptedOut] = useState(false)
  const [notificationStatus, setNotificationStatus] = useState(null)

  return (
    <>
      <Formik
        displayName="reviewers"
        initialValues={{ user: undefined, email: undefined, name: undefined }}
        onSubmit={values => {
          if (!isNewUser) {
            addReviewer({
              variables: {
                userId: values.user.id,
                manuscriptId: manuscript.id,
              },
            })
          } else {
            sendEmailHandler(
              manuscript,
              isNewUser,
              currentUser,
              sendNotifyEmail,
              sendChannelMessageCb,
              setNotificationStatus,
              'reviewerInvitationEmailTemplate',
              selectedEmail,
              setOptedOut, 
              values.email,
              values.name,
              isEmailAddressOptedOut,
            )
          }
        }}
      >
        {formikProps => (
          <>
            <SectionContent>
              <SectionHeader>
                <Title>Invite Reviewers</Title>
              </SectionHeader>
              <SectionRow>
                <ReviewerForm
                  {...formikProps}
                  reviewerUsers={reviewerUsers}
                  isNewUser={isNewUser}
                  setIsNewUser={setIsNewUser}
                  notificationStatus={notificationStatus}
                />
              </SectionRow>
            </SectionContent>
          </>
        )}
      </Formik>
    </>
  )
}

export default InviteReviewer
