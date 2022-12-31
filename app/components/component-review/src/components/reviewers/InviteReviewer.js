import React, { useState } from 'react'
import { Formik } from 'formik'
import ReviewerForm from './ReviewerForm'
import {
  SectionRow,
  SectionContent,
  SectionHeader,
  Title,
} from '../../../../shared'
import {
  sendEmail,
  sendEmailChannelMessage,
} from '../emailNotifications/emailUtils'

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
        onSubmit={async values => {
          if (!isNewUser) {
            addReviewer({
              variables: {
                userId: values.user.id,
                manuscriptId: manuscript.id,
              },
            })
          } else {
            setNotificationStatus('pending')

            const { responseStatus, input } = await sendEmail(
              manuscript,
              isNewUser,
              currentUser,
              sendNotifyEmail,
              'reviewerInvitationEmailTemplate',
              selectedEmail,
              setOptedOut,
              values.email,
              values.name,
              isEmailAddressOptedOut,
            )

            setNotificationStatus(responseStatus ? 'success' : 'failure')

            if (input) {
              sendEmailChannelMessage(sendChannelMessageCb, currentUser, input)
            }
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
                  isNewUser={isNewUser}
                  notificationStatus={notificationStatus}
                  optedOut={optedOut}
                  reviewerUsers={reviewerUsers}
                  setIsNewUser={setIsNewUser}
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
