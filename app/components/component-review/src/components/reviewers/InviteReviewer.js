import { Formik } from 'formik'
import React, { useState } from 'react'
import {
  SectionContent,
  SectionHeader,
  SectionRow,
  Title,
} from '../../../../shared'
import {
  sendEmail,
  sendEmailChannelMessage,
} from '../emailNotifications/emailUtils'
import InviteReviewerModal from './InviteReviewerModal'
import ReviewerForm from './ReviewerForm'

// const Card = styled.div`
//   background-color: #f8f8f9;
//   border-bottom: 0.8px solid #bfbfbf;
//   border-radius: 8px;
//   display: flex;
//   padding: 10px;
//   width: 100%;

//   &:hover {
//     box-shadow: 0px 9px 5px -6px #bfbfbf;
//     transition: 0.3s ease;
//   }
// `

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
  setExternalEmail,
  updateTeamMember,
}) => {
  const [open, setOpen] = useState(false)

  const [userId, setUserId] = useState(undefined)

  const [isNewUser, setIsNewUser] = useState(false)
  const [optedOut, setOptedOut] = useState(false)
  const [notificationStatus, setNotificationStatus] = useState(null)

  return (
    <>
      <Formik
        displayName="reviewers"
        initialValues={{ user: undefined, email: undefined, name: undefined }}
        onSubmit={async values => {
          setOptedOut(false)

          if (!isNewUser) {
            setOpen(true)
            setUserId(values.user.id)
          } else {
            setNotificationStatus('pending')

            const output = await sendEmail(
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

            setNotificationStatus(output?.invitation ? 'success' : 'failure')

            if (output?.input) {
              sendEmailChannelMessage(
                sendChannelMessageCb,
                currentUser,
                output.input,
                reviewerUsers.map(reviewer => ({
                  userName: reviewer.username,
                  value: reviewer.email,
                })),
              )
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
                  setExternalEmail={setExternalEmail}
                  setIsNewUser={setIsNewUser}
                />
              </SectionRow>
            </SectionContent>
          </>
        )}
      </Formik>
      <InviteReviewerModal
        addReviewer={addReviewer}
        currentUser={currentUser}
        manuscript={manuscript}
        onClose={() => setOpen(false)}
        open={open}
        reviewerUsers={reviewerUsers}
        selectedEmail={selectedEmail}
        sendChannelMessageCb={sendChannelMessageCb}
        sendNotifyEmail={sendNotifyEmail}
        updateSharedStatusForInvitedReviewer={
          updateSharedStatusForInvitedReviewer
        }
        updateTeamMember={updateTeamMember}
        userId={userId}
      />
    </>
  )
}

export default InviteReviewer
