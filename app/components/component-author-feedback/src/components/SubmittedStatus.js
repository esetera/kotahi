import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { convertTimestampToDateTimeString } from '../../../../shared/dateUtils'

export const VerticalBar = styled.div`
  border-right: 1px solid #111111;
  height: 16px;
  margin: 0px 10px 0px 10px;
`

export const FlexCenter = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`

export const StatusInfoText = styled.div`
  display: flex;
  font-size: ${th('fontSizeBaseSmall')};
  font-weight: 400;
`

const SubmittedStatus = ({ authorFeedback }) => {
  const isSubmitted = () => !!authorFeedback.submitted

  return (
    <StatusInfoText>
      {authorFeedback.edited && (
        <FlexCenter>
          Edited on {convertTimestampToDateTimeString(authorFeedback.edited)}
        </FlexCenter>
      )}

      <FlexCenter>
        {isSubmitted() && (
          <>
            <VerticalBar />
            {`${
              authorFeedback.submitter?.username ||
              authorFeedback.submitter?.defaultIdentity?.name
            } submitted on ${convertTimestampToDateTimeString(
              authorFeedback.submitted,
            )}`}
          </>
        )}
      </FlexCenter>
    </StatusInfoText>
  )
}

export default SubmittedStatus
