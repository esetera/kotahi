import React, { useState } from 'react'
import {
  AssignedAuthorForProofingLogsContainer,
  AssignedAuthorForProofingLogsToggle,
  AssignedAuthorForProofingLogs,
  SectionHeader,
  SectionRowGrid,
  Title,
} from '../style'
import { ActionButton, SectionContent } from '../../../../shared'
import { convertTimestampToDateTimeString } from '../../../../../shared/dateUtils'

const AssignAuthorForProofing = ({ assignAuthorForProofing, manuscript }) => {
  const [isToggled, setToggled] = useState(false)

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
          disabled={manuscript?.isAuthorProofingEnabled}
          onClick={async () => {
            // TODO: submit-author-proofing actions
            setSubmitAuthorProofingStatus('pending')

            await assignAuthorForProofing({
              variables: {
                id: manuscript?.id,
              },
            })

            setSubmitAuthorProofingStatus('success')
          }}
          primary
          status={submitAuthorProofingStatus}
        >
          Submit for author proofing
        </ActionButton>
      </SectionRowGrid>
      {manuscript?.isAuthorProofingEnabled ? (
        <AssignedAuthorForProofingLogsContainer>
          <AssignedAuthorForProofingLogsToggle
            onClick={() => setToggled(!isToggled)}
          >
            {isToggled
              ? `Hide all authors assigned`
              : `Show all authors assigned`}
          </AssignedAuthorForProofingLogsToggle>
          {isToggled && (
            <AssignedAuthorForProofingLogs>
              {[1].map(log => (
                <>
                  <div>
                    Authorname assigned{' '}
                    {convertTimestampToDateTimeString(new Date())}
                  </div>
                  <br />
                </>
              ))}
            </AssignedAuthorForProofingLogs>
          )}
        </AssignedAuthorForProofingLogsContainer>
      ) : (
        <></>
      )}
    </SectionContent>
  )
}

export default AssignAuthorForProofing
