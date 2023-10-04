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

  const authorTeam = manuscript.teams.find(team => team.role === 'author')

  return (
    <SectionContent>
      <SectionHeader>
        <Title>Assign Author for Proofing</Title>
      </SectionHeader>
      <SectionRowGrid>
        <ActionButton
          dataTestid="submit-author-proofing"
          disabled={manuscript.isAuthorProofingEnabled}
          onClick={async () => {
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
      {manuscript.isAuthorProofingEnabled ? (
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
              {authorTeam?.members.map(member => (
                <>
                  <span>
                    {member?.user?.username ||
                      member?.user?.defaultIdentity?.identifier}{' '}
                    {/* on {convertTimestampToDateTimeString(new Date())} */}
                  </span>
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
