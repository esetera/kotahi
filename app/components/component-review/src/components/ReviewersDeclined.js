import React, { useState } from 'react'
import styled from 'styled-components'
import { Icon } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import { Primary, Secondary, SectionHeader } from '../../../shared'
import { convertTimestampToRelativeDateString } from '../../../../shared/dateUtils'
import { UserAction } from '../../../component-manuscripts-table/src/style'
import InviteDeclineModal from './InviteDeclineModal'

const DropdownTitleContainer = styled.div`
  align-content: center;
  display: flex;
  font-size: 18px;
  justify-content: space-between;
`

const DeclinedReviewerContainer = styled.div`
  background-color: #f8f8f9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1em;
  margin-left: 1em;
  margin-right: 1em;
  margin-top: 1em;
`

const TextChange = styled.div`
  color: ${th('colorSecondary')};
`

const DeclinedReviewer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5em;
  margin-left: 1em;
  margin-right: 1em;
  margin-top: 1.5em;
  overflow-x: hidden;
  overflow-y: auto;
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

const AllRejectedReviewers = styled.div`
  :not(:last-child) {
    border-bottom: 0.8px solid #bfbfbf;
  }
`

const Box = styled.div`
  align-items: space-between;
  display: flex;
`

const ReviewersDeclined = ({ invitations, reviewers }) => {
  const [open, setOpen] = useState(false)

  const declinations = invitations ? [...invitations, ...reviewers] : reviewers
  declinations.sort((a, b) => {
    const aDate = Object.prototype.hasOwnProperty.call(a, 'declinedReason')
      ? a.responseDate
      : a.updated

    const bDate = Object.prototype.hasOwnProperty.call(b, 'declinedReason')
      ? b.responseDate
      : b.updated

    return aDate - bDate
  })

  return (
    <>
      {open ? (
        <>
          <SectionHeader onClick={() => setOpen(!open)}>
            <DropdownTitleContainer>
              <UserAction>Hide Declined</UserAction>
              <Icon color={th('colorSecondary')}>chevron-up</Icon>
            </DropdownTitleContainer>
          </SectionHeader>
          <DeclinedReviewerContainer>
            {declinations.map(
              declined =>
                declined.status === 'rejected' && (
                  <AllRejectedReviewers>
                    <DeclinedReviewer>
                      <Box>
                        <UserName>
                          <Primary>{declined.user.username}</Primary>
                        </UserName>
                        <Date>
                          <Secondary>
                            <TextChange>
                              Declined{' '}
                              {convertTimestampToRelativeDateString(
                                Object.prototype.hasOwnProperty.call(
                                  declined,
                                  'declinedReason',
                                )
                                  ? declined.responseDate
                                  : declined.updated,
                              )}
                            </TextChange>
                          </Secondary>
                        </Date>
                      </Box>
                      {/* <Secondary>View Details</Secondary> */}
                    </DeclinedReviewer>
                  </AllRejectedReviewers>
                ),
            )}
          </DeclinedReviewerContainer>
        </>
      ) : (
        <SectionHeader onClick={() => setOpen(!open)}>
          <DropdownTitleContainer>
            <UserAction>See Declined</UserAction>
            <Icon color={th('colorSecondary')}>chevron-down</Icon>
          </DropdownTitleContainer>
        </SectionHeader>
      )}
    </>
  )
}

export default ReviewersDeclined
