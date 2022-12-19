import React, { useState } from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { Primary, Secondary } from '../../../shared'
import { convertTimestampToRelativeDateString } from '../../../../shared/dateUtils'
import { UserAction } from '../../../component-manuscripts-table/src/style'
import InviteDeclineModal from './InviteDeclineModal'

const DeclinedReviewerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5em;
  margin-left: 1em;
  margin-right: 1em;
  margin-top: 1.5em;
  overflow-x: hidden;
  overflow-y: auto;
`

const Box = styled.div`
  align-items: space-between;
  display: flex;
`

const UserName = styled.div`
  display: flex;
  width: 8em;
  word-break: break-all;
`

const Date = styled.div`
  display: flex;
  width: 15em;
  word-break: break-all;
`

const TextChange = styled.div`
  color: ${th('colorSecondary')};
`

const DeclinedReviewer = ({ declined }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  return (
    <>
      <InviteDeclineModal
        invitation={declined}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
      <DeclinedReviewerContainer>
        <Box>
          <UserName>
            <Primary>
              {declined.user?.username ?? declined.invitedPersonName}
            </Primary>
          </UserName>
          <Date>
            <Secondary>
              <TextChange>
                Declined{' '}
                {convertTimestampToRelativeDateString(
                  declined.declinedReason
                    ? declined.responseDate
                    : declined.updated,
                )}
              </TextChange>
            </Secondary>
          </Date>
        </Box>
        {declined.declinedReason && (
          <UserAction onClick={() => setModalOpen(true)}>
            View Details
          </UserAction>
        )}
      </DeclinedReviewerContainer>
    </>
  )
}

export default DeclinedReviewer
