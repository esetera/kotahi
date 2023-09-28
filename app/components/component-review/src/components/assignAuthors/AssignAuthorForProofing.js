import React, { useState } from 'react'
import {
  FlexCenter,
  SectionHeader,
  SectionRowGrid,
  StatusInfoText,
  Title,
} from '../style'
import { ActionButton, SectionContent } from '../../../../shared'
import { convertTimestampToDateTimeString } from '../../../../../shared/dateUtils'

const AssignAuthorForProofing = ({
  manuscript,
  AssignEditor,
  allUsers,
  updateTeam,
  createTeam,
  teamLabels,
}) => {
  const [submitAuthorProofingStatus, setSubmitAuthorProofingStatus] = useState(
    null,
  )

  return (
    <SectionContent>
      <SectionHeader>
        <Title>Assign Author for Proofing</Title>
      </SectionHeader>
      <SectionRowGrid>
        <ActionButton
          dataTestid="submit-author-proofing"
          onClick={async () => {
            // TODO: submit-author-proofing actions
            // setSubmitAuthorProofingStatus('pending')

            // const response = await sendEmail(
            //   manuscript,
            //   false,
            //   currentUser,
            //   sendNotifyEmail,
            //   reviewerInvitationEmailTemplate,
            //   identity.email,
            //   identity.email,
            //   identity.username,
            //   false,
            //   config.groupId,
            // )

            // if (!response || !response?.emailStatus) {
            //   setInviteStatus('failure')
            //   return
            // }

            // if (response.input) {
            //   sendEmailChannelMessage(
            //     sendChannelMessage,
            //     currentUser,
            //     response.input,
            //     reviewerUsers.map(reviewer => ({
            //       userName: reviewer.username,
            //       value: reviewer.email,
            //     })),
            //     emailTemplates,
            //   )
            // }

            setSubmitAuthorProofingStatus('success')
          }}
          primary
          status={submitAuthorProofingStatus}
        >
          Submit for author proofing
        </ActionButton>
        <StatusInfoText>
          <FlexCenter>
            Authorname assigned {convertTimestampToDateTimeString(new Date())}
          </FlexCenter>
        </StatusInfoText>
      </SectionRowGrid>
    </SectionContent>
  )
}

export default AssignAuthorForProofing
